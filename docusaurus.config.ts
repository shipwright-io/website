import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Shipwright',
  tagline: 'Build Containers on Kubernetes',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://shipwright.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'shipwright-io', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Redirects from Hugo /docs/blog/posts/{slug}/ to Docusaurus /blog/{slug}
          { from: ['/docs/blog/posts/2020-10-21-intro-shipwright-pt1', '/docs/blog/posts/2020-10-21-intro-shipwright-pt1/', '/blog/2020/10/21/introducing-shipwright-part-1'], to: '/blog/introducing-shipwright-part-1' },
          { from: ['/docs/blog/posts/2020-11-30-intro-shipwright-pt2', '/docs/blog/posts/2020-11-30-intro-shipwright-pt2/'], to: '/blog/introducing-shipwright-part-2' },
          { from: ['/docs/blog/posts/2021-08-02-adding-gatekeeper.md', '/docs/blog/posts/2021-08-02-adding-gatekeeper.md/'], to: '/blog/gatekeeper-policies-with-shipwright' },
          { from: ['/docs/blog/posts/2021-08-03-cd-foundation-incubating-project', '/docs/blog/posts/2021-08-03-cd-foundation-incubating-project/'], to: '/blog/cd-foundation-incubating-project' },
          { from: ['/docs/blog/posts/2021-10-26-build-release-v0.6.0', '/docs/blog/posts/2021-10-26-build-release-v0.6.0/'], to: '/blog/shipwright-v0.6.0-is-here' },
          { from: ['/docs/blog/posts/2021-12-20-build-release-v0.7.0', '/docs/blog/posts/2021-12-20-build-release-v0.7.0/'], to: '/blog/shipwright-v0.7.0-is-here' },
          { from: ['/docs/blog/posts/2022-02-01-build-release-v0.8.0', '/docs/blog/posts/2022-02-01-build-release-v0.8.0/'], to: '/blog/shipwright-v0.8.0-is-here' },
          { from: ['/docs/blog/posts/2022-04-14-build-release-v0.9.0', '/docs/blog/posts/2022-04-14-build-release-v0.9.0/'], to: '/blog/shipwright-v0.9.0-is-here' },
          { from: ['/docs/blog/posts/2022-05-23-cdcon-2022', '/docs/blog/posts/2022-05-23-cdcon-2022/'], to: '/blog/upcoming-shipwright-community-summit' },
          { from: ['/docs/blog/posts/2022-06-03-build-release-v0.10.0', '/docs/blog/posts/2022-06-03-build-release-v0.10.0/'], to: '/blog/shipwright-v0.10.0-is-here' },
          { from: ['/docs/blog/posts/2022-09-09-build-release-v0.11.0', '/docs/blog/posts/2022-09-09-build-release-v0.11.0/'], to: '/blog/shipwright-v0.11.0-is-here' },
          { from: ['/docs/blog/posts/2022-09-28-hacktoberfest', '/docs/blog/posts/2022-09-28-hacktoberfest/'], to: '/blog/hacktoberfest-2022' },
          { from: ['/docs/blog/posts/2022-10-25-shipwright-beta', '/docs/blog/posts/2022-10-25-shipwright-beta/'], to: '/blog/bringing-shipwright-to-beta-and-beyond' },
          { from: ['/docs/blog/posts/2023-10-01-hacktoberfest', '/docs/blog/posts/2023-10-01-hacktoberfest/'], to: '/blog/hacktoberfest-2023' },
          { from: ['/docs/blog/posts/2023-11-05-build-release-v0.12.0', '/docs/blog/posts/2023-11-05-build-release-v0.12.0/'], to: '/blog/shipwright-v0.12.0-is-here' },
          { from: ['/docs/blog/posts/2023-11-07-beta-api', '/docs/blog/posts/2023-11-07-beta-api/'], to: '/blog/introducing-shipwright-beta-api' },
          { from: ['/docs/blog/posts/2024-03-27-build-release-v0.13.0', '/docs/blog/posts/2024-03-27-build-release-v0.13.0/'], to: '/blog/shipwright-v0.13.0-is-here' },
          { from: ['/docs/blog/posts/2024-07-15-vulnerability-scanning', '/docs/blog/posts/2024-07-15-vulnerability-scanning/'], to: '/blog/building-secure-container-images-with-shipwright' },
          { from: ['/docs/blog/posts/2024-11-15-release-v0.14.0', '/docs/blog/posts/2024-11-15-release-v0.14.0/'], to: '/blog/shipwright-v0.14.0-is-here' },
          { from: ['/docs/blog/posts/2025-02-28-release-v0.15', '/docs/blog/posts/2025-02-28-release-v0.15/'], to: '/blog/shipwright-v0.15-is-here' },
          { from: ['/docs/blog/posts/2025-5-20-build-scheduler-features', '/docs/blog/posts/2025-5-20-build-scheduler-features/'], to: '/blog/shipwright-build-scheduler-features' },
          { from: ['/docs/blog/posts/2025-06-16-release-v0.16', '/docs/blog/posts/2025-06-16-release-v0.16/'], to: '/blog/shipwright-v0.16-is-here' },
          { from: ['/docs/blog/posts/2025-09-02-release-v0.17', '/docs/blog/posts/2025-09-02-release-v0.17/'], to: '/blog/shipwright-v0.17-is-here' },
          { from: ['/docs/blog/posts/2025-12-01-release-v0.18', '/docs/blog/posts/2025-12-01-release-v0.18/'], to: '/blog/shipwright-v0.18-is-here' },
          { from: ['/docs/blog/posts/2026-03-13-release-v0.19', '/docs/blog/posts/2026-03-13-release-v0.19/'], to: '/blog/shipwright-v0.19-is-here' },
          // Redirect the blog index
          { from: ['/docs/blog', '/docs/blog/'], to: '/blog' },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/shipwright-io/website/tree/main/docs/'
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/blog/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/shipwright-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Shipwright',
      logo: {
        alt: 'Shipwright Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/shipwright-io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'CNCF Sandbox Project',
        src: 'img/cncf-sandbox-horizontal-white.svg',
        srcDark: 'img/cncf-sandbox-horizontal-white.svg',
        href: 'https://www.cncf.io/projects/shipwright/',
        width: 200,
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'User Mailing List',
              href: 'https://lists.cncf.io/g/shipwright-users',
            },
            {
              label: 'Dev Mailing List',
              href: 'https://lists.cncf.io/g/shipwright-dev',
            },
            {
              label: 'Slack',
              href: 'https://kubernetes.slack.com/archives/C019ZRGUEJC',
            },
            {
              label: 'X',
              href: 'https://x.com/shipwright-io',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/shipwright-io',
            },
          ],
        },
      ],
      copyright: `<p>© ${new Date().getFullYear()} Shipwright Contributors | Documentation Distributed under <a href="https://github.com/shipwright-io/website/blob/main/LICENSE">CC by 4.0</a></p><p>© ${new Date().getFullYear()} The Linux Foundation®. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage">Trademark Usage</a> page</p>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
