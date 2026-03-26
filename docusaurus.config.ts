import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "BAS Doc",
  tagline: "BNB Attesttation Service",
  favicon: "img/bas.jpg",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bas", // Usually your GitHub org/user name.
  projectName: "bas-doc", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // routeBasePath: '/', // Set this value to '/'.
          // homePageId: 'getting-started', // Set to existing document id.
          routeBasePath: "/", // Set this value to '/'.
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "BAS Doc",
      logo: {
        alt: "BAS Logo",
        src: "img/bas.jpg",
      },
      items: [
        {
          label: "BAS Explorer",
          position: "right",
          href: "https://bas.io",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://www.bnbattest.io/",
          label: "BAS Website",
          position: "right",
        },
        {
          href: "https://github.com/bnb-attestation-service",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Welcome to BAS",
              to: "/",
            },
            {
              label: "Quick Start",
              to: "/quick_start",
            },
            {
              label: "Graphql",
              to:"/Graphql"
            }
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Telegram",
              href: "https://t.me/+On8eyMFa__JjNWY1",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/HjpUFRsGge",
            },
            {
              label: "Twitter",
              href: "https://x.com/BASCAN_io",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Explorer",
              href: "https://bascan.io",
            },
            // {
            //   label: 'GitHub',
            //   href: 'https://github.com/facebook/docusaurus',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BNB Attestation Service. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
