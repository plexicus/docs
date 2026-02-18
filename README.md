
# 🚀 Plexicus Documentations

This is the official documentation site for **Plexicus Docs**, built to provide comprehensive information on our APIs, features, and usage.

---

## ⚙️ Installation

To set up and run the project locally, please ensure you have **Node.js** and **npm** installed.

Clone the repository:

```bash
git clone https://github.com/plexicus/docs.git
cd your-repo
```

Install dependencies:

```bash
npm install
```
---

## 🏃 Running the Project

The following npm scripts are available for common development tasks:

* **`npm start`**
  Starts a local development server and opens the site in your browser.
  The server features hot-reloading for a fast development loop.

* **`npm run build`**
  Compiles the Docusaurus site into static HTML, CSS, and JavaScript files, ready for deployment.
  The output is placed in the `build/` directory.

* **`npm run build:opt`**
  Specifically optimized for large projects, increasing the Node.js memory limit to **20GB** to prevent build failures.

* **`npm run serve`**
  Serves the production build from the `build/` directory locally.
  Useful for testing the final, optimized version of the site before deployment.

* **`npm run clear`**
  Deletes the `.docusaurus/` and `build/` directories to perform a clean start.


---
## 🌎 Internationalization (i18n)

* **`npm run write-translations`**
  Extracts all translatable strings from your documents and saves them to the `i18n/` directory, ready for translation.

* **`npm run write-translations:all`**
  Runs a shell script that specifically handles the translation process for all supported languages.

---

## 📚 API Documentation

Our API documentation is generated from **OpenAPI specifications**.

* **`npm run gen-api-docs`**
  Generates API documentation based on the `.yaml` files in the `api-swagger/` directory.

* **`npm run clean-api-docs`**
  Deletes all generated API documentation files.

---



## 🛠️ Other Commands


 * **`npm run swizzle`**
  Customize core Docusaurus components by "swizzling" them into your project.

* **`npm run deploy`**
  Deploys the built site to your configured hosting provider.

* **`npm run typecheck`**
  Runs the TypeScript compiler to check for type errors.

* **`npm run write-heading-ids`**
  Adds explicit heading IDs to all markdown and MDX files.
```