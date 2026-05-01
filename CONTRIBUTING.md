# Contributing to Plexicus Documentation

Thanks for helping make these docs better. This guide covers the contribution flow, the editorial conventions we enforce, and the URL-stability rules that keep external links from rotting.

---

## How to Contribute

1. **Fork** the repository on GitHub.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/docs.git
   cd docs
   ```
3. **Branch** from `main`:
   ```bash
   git checkout -b fix/short-description
   # or feature/short-description, docs/short-description
   ```
4. **Make your changes.** Run `pnpm start` to preview locally; `pnpm build` to verify before opening a PR.
5. **Commit and push:**
   ```bash
   git add docs/path/to/your/page.mdx
   git commit -m "docs(<area>): one-line summary"
   git push origin your-branch-name
   ```
6. **Open a Pull Request** to `main`. Include a short description of *why* the change is needed and a screenshot if visuals change.

---

## Documentation Architecture (Diátaxis)

Every page in this site lives in **exactly one** of five sections. If you can't decide where a new page goes, the page probably needs to be split.

| Section | Quadrant | Question it answers |
|---|---|---|
| **Introduction** | Onboarding | "What is this and where do I start?" |
| **Core Concepts** | Explanation | "How does it work and why?" |
| **Recipes** | How-to | "How do I do <task>?" |
| **Reference** | Information | "What is the exact contract / value / parameter?" |
| **Troubleshooting** | Problem-solving | "Why is this broken and how do I fix it?" |

Read [Diátaxis](https://diataxis.fr/) once if you haven't. Two minutes, saves a lot of arguments.

---

## Voice and Style

- **Lead with the answer, then explain.** No "Welcome to your security journey" intros.
- **One paragraph of "what & why"** at the top of every page. Then the content.
- **No marketing adjectives.** "Robust", "powerful", "seamless", "best-in-class" — delete all.
- **No filler admonitions.** Use `:::tip` / `:::warning` / `:::note` only when the reader will lose something by not reading it.
- **Cite the source of truth** for technical claims (link to `/docs/concepts/...`, not the marketing site).

---

## Markdown / MDX Style

- **All headings need explicit IDs.** Use the format `{#<parent-dir>-<file-name>-<heading-number>}`:
  ```markdown
  ## Heading Title \{#api-getting-started-1\}
  ```
  IDs survive renames; auto-generated slugs do not.
- **Component-heavy is the default.** Reach for `<Card>`, `<CardGroup>`, `<Tabs>`, `<Steps>`, `<Accordion>` before falling back to wall-of-text. These are auto-registered globally — no imports required.
- **Mermaid diagrams** are enabled (`@docusaurus/theme-mermaid`). Use them where prose describes a sequence or a graph.
- **Images** live under `static/docs/plexicus/<area>/`. Reference with absolute paths from `static/`: `/docs/plexicus/findings/list.png`.

---

## URL Stability — Read This Before Moving Pages

External users bookmark these URLs. Search engines index them. Slug churn breaks both.

**Rule (effective from this commit forward):**

> Once a doc page has been merged to `main`, its URL is **stable**. You may not delete or rename a slug without leaving a redirect.

### What this means in practice

- **Renaming a file or moving it between sections** → add a redirect entry in `docusaurus.config.ts` under the `@docusaurus/plugin-client-redirects` plugin config:
  ```ts
  {
    from: '/docs/old/path',
    to: '/docs/new/path',
  }
  ```
- **Deleting a page** → either replace it with a redirect to the closest equivalent, or coordinate a deprecation in the PR description (call out which inbound links break and where users should land).
- **Heading IDs are part of the URL contract.** Don't change `\{#some-id\}` once it's published unless you also update every link that points to it.

### What does *not* require a redirect

- **Editing the body** of an existing page.
- **Adding a new page** at a new slug.
- **Changing the visible title** without changing the slug.

### One-time exception

The PR that introduced this rule (the Diátaxis restructure) reorganized URLs *en bloc* and added the corresponding redirect map. After that PR, the rule applies without exception.

---

## Adding a New Page

1. Decide the quadrant (see Diátaxis table above). If it doesn't fit one cleanly, the scope is wrong — split or rethink.
2. Create the file under `docs/<section>/...` matching its quadrant.
3. Add it to `sidebars.ts` in the right category.
4. Add explicit heading IDs.
5. Run `pnpm build` locally — the build fails on broken links, missing IDs, and TypeScript errors. Fix all of them before pushing.

---

## API Documentation

Platform API reference is auto-generated from the OpenAPI spec.

1. **Edit the YAML/JSON file** in `api-swagger/`.
2. **Lint with Spectral**:
   ```bash
   npm install -g @stoplight/spectral
   spectral lint api-swagger/platform.json
   ```
3. **Regenerate**:
   ```bash
   npm run gen-api-docs
   ```

Do not hand-edit files under `docs/platform_api/` — they'll be overwritten on the next regen.

---

## Internationalization

Translations live in `i18n/`. Locales are configured in `config.json` (`locales: ["en", "es"]`).

- After adding or editing English content, run `npm run write-translations:all` to extract translatable strings.
- Translations are reviewed separately from content PRs — don't block on `es/` lagging behind `en/`.

---

## Local Development

```bash
pnpm install        # install deps
pnpm start          # dev server with hot reload
pnpm build          # production build (fails on broken links — run before pushing)
pnpm typecheck      # TypeScript strict check
pnpm clear          # nuke .docusaurus and build/ if things get weird
```

The build is configured with `onBrokenLinks: 'throw'`. If your PR breaks a link, CI will catch it — but it's faster to catch it locally.
