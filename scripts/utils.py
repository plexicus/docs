from typing import Dict
from pydantic import BaseModel, Field
from openai import AzureOpenAI
import os

# -------- Pydantic schema --------
class SingleLanguage(BaseModel):
    text: str

# -------- Frontmatter schema --------
class FrontmatterSchema(BaseModel):
    title: str
    description: str
    category: str
    tags: list[str]
    excerpt: str

MAX_TOKENS_BY_CHUNK = {
    4: 4000,
    8: 8000,
    16: 16000
}

LANG_MAP: Dict[str, str] = {
    "de": "German", "fr": "French", "ja": "Japanese", "it": "Italian", "nl": "Dutch", "sv": "Swedish", "es": "Spanish", "no": "Norwegian", "da": "Danish", "fi": "Finnish", "pt": "Portuguese",
    "zh": "Chinese (Simplified)", "ar": "Arabic", "he": "Hebrew",
    "tr": "Turkish", "pl": "Polish", "cs": "Czech", "id": "Indonesian"
}

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

MAX_CHUNK_SIZE = 1000  # Lower size to further reduce token risk

def chunk_text(text: str, max_chunk_size: int) -> list[str]:
    paragraphs = text.split("\n\n")
    chunks = []
    current_chunk = []
    current_chunk_len = 0

    for para in paragraphs:
        if current_chunk_len + len(para) + 2 > max_chunk_size and current_chunk:
            chunks.append("\n\n".join(current_chunk))
            current_chunk = []
            current_chunk_len = 0

        current_chunk.append(para)
        current_chunk_len += len(para) + 2

    if current_chunk:
        chunks.append("\n\n".join(current_chunk))

    return chunks

client = AzureOpenAI(
    api_key=os.environ["AZURE_OPENAI_KEY"],
    api_version="2025-01-01-preview",
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
)
