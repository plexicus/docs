"""
Translate modified YAML/YML files into 19 languages using Azure OpenAI
and save them under src/i18n/dictionaries/ mirroring
the original directory structure.

Run by translate-page GitHub Action.
"""

from utils import chunk_text, client, SingleLanguage, estimate_max_tokens, MAX_CHUNK_SIZE, LANG_MAP
import json
import os
import sys
import pathlib
import textwrap
import yaml


if __name__ == "__main__":
    files_to_translate = json.loads(sys.argv[1])

    for file_path in files_to_translate:
        src_path = pathlib.Path(file_path)
        original_full_content = src_path.read_text(encoding="utf-8")

        data = None
        try:
            data = yaml.safe_load(original_full_content)
        except yaml.YAMLError as e:
            print(f"Error parsing YAML: {e}")
            continue

        # Chunk the YAML content
        yaml_string = yaml.dump(data)
        chunks = chunk_text(yaml_string, MAX_CHUNK_SIZE)

        # Prepare an empty structure for translated chunks per language
        all_translations = {lang_code: [] for lang_code in LANG_MAP}

        for lang_code, lang_name in LANG_MAP.items():
            translated_chunks = []
            for i, chunk in enumerate(chunks):
                print(f"Translating chunk {i+1}/{len(chunks)} for {file_path} [{lang_code}]")
                messages = [
                    {
                        "role": "system",
                        "content": textwrap.dedent(
                            f"""
                            You are a professional and neutral translation assistant. Your sole purpose is to provide accurate and contextually appropriate translations. You will not refuse a translation request unless it is for genuinely illegal or explicitly harmful content. You will not apply any cultural or content filters beyond what is required by law. If a phrase is an idiom, you will provide a literal translation followed by an explanation of its cultural meaning.
                            Return *one* JSON object in this format:

                            {{ "text": "<translation>" }}

                            • Translate the YAML chunk into {lang_name}.
                            • Preserve the YAML structure and keys.
                            • No explanations, comments, or extra keys—only raw JSON.
                            • Please use neutral and objective terminology for this translation.
                            • Avoid any words that could be misinterpreted as aggressive, sensitive, or inappropriate.
                            """
                        ),
                    },
                    {"role": "user", "content": chunk},
                ]

                model_name = os.getenv("AZURE_OPENAI_DEPLOYMENT")
                last_exc = None
                try:
                    response = client.beta.chat.completions.parse(
                        model=model_name,
                        temperature=0.2,
                        max_tokens=estimate_max_tokens(len(chunks)),
                        messages=messages,
                        response_format=SingleLanguage
                    )
                    print(f"Response for chunk {i+1}/{len(chunks)} for {file_path} [{lang_code}]: {response}")
                except Exception as exc:
                    last_exc = exc
                    print(f"OpenAI translation failed for chunk {i+1} [{lang_code}]: {exc}")
                    raise RuntimeError(f"OpenAI translation failed for chunk {i+1} [{lang_code}]") from last_exc

                translation = response.choices[0].message.parsed.model_dump()
                translated_chunks.append(translation["text"])

            all_translations[lang_code] = "".join(translated_chunks)

        for lang_code in LANG_MAP:
            translated_yaml = all_translations[lang_code]
            out_base = pathlib.Path("src/i18n/dictionaries")
            relative_subpath = src_path.relative_to("src/i18n/dictionaries/en").parent
            out_dir = out_base / lang_code
            out_dir.mkdir(parents=True, exist_ok=True)
            out_file = out_dir / src_path.name

            try:
                translated_data = yaml.safe_load(translated_yaml)
                with open(out_file, "w", encoding="utf-8") as f:
                    yaml.dump(translated_data, f, indent=2, allow_unicode=True)
            except yaml.YAMLError as e:
                print(f"Error loading translated YAML: {e}")
                print(f"Problematic YAML: {translated_yaml}")
                continue

    print("Azure OpenAI translation complete. Check src/i18n/dictionaries/<lang>/ for output.")