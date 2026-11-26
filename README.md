# BAS Docs

Source of the [BNB Attestation Service](https://www.bas.io/) documentation site, built with [Docusaurus 3](https://docusaurus.io/).

## Requirements

- Node.js 20 or later
- npm (the lockfile and the Vercel build both use npm)

## Local development

```bash
npm install
npm start
```

`npm start` runs a dev server at http://localhost:3000 with live reload.

## Build

```bash
npm run build
npm run serve
```

`npm run build` writes the static site to `build/`. The build fails on broken internal links, so run it before opening a pull request. `npm run serve` previews the built site locally.

## Project layout

| Path | Purpose |
|---|---|
| `docs/` | Markdown pages. Docs are served from the site root (`/`). |
| `sidebars.ts` | Sidebar structure. A new page must be added here to show up. |
| `docusaurus.config.ts` | Site metadata, navbar, footer, code-highlighting languages. |
| `static/figures/` | Images referenced from the docs as `/figures/<name>`. |
| `src/css/custom.css` | Theme overrides. |

## Writing conventions

- Pages are written in English, with `sidebar_position` and `sidebar_label` front matter.
- Link to other pages with relative `.md` paths so the build can check them.
- Contract addresses, endpoints and commands must match the source repositories under [github.com/basdotio](https://github.com/basdotio).

## Deployment

The site is deployed by Vercel from the `main` branch using the settings in `vercel.json` (`npm install`, `npm run build`, output in `build/`).
