
# 🤝 Welcome to the Project!

Thank you for your interest in contributing to our **Docusaurus documentation**.  
We appreciate your help in making this project better.  
This guide will walk you through the process of contributing to the repository.

---

## 🚀 How to Contribute

1. **Fork the Repository**  
   Create a fork of this repository on GitHub.

2. **Clone Your Fork**  
   Clone your forked repository to your local machine:  
   ```bash
   git clone https://github.com/your-username/your-fork.git
```

3. **Create a New Branch**
   Always create a new branch for your work. Use a descriptive name:

   ```bash
   git checkout -b fix/name-of-fix
   # or
   git checkout -b feature/new-feature-name
   ```

4. **Make Your Changes**
   Implement your feature or fix.

5. **Commit and Push**
   Commit your changes with a clear and concise message.
   Push your changes to your new branch:

   ```bash
   git add .
   git commit -m "Fix: clear and descriptive commit message"
   git push origin your-branch-name
   ```

6. **Open a Pull Request (PR)**
   Open a PR from your branch to the `main` branch of the original repository.
   Provide a detailed description of your changes.

---

## ✍️ Markdown / MDX Style Guide

When contributing to the documentation, it is essential to follow our conventions to maintain consistency.

* **Explicit Heading IDs**
  All headings in `.md` and `.mdx` files must have an explicit heading ID.
  This ensures anchor links work correctly and provides stable URLs for navigation.

* **Syntax**
  Use the syntax `{#id}` directly after the heading text.
  The format is:

  ```
  {#<parent-directories>-<file-name>-<heading-number>}
  ```

  * Use hyphens to separate parent directories and file names.
  * Use a hyphen to separate the file name from the heading number.

* **Example**
  For a heading on the page `docs/api/getting-started.mdx`, the ID should be:

  ```markdown
  ## Heading Title {#docs-api-getting-started-1}
  ```

---

## 📄 API Documentation

Our API documentation is generated automatically from **OpenAPI specification files**.

### Steps to Update

1. **Edit the YAML File**
   All API specifications are located in the `api-swagger/` directory.
   Edit the relevant `.yaml` file for your changes.

2. **Lint the File**
   To ensure the file is valid and follows best practices, use **Spectral**.
   Install it globally first:

   ```bash
   npm install -g @stoplight/spectral
   ```

   Then, run the linter on your file:

   ```bash
   spectral lint <path_to_your_yaml_file>
   ```

3. **Generate Docs**
   After your changes are validated, regenerate the documentation:

   ```bash
   npm run gen-api-docs
   ```

   Or for versioned docs:

   ```bash
   npm run gen-api-docs:version
   ```

---

✅ Following this guide will help keep our documentation consistent, stable, and easy to navigate.
We’re excited to have your contributions onboard!

```

Do you also want me to add a **“Code of Conduct”** section so contributors know about community expectations (tone, respectful communication, etc.)?
```
