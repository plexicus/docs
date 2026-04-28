"""
Translate modified Markdown/MDX files into 19 languages using Azure OpenAI
and save them under src/content/blog/ mirroring
the original directory structure.

Run by translate-blog GitHub Action.
"""

from utils import chunk_text, client, FrontmatterSchema, SingleLanguage, estimate_max_tokens, MAX_CHUNK_SIZE, LANG_MAP
import json
import os
import sys
import pathlib
import textwrap
import frontmatter


if __name__ == "__main__":
    files_to_translate = json.loads(sys.argv[1])

    for file_path in files_to_translate:
        src_path = pathlib.Path(file_path)
        original_full_content = src_path.read_text(encoding="utf-8")

        post = None
        content_to_translate = original_full_content
        if original_full_content.lstrip().startswith("---"):
            post = frontmatter.loads(original_full_content)
            content_to_translate = post.content
            # Abstract metadata extraction
            metadata = post.metadata

        chunks = chunk_text(content_to_translate, MAX_CHUNK_SIZE)

        # Prepare an empty structure for translated chunks per language
        all_translations = {lang_code: [] for lang_code in LANG_MAP}
        all_frontmatter_translations = {lang_code: {} for lang_code in LANG_MAP}

        for lang_code, lang_name in LANG_MAP.items():
            # Translate frontmatter
            if post:
                frontmatter_messages = [
                    {
                        "role": "system",
                        "content": textwrap.dedent(
                            f"""
                            You are a professional translator.
                            Return *one* JSON object containing the translated frontmatter properties. Preserve the original keys.

                            • Translate the relevant frontmatter properties into {lang_name}.
                            • Do not translate properties that should remain in the original language (e.g., dates, specific IDs).
                            • No explanations, comments, or extra keys—only raw JSON.
                            """
                        ),
                    },
                    {"role": "user", "content": json.dumps(metadata)},
                ]

                model_name = os.getenv("AZURE_OPENAI_DEPLOYMENT")
                last_exc = None
                try:
                    response = client.beta.chat.completions.parse(
                        model=model_name,
                        temperature=0.2,
                        max_tokens=4000,
                        messages=frontmatter_messages,
                        response_format=FrontmatterSchema
                    )
                    print(f"Frontmatter Response for {file_path} [{lang_code}]: {response}")
                except Exception as exc:
                    last_exc = exc
                    print(f"OpenAI translation failed for frontmatter [{lang_code}]: {exc}")
                    raise RuntimeError(f"OpenAI translation failed for frontmatter [{lang_code}]") from last_exc

                frontmatter_translation = response.choices[0].message.parsed.model_dump()
                all_frontmatter_translations[lang_code] = frontmatter_translation

            # Translate content chunks
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

                            • Translate the ENTIRE Markdown verbatim into {lang_name}.
                            • Preserve headings, links, code blocks, etc.
                            • Leave alone the mermaid diagrams 
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

                chunk_translation = response.choices[0].message.parsed.model_dump()
                all_translations[lang_code].append(chunk_translation["text"])
        # Reassemble translated chunks
        final_translations = {
            lang_code: "\n\n".join(translated_chunks)
            for lang_code, translated_chunks in all_translations.items()
        }

        for lang_code in LANG_MAP:
            translated_markdown = final_translations[lang_code]
            out_base = pathlib.Path("i18n")
            relative_subpath = src_path.relative_to("docs").parent
            out_dir = out_base / lang_code / "docusaurus-plugin-content-docs" / "current" / relative_subpath
            out_dir.mkdir(parents=True, exist_ok=True)
            out_file = out_dir / src_path.name

            if post:
                # Update frontmatter with translated values
                for key, value in all_frontmatter_translations[lang_code].items():
                    post.metadata[key] = value
                post.content = translated_markdown
                out_file.write_text(frontmatter.dumps(post), encoding="utf-8")
            else:
                out_file.write_text(translated_markdown, encoding="utf-8")

    print("Azure OpenAI translation complete. Check i18n/<lang>/docusaurus-plugin-content-docs/current/ for output.")