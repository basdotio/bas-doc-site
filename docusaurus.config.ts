import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "BAS Doc",
  tagline: "BNB Attestation Service",
  favicon: "img/bas.jpg",

  url: "https://doc.bas.io",
  baseUrl: "/",

  organizationName: "basdotio",
  projectName: "bas-doc-site",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Docs are served from the site root.
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "figures/welcome.jpg",
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
          href: "https://bascan.io",
        },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://www.bas.io/",
          label: "BAS Website",
          position: "right",
        },
        {
          href: "https://github.com/basdotio",
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
              label: "ERC-8004 & Agents",
              to: "/erc8004/overview",
            },
            {
              label: "BAS Guard",
              to: "/bas_guard/overview",
            },
            {
              label: "GraphQL",
              to: "/graphql",
            },
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
            {
              label: "GitHub",
              href: "https://github.com/basdotio",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BNB Attestation Service. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["solidity", "go", "python", "bash", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
