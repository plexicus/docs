import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {locales} from './config.json'
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Plexicus Documentation',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4 : {removeLegacyPostBuildHeadAttribute: true},
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
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          // if your API spec has multiple versions, you can use the following configuration
          petstore_versioned: {
            specPath: 'api-swagger/petstore.yaml', // Path to your API spec
            outputDir: 'docs/petstore_versioned', // No trailing slash
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag'
            },
            version: '2.0.0', // Current version
            label: 'v2.0.0', // Current version label
            baseUrl: '/docs/petstore_versioned/swagger-petstore-yaml', // Leading slash is important
            downloadUrl:
              'api-swagger/petstore.yaml',
            versions: {
              '1.0.0': {
                specPath: 'api-swagger/petstore-1.0.0.yaml', // Path to your API spec
                outputDir: 'docs/petstore_versioned/1.0.0', // No trailing slash
                label: 'v1.0.0',
                baseUrl: '/docs/petstore_versioned/1.0.0/swagger-petstore-yaml', // Leading slash is important
                downloadUrl:
                  'api-swagger/petstore-1.0.0.yaml'
              }
            }
          }
        }
      }
    ],
    ['./src/plugins/stage-build.js', {}],
  ],
  themes: ["docusaurus-theme-openapi-docs",
      [
    require.resolve('@easyops-cn/docusaurus-search-local'),
    {
      indexPages: true,
      docsRouteBasePath: '/docs',
      hashed: true,
      language: ['en', 'es'],
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
        { label: 'API References', position: 'left', to: '/docs/category/petstore-versioned-api' },
        {type: 'search', position: 'left', className: 'mx-auto'},
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
              to: '/docs/getting-started/introduction',
            },
            {
              label: 'API Reference',
              to: '/docs/category/petstore-versioned-api'
            },
            {
              label: 'Connectors',
              to: '/docs/integrations/github'
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
              href: 'https://blog.plexicus.ai'
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
