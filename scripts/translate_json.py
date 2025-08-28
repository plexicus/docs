"""
Improved JSON translation script with better error handling and retry mechanisms.
"""

import json
import os
import sys
import pathlib
import textwrap
import time
from typing import Dict, List, Any, Union, Optional
from dataclasses import dataclass
import logging

from openai import AzureOpenAI
from pydantic import BaseModel
import copy

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# -------- Configuration --------
@dataclass
class TranslationConfig:
    max_chunk_size: int = 2000
    max_retries: int = 3
    retry_delay: float = 1.0
    temperature: float = 0.2
    timeout: int = 60
    
config = TranslationConfig()

# -------- Pydantic Models --------
class TranslationResponse(BaseModel):
    text: str

# -------- Language Mapping --------
LANG_MAP: Dict[str, str] = {
    "fr": "French", 
    "it": "Italian",
    "de": "German",
    "es": "Spanish",
    "pt": "Portuguese",
    "ja": "Japanese",
    "id": "Indonesian",
    "zh": "Chinese (Simplified)",
    "ar": "Arabic",
    "vi": "Vietnamese",
    "tr": "Turkish",
    "pl": "Polish",
    "nl": "Dutch",
    "sv": "Swedish",
    "da": "Danish",
    "no": "Norwegian",
    "fi": "Finnish",
    "cs": "Czech",
    "he": "Hebrew"
}
MAX_TOKENS_BY_CHUNK = {
    4: 4000,
    8: 8000,
    16: 16000
}

# -------- Client Setup --------
try:
    client = AzureOpenAI(
        api_key=os.environ["AZURE_OPENAI_KEY"],
        api_version="2025-01-01-preview",
        azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
        timeout=config.timeout
    )
    model_name = os.getenv("AZURE_OPENAI_DEPLOYMENT")

    if not model_name:
        raise ValueError("AZURE_OPENAI_DEPLOYMENT environment variable not set")
    logger.info(f"Initialized Azure OpenAI client with model: {model_name}")
except Exception as e:
    logger.error(f"Failed to initialize Azure OpenAI client: {e}")
    sys.exit(1)

# -------- Improved JSON Chunking --------
def chunk_json_safely(json_content: Union[str, Dict], max_chars: int = None) -> List[Dict[str, Any]]:
    """
    Safely chunk JSON content while maintaining key structures.
    """
    if max_chars is None:
        max_chars = config.max_chunk_size
        
    # Parse JSON if it's a string
    if isinstance(json_content, str):
        try:
            data = json.loads(json_content)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON content: {e}")
    else:
        data = json_content
    
    if not isinstance(data, dict):
        raise ValueError("JSON content must be a dictionary at root level")
    
    chunks = []
    current_chunk = {}
    current_size = 0
    
    def estimate_json_size(obj: Any, indent_level: int = 0) -> int:
        """
        Estimate JSON output size in characters with proper indentation.

        Args:
            obj: The Python object to estimate.
            indent_level: The current indentation level (used for recursion).

        Returns:
            The estimated JSON string size in characters.
        """
        indent_str = "  " * indent_level
        next_indent_str = "  " * (indent_level + 1)
        
        # Handle dictionaries
        if isinstance(obj, dict):
            if not obj:
                return 2  # Represents "{}"
            
            total = 2  # For opening and closing braces
            total += len(indent_str)  # Indentation for closing brace
            
            items = list(obj.items())
            for i, (key, value) in enumerate(items):
                # Key part: indentation + "key":
                key_part = len(next_indent_str) + len(json.dumps(key)) + 2  # +2 for ": "
                
                # Value part
                if isinstance(value, (dict, list)):
                    value_part = 1 + estimate_json_size(value, indent_level + 1)  # +1 for newline
                else:
                    value_part = len(json.dumps(value))
                
                total += key_part + value_part
                
                # Add comma and newline except for last item
                if i < len(items) - 1:
                    total += 2  # ",\n"
                else:
                    total += 1  # "\n"
            
            return total

        # Handle lists
        elif isinstance(obj, list):
            if not obj:
                return 2  # Represents "[]"
            
            total = 2  # For opening and closing brackets
            total += len(indent_str)  # Indentation for closing bracket
            
            for i, item in enumerate(obj):
                # Item indentation
                total += len(next_indent_str)
                
                if isinstance(item, (dict, list)):
                    total += estimate_json_size(item, indent_level + 1)
                else:
                    total += len(json.dumps(item))
                
                # Add comma and newline except for last item
                if i < len(obj) - 1:
                    total += 2  # ",\n"
                else:
                    total += 1  # "\n"
            
            return total
            
        # Handle all other scalar types (int, float, bool, string, null)
        else:
            return len(json.dumps(obj))
    
    def add_to_chunk(key_path: List[str], value: Any, chunk: Dict) -> None:
        """Add a value to chunk while preserving nested structure"""
        current = chunk
        for key in key_path[:-1]:
            if key not in current:
                current[key] = {}
            current = current[key]
        current[key_path[-1]] = value
    
    def process_dict(obj: Dict, path: List[str] = None) -> None:
        """Recursively process dictionary"""
        nonlocal current_chunk, current_size, chunks
        
        if path is None:
            path = []
        
        for key, value in obj.items():
            current_path = path + [key]
            
            if isinstance(value, dict):
                process_dict(value, current_path)
            else:
                item_size = estimate_json_size({key: value})
                
                # Check if adding this item would exceed chunk size
                if current_size + item_size > max_chars and current_chunk:
                    chunks.append(copy.deepcopy(current_chunk))
                    current_chunk = {}
                    current_size = 0
                
                add_to_chunk(current_path, value, current_chunk)
                current_size += item_size
    
    process_dict(data)
    
    # Add the last chunk if it has content
    if current_chunk:
        chunks.append(current_chunk)
    
    return chunks

# -------- Retry Mechanism --------
def retry_with_backoff(func, max_retries: int = None, delay: float = None):
    """Generic retry decorator with exponential backoff"""
    if max_retries is None:
        max_retries = config.max_retries
    if delay is None:
        delay = config.retry_delay
        
    def wrapper(*args, **kwargs):
        last_exception = None
        
        for attempt in range(max_retries + 1):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                last_exception = e
                if attempt == max_retries:
                    break
                    
                wait_time = delay * (2 ** attempt)
                logger.warning(f"Attempt {attempt + 1} failed: {e}. Retrying in {wait_time:.2f}s...")
                time.sleep(wait_time)
        
        raise last_exception
    return wrapper

# -------- Translation Functions --------
def estimate_max_tokens(chunk_number: int) -> int:
    """
    Estimates the max token limit based on a given chunk number.

    The function uses a predefined dictionary to determine the token limit.
    The logic is as follows:
    - If the chunk number is less than or equal to a key in the dictionary, it returns the value of the smallest key that meets this condition.
    - For example, a chunk_number of 3 will return the value for chunk_number 4.
    - If the chunk number is greater than the largest key in the dictionary (e.g., 17), it will return the value of the largest key (16000).

    Args:
        chunk_number: The number of chunks to estimate the token limit for.

    Returns:
        An integer representing the estimated maximum token limit.
    """
    if not isinstance(chunk_number, int) or chunk_number <= 0:
        raise ValueError("Chunk number must be a positive integer.")
    
    # Get the keys from the dictionary and sort them in ascending order
    sorted_keys = sorted(MAX_TOKENS_BY_CHUNK.keys())

    # Find the first key that is greater than or equal to the chunk number.
    for key in sorted_keys:
        if chunk_number <= key:
            return MAX_TOKENS_BY_CHUNK[key]

    # If the chunk number is greater than all keys, return the max value.
    return MAX_TOKENS_BY_CHUNK[sorted_keys[-1]]

@retry_with_backoff
def translate_json_chunk(json_chunk: str, target_language: str, lang_code: str, chunk_length: int) -> str:
    """Translate a single JSON chunk with retry logic"""

    def translate_message_properties(data: Union[Dict, List, str], target_language: str) -> Union[Dict, List, str]:
        """
        Recursively translates the 'message' properties within a JSON-like data structure.
        """
        if isinstance(data, dict):
            translated_data = {}
            for key, value in data.items():
                if key == "message" and isinstance(value, str):
                    translated_data[key] = translate_text(value, target_language)
                else:
                    translated_data[key] = translate_message_properties(value, target_language)
            return translated_data
        elif isinstance(data, list):
            return [translate_message_properties(item, target_language) for item in data]
        else:
            return data

    @retry_with_backoff
    def translate_text(text: str, target_language: str) -> str:
        """
        Translates a given text to the target language using the Azure OpenAI API.
        """
        messages = [
            {
                "role": "system",
                "content": textwrap.dedent(f"""
                    You are a professional translation assistant.
                    
                    CRITICAL RULES:
                    1. Translate the content to {target_language}.
                    2. Return ONLY the translated text.
                    3. Do not translate code blocks, API requests, HTML/XML tags, or any programming syntax (e.g., `function()`, `<div>`, `SELECT *`).
                    4. Do not translate URLs, API endpoints, or file paths.
                    5. Do not translate template variables or format strings (e.g., `{{user_name}}`, `%s`, `{{{{ }}}}`).
                    6. Do not translate technical identifiers, slugs, or data formats like dates (e.g., `2025-08-14T11:36:03Z`).
                    7. Ensure all translated strings are properly escaped.
                    8. No explanations or additional content.
                """)
            },
            {"role": "user", "content": text}
        ]

        try:
            response = client.beta.chat.completions.parse(
                model=model_name,
                temperature=config.temperature,
                max_tokens=16000,
                messages=messages,
                response_format=TranslationResponse
            )

            if not response.choices or not response.choices[0].message.parsed:
                raise ValueError("Empty response from API")

            return response.choices[0].message.parsed.text

        except Exception as e:
            logger.error(f"Translation failed for {lang_code}: {e}")
            raise

    try:
        json_data = json.loads(json_chunk)
        translated_data = translate_message_properties(json_data, target_language)
        return json.dumps(translated_data, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.error(f"Translation failed for {lang_code}: {e}")
        raise

def validate_json(json_text: str) -> bool:
    """Validate that the text is valid JSON"""
    try:
        json.loads(json_text)
        return True
    except json.JSONDecodeError:
        return False

def translate_file(file_path: pathlib.Path) -> Dict[str, str]:
    """Translate a single file to all target languages"""
    logger.info(f"Processing file: {file_path}")
    
    # Read and parse original file
    try:
        original_content = file_path.read_text(encoding="utf-8")
        original_data = json.loads(original_content)
    except Exception as e:
        logger.error(f"Failed to read/parse {file_path}: {e}")
        raise
    
    # Chunk the JSON content
    chunks = chunk_json_safely(original_data, config.max_chunk_size)
    logger.info(f"Split into {len(chunks)} chunks")
    
    # Translate to all languages
    all_translations = {}
    
    for lang_code, lang_name in LANG_MAP.items():
        logger.info(f"Translating to {lang_name} ({lang_code})")
        translated_chunks = []
        
        for i, chunk in enumerate(chunks):
            try:
                # Convert chunk to JSON
                json_chunk = json.dumps(chunk, indent=2, ensure_ascii=False)
                
                # Translate the chunk
                logger.debug(f"Translating chunk {i+1}/{len(chunks)} for {lang_code}")
                translated_json = translate_json_chunk(json_chunk, lang_name, lang_code, len(chunk))
                
                # Validate the translation
                if not validate_json(translated_json):
                    logger.warning(f"Invalid JSON in translation for chunk {i+1}, lang: {lang_code} file: {file_path}")
                    # Try to fix common issues or skip this chunk
                
                translated_chunks.append(translated_json)
                
            except Exception as e:
                logger.error(f"Failed to translate chunk {i+1} for {lang_code}: {e} at {file_path}")
                # Continue with other chunks instead of failing completely
                continue
        
        # Combine all translated chunks
        if translated_chunks:
            # Parse each chunk and merge them
            try:
                merged_data = {}
                for chunk_json in translated_chunks:
                    chunk_data = json.loads(chunk_json)
                    if isinstance(chunk_data, dict):
                        merged_data = deep_merge(merged_data, chunk_data)
                
                # Convert back to JSON
                final_json = json.dumps(merged_data, indent=2, ensure_ascii=False)
                all_translations[lang_code] = final_json
                
            except Exception as e:
                logger.error(f"Failed to merge chunks for {lang_code}: {e}")
                continue
        else:
            logger.warning(f"No successful translations for {lang_code}")
    
    return all_translations

def deep_merge(dict1: Dict, dict2: Dict) -> Dict:
    """Deep merge two dictionaries"""
    merged = copy.deepcopy(dict1)
    for key, value in dict2.items():
        if key in merged and isinstance(merged[key], dict) and isinstance(value, dict):
            merged[key] = deep_merge(merged[key], value)
        else:
            merged[key] = value
    return merged

def save_translations(file_path: pathlib.Path, translations: Dict[str, str]) -> None:
    """Save translated files to appropriate directories"""
    src_path = pathlib.Path(file_path)
    
    for lang_code, translated_json in translations.items():
        try:
            # Create output directory structure
            out_base = pathlib.Path("i18n")
            relative_subpath = src_path.relative_to(f"i18n/{lang_code}").parent
            out_dir = out_base / lang_code / relative_subpath
            out_dir.mkdir(parents=True, exist_ok=True)
            
            # Save the file
            out_file = out_dir / src_path.name
            
            # Parse and re-save to ensure proper formatting
            translated_data = json.loads(translated_json)
            with open(out_file, "w", encoding="utf-8") as f:
                json.dump(translated_data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"Saved translation: {out_file}")
            
        except Exception as e:
            logger.error(f"Failed to save {lang_code} translation for {file_path}: {e}")

# -------- Main Execution --------
def main():
    """Main execution function"""
    if len(sys.argv) < 2:
        logger.error("Usage: python script.py <files_json>")
        sys.exit(1)
    
    try:
        files_to_translate = json.loads(sys.argv[1])
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in command line argument: {e}")
        sys.exit(1)
    
    logger.info(f"Starting translation of {len(files_to_translate)} files")
    
    success_count = 0
    error_count = 0
    
    for file_path_str in files_to_translate:
        try:
            file_path = pathlib.Path(file_path_str)
            
            if not file_path.exists():
                logger.warning(f"File not found: {file_path}")
                error_count += 1
                continue
            
            # Translate the file
            translations = translate_file(file_path)
            
            if translations:
                save_translations(file_path, translations)
                success_count += 1
                logger.info(f"Successfully processed: {file_path}")
            else:
                logger.warning(f"No translations generated for: {file_path}")
                error_count += 1
                
        except Exception as e:
            logger.error(f"Failed to process {file_path_str}: {e}")
            error_count += 1
            continue
    
    logger.info(f"Translation complete. Success: {success_count}, Errors: {error_count}")
    
    if error_count > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()