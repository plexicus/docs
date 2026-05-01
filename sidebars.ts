import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
import { SidebarConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types.js';

import { versionCrumb } from 'docusaurus-plugin-openapi-docs/lib/sidebars/utils';

import platformSidebar from './docs/platform_api/sidebar';

/**
 * Sidebar follows Diátaxis: Introduction / Core Concepts (Explanation) /
 * Recipes (How-to) / Reference / Troubleshooting.
 *
 * URL stability is governed by CONTRIBUTING.md — once a slug ships, it cannot
 * be moved or deleted without leaving a redirect in docusaurus.config.ts.
 */

const introduction: SidebarConfig = [
  {
    type: 'category',
    label: 'Introduction',
    collapsed: false,
    link: { type: 'doc', id: 'getting-started/introduction' },
    items: [
      'getting-started/introduction',
      'getting-started/quickstart',
      'getting-started/key-features',
    ],
  },
];

const coreConcepts: SidebarConfig = [
  {
    type: 'category',
    label: 'Core Concepts',
    collapsed: false,
    link: { type: 'doc', id: 'concepts/index' },
    items: [
      'concepts/architecture',
      'concepts/applications-lifecycle',
      'concepts/findings-model',
      'concepts/ai-remediation',
    ],
  },
];

const recipes: SidebarConfig = [
  {
    type: 'category',
    label: 'Recipes',
    collapsed: false,
    link: {
      type: 'generated-index',
      title: 'Recipes',
      description:
        'Goal-oriented how-to guides. Pick the task you need to accomplish — connect a source-code provider, wire up a cloud account, manage applications, work with findings. Each recipe assumes you already have an account; see the Quickstart if you do not.',
      slug: '/recipes',
    },
    items: [
      'recipes/manage-applications',
      {
        type: 'category',
        label: 'Findings',
        collapsed: true,
        items: [
          'recipes/work-with-findings',
          'recipes/configure-finding-filters',
          'recipes/customize-findings-columns',
          'recipes/bulk-send-to-developers',
          'recipes/export-findings',
        ],
      },
      {
        type: 'category',
        label: 'CI/CD & Automation',
        collapsed: true,
        items: [
          'recipes/generate-api-token',
          'recipes/trigger-scan-from-ci',
          'recipes/auto-provision-workflow',
          'recipes/configure-ai-provider',
          'recipes/upload-external-scan',
        ],
      },
      {
        type: 'category',
        label: 'Enterprise Integrations',
        collapsed: true,
        items: [
          'recipes/connect-jira',
          'recipes/connect-servicenow',
          'recipes/configure-sso',
          'recipes/configure-2fa',
          'recipes/configure-webhooks',
        ],
      },
      {
        type: 'category',
        label: 'Connect Source Control',
        collapsed: true,
        items: [
          'recipes/connect-github',
          'recipes/connect-gitlab',
          'recipes/connect-self-hosted-gitlab',
          'recipes/connect-bitbucket',
          'recipes/connect-gitea',
        ],
      },
      {
        type: 'category',
        label: 'Connect Cloud Accounts',
        collapsed: true,
        items: [
          'recipes/connect-aws',
          'recipes/connect-azure',
          'recipes/connect-gcp',
          'recipes/connect-oci',
        ],
      },
    ],
  },
];

const reference: SidebarConfig = [
  {
    type: 'category',
    label: 'Reference',
    collapsed: false,
    link: {
      type: 'generated-index',
      title: 'Reference',
      description:
        'Surgical reference material: organization settings, self-hosted deployment, and the Platform API. Information-oriented — read it when you need a specific value, parameter, or configuration option.',
      slug: '/reference',
    },
    items: [
      'reference/organization-settings',
      {
        type: 'category',
        label: 'Self-Hosted',
        collapsed: true,
        link: { type: 'doc', id: 'self-hosted/index' },
        items: [
          'self-hosted/index',
          'self-hosted/helm-chart',
          'self-hosted/local-evaluation',
          'self-hosted/air-gapped',
          {
            type: 'category',
            label: 'Configuration',
            link: { type: 'doc', id: 'self-hosted/configuration/index' },
            items: ['self-hosted/configuration/index'],
          },
        ],
      },
      {
        type: 'link',
        label: 'Platform API',
        href: '/docs/category/platform_api',
      },
    ],
  },
];

const troubleshooting: SidebarConfig = [
  {
    type: 'category',
    label: 'Troubleshooting',
    collapsed: true,
    link: {
      type: 'generated-index',
      title: 'Troubleshooting',
      description:
        'Problem-solving guides: error codes, recovery procedures, and known-bad states. Filled out incrementally; if you hit something not covered here, open an issue at github.com/plexicus/docs.',
      slug: '/troubleshooting',
    },
    items: [
      // Troubleshooting pages land in PR #4. The category renders an
      // auto-generated index page until then.
    ],
  },
];

const externalLinks: SidebarConfig = [
  {
    type: 'link',
    href: 'https://github.com/apps/plexicus',
    label: 'GitHub App',
    customProps: { icon: 'carbon:logo-github' },
  },
  {
    type: 'link',
    href: 'https://www.plexicus.ai/blog',
    label: 'Blog',
    customProps: { icon: 'material-symbols:post-rounded' },
  },
];

const sidebars: SidebarsConfig = {
  docsSidebar: [
    ...externalLinks,
    ...introduction,
    ...coreConcepts,
    ...recipes,
    ...reference,
    ...troubleshooting,
  ],
  'platform-current': [
    {
      type: 'html',
      defaultStyle: true,
      value: versionCrumb('v2.0.0'),
    },
    {
      type: 'category',
      label: 'Platform',
      link: {
        type: 'generated-index',
        title: 'Platform API (latest)',
        description: 'Auto-generated reference for the Plexicus Platform API. Generated by docusaurus-plugin-openapi-docs from api-swagger/platform.json.',
        slug: '/category/platform_api',
      },
      items: platformSidebar,
    },
  ],
};

export default sidebars;
