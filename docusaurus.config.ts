import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { locales } from './config.json'
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Plexicus Documentation',
  tagline: 'Secure your code-to-cloud lifecycle with AI-driven remediation.',
  favicon: 'img/favicon.ico',
  markdown: {
    mermaid: true,
  },
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: { removeLegacyPostBuildHeadAttribute: true },
    experimental_faster: true
  },

  // Set the production url of your site here
  url: 'https://docs.plexicus.ai/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'plexicus', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
          // Please change this to your repo.
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ['./src/plugins/tailwind-config.js', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // URL governance — see CONTRIBUTING.md.
        // The Diátaxis restructure (PR #1) moved every non-self-hosted doc.
        // Past this PR, slug changes require an entry here.
        redirects: [
          // ---- Source-control connector pages (was /docs/integrations/*) ----
          { from: '/docs/integrations/github', to: '/docs/recipes/connect-github' },
          { from: '/docs/integrations/gitlab', to: '/docs/recipes/connect-gitlab' },
          { from: '/docs/integrations/gitlab/self-hosted', to: '/docs/recipes/connect-self-hosted-gitlab' },
          { from: '/docs/integrations/bitbucket', to: '/docs/recipes/connect-bitbucket' },
          { from: '/docs/integrations/gitea', to: '/docs/recipes/connect-gitea' },
          // ---- Cloud connector pages (was /docs/integrations/*) ----
          { from: '/docs/integrations/aws', to: '/docs/recipes/connect-aws' },
          { from: '/docs/integrations/azure', to: '/docs/recipes/connect-azure' },
          { from: '/docs/integrations/gcp', to: '/docs/recipes/connect-gcp' },
          { from: '/docs/integrations/oci', to: '/docs/recipes/connect-oci' },
          // ---- Applications & findings (now Recipes) ----
          { from: '/docs/applications', to: '/docs/recipes/manage-applications' },
          { from: '/docs/findings', to: '/docs/recipes/work-with-findings' },
          // ---- Organization (now Reference) ----
          { from: '/docs/organization/client', to: '/docs/reference/organization-settings' },
          // ---- Deleted settings stubs (now folded into organization-settings) ----
          {
            from: '/docs/settings/change-password',
            to: '/docs/reference/organization-settings#organization_client-3',
          },
          {
            from: '/docs/settings/two-factor-authentication',
            to: '/docs/reference/organization-settings#organization_client-2',
          },
        ],
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          // if your API spec has multiple versions, you can use the following configuration
          platform: {
            specPath: 'api-swagger/platform.json',
            outputDir: 'docs/platform_api',
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag'
            },
          }
          // petstore_versioned: {
          //   specPath: 'api-swagger/petstore.yaml', // Path to your API spec
          //   outputDir: 'docs/petstore_versioned', // No trailing slash
          //   sidebarOptions: {
          //     groupPathsBy: 'tag',
          //     categoryLinkSource: 'tag'
          //   },
          //   version: '2.0.0', // Current version
          //   label: 'v2.0.0', // Current version label
          //   baseUrl: '/docs/petstore_versioned/swagger-petstore-yaml', // Leading slash is important
          //   downloadUrl:
          //     'api-swagger/petstore.yaml',
          //   versions: {
          //     '1.0.0': {
          //       specPath: 'api-swagger/petstore-1.0.0.yaml', // Path to your API spec
          //       outputDir: 'docs/petstore_versioned/1.0.0', // No trailing slash
          //       label: 'v1.0.0',
          //       baseUrl: '/docs/petstore_versioned/1.0.0/swagger-petstore-yaml', // Leading slash is important
          //       downloadUrl:
          //         'api-swagger/petstore-1.0.0.yaml'
          //     }
          //   }
          // }
        }
      }
    ],
    ['./src/plugins/stage-build.js', {}],
  ],
  themes: ["docusaurus-theme-openapi-docs",
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexPages: true,
        docsRouteBasePath: '/docs',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: false,
        searchResultContextMaxLength: 50,
        searchResultLimits: 8,
        searchBarShortcut: true,
        searchBarShortcutHint: true
      }
    ]
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/plexicus-logo-color.png',
    navbar: {
      title: 'Plexicus',
      logo: {
        alt: 'Plexicus Docs',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right'
        },
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        { label: 'API References', position: 'left', to: '/docs/category/platform_api' },
        { type: 'search', position: 'left', className: 'mx-auto' },
        {
          href: 'https://github.com/plexicus',
          label: ' ',
          position: 'right',
          className: 'header-github-link'
        },
        {
          href: 'https://app.plexicus.ai/login',
          label: 'Login',
          position: 'right',
        },
        {
          href: 'https://app.plexicus.ai/register',
          label: 'Register',
          position: 'right',
        },
      ],
    },
    docs: { sidebar: { autoCollapseCategories: true, hideable: true } },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quickstart',
              to: '/docs/getting-started/quickstart',
            },
            {
              label: 'Connectors',
              to: '/docs/recipes/connect-github'
            },
            {
              label: 'Self-Hosted',
              to: '/docs/self-hosted'
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/plexicus',
            },
            {
              label: 'Linkedin',
              href: 'https://linkedin.com/plexicus_ai',
            },
            {
              label: 'X',
              href: 'https://x.com/plexicus_ai',
            },
            {
              label: 'Instagram',
              href: 'https://instagram.com/plexicus_ai',
            },
            {
              label: 'Feature Request',
              href: 'https://plexicus.canny.io/feature-requests'
            },
            {
              label: 'Blog',
              href: 'https://www.plexicus.ai/blog'
            }
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Products',
              href: 'https://www.plexicus.ai/products/cnapp-platform/',
            },
            {
              label: 'Contact Us',
              href: 'https://www.plexicus.ai/contact/',
            },
            {
              label: 'Pricing',
              href: 'https://www.plexicus.ai/pricing/',
            },
            {
              label: 'Solutions',
              href: 'https://www.plexicus.ai/solutions/',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Plexicus S.L. `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
