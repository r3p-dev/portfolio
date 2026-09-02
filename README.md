# r3p.dev

Personal portfolio and blog of **Muhamad Repiyan** — projects, writing on
infrastructure and web development, and a guestbook.

Built with [Astro](https://astro.build), TypeScript, and Tailwind CSS v4.
Live at **[r3p.dev](https://r3p.dev)**.

## Stack

| Layer     | Choice                                                              |
| :-------- | :------------------------------------------------------------------ |
| Framework | Astro 7 — static output, Node standalone adapter for dynamic routes |
| Language  | TypeScript (`astro/tsconfigs/strictest`)                            |
| Styling   | Tailwind CSS v4 via `@tailwindcss/vite`, OKLCH design tokens        |
| Content   | MDX content collections with Zod schemas                            |
| Runtime   | Bun                                                                 |
| Database  | `node:sqlite` (guestbook only)                                      |
| Deploy    | Docker → GHCR → VPS (Podman + systemd)                              |

## Getting started

Requires [Bun](https://bun.sh). The `engines` field pins Node >= 22.12, since
the guestbook relies on the `node:sqlite` built-in.

```sh
bun install
bun dev          # http://localhost:4321
```

| Command          | Action                                     |
| :--------------- | :----------------------------------------- |
| `bun install`    | Install dependencies                       |
| `bun dev`        | Dev server at `localhost:4321`             |
| `bun run build`  | Production build to `./dist/`              |
| `bun preview`    | Preview the production build locally       |
| `bun run check`  | `astro check` — typecheck `.astro` and TS  |

CI runs `check` then `build` on every push and pull request.

## Architecture

### Rendering

The site is **static by default**. Only the guestbook opts out via
`export const prerender = false`, which is why the Node adapter is present —
`bun run dist/server/entry.mjs` serves the prerendered pages plus that one
dynamic route.

### Routes

| Route                        | Notes                                |
| :--------------------------- | :----------------------------------- |
| `/`                          | Home — bio, experience, skills       |
| `/projects`, `/projects/:id` | Project collection                   |
| `/blogs`, `/blogs/:id`       | Paginated at `/blogs/page/:n`        |
| `/tags`, `/tags/:tag`        | Cross-collection tag index           |
| `/now`                       | What I'm currently working on        |
| `/guestbook`                 | Server-rendered, accepts `POST`      |
| `/rss.xml`, `/robots.txt`    | Generated; sitemap via integration   |

Page routes are mirrored under `/id/` (see [i18n](#internationalization)); the
`rss.xml`, `robots.txt`, and sitemap endpoints are served once at the root.

### Content

Three collections defined in [`src/content.config.ts`](src/content.config.ts),
loaded from `src/contents/` as MDX and validated with Zod:

- **`blogs`** — `title`, `description`, `date`, optional `updated`, `tags`,
  `cover`, `draft`
- **`projects`** — the above plus optional `repository`, `demo`, and a `wip` flag
- **`now`** — one file per locale, just `updatedAt`

The Markdown pipeline adds a few local plugins from [`src/plugins/`](src/plugins/):

- `rehype-demote-headings` — shifts authored `h1`–`h5` down one level so the
  page's real `h1` stays unique
- `rehype-scrollable-tables` — wraps tables in a horizontally scrollable
  container instead of letting them overflow the page
- `shiki-code-blocks` — Shiki transformer for code block chrome and
  `output`-language blocks
- `content-dates` — reads frontmatter at config time to emit accurate
  `lastmod` values in the sitemap

Code blocks use dual Shiki themes (`github-light-default` / `github-dark-default`)
that switch with the site theme.

### Internationalization

English is the default locale and is unprefixed; Indonesian lives under `/id/`.

Messages are plain typed objects in [`src/lib/i18n/`](src/lib/i18n/). `en.ts` is
the source of truth — `MessageKey` is derived from it, and `id.ts` is declared
`: Messages`, so a missing or misspelled translation key is a **type error**,
caught by `bun run check`.

### SEO

[`src/lib/seo/`](src/lib/seo/) centralizes canonical URLs, `hreflang`
alternates, Open Graph metadata, and JSON-LD (`Person`, `WebSite`, `WebPage`,
`BlogPosting`). Sitemap entries carry per-page `lastmod` and priority.

### Guestbook

The only stateful part of the site. Entries are stored in SQLite via
`node:sqlite` in WAL mode, with the schema created on first connection
([`src/lib/server/db.ts`](src/lib/server/db.ts)).

Submissions are handled with POST-redirect-GET and are protected by a honeypot
field, length validation, and suppression of identical `(name, message)` pairs
submitted within the same hour. No JavaScript is required to sign it — the form
works as a plain HTML `POST`.

### Theming

Light and dark palettes are OKLCH custom properties in
[`src/styles/globals.css`](src/styles/globals.css). The site defaults to dark; a
small inline script in `<head>` applies the stored preference before first paint
to avoid a flash. Users can pick light, dark, or system.

Colors are tuned to meet **WCAG AA (4.5:1)** contrast. Note that the light
palette has almost no headroom — `--muted-foreground` is 4.73:1 on the
background — so subtle text uses the dedicated `--muted-foreground-subtle`
token rather than a Tailwind alpha modifier, which would silently fail AA.

### Performance

- Stylesheets are inlined (`build.inlineStylesheets: 'always'`) so there is no
  render-blocking CSS request.
- JetBrains Mono is served through Astro's font pipeline with `font-display: swap`,
  a preloaded WOFF2, and a metric-matched local fallback, so text paints
  immediately.
- Images go through `astro:assets`; the logo uses `densities` to serve
  1x/2x/3x variants.
- Link prefetching is enabled site-wide on hover, alongside view transitions.

## Project layout

```text
src/
├── assets/       # Images and SVG icons processed by astro:assets
├── components/
│   ├── atoms/    # Button, Card, Badge, Icon, ...
│   ├── molecules/
│   ├── organisms/# Nav, pagination, lightbox, TOC
│   ├── layouts/  # AppLayout — <head>, nav, footer
│   └── pages/    # Page-level composition, kept out of src/pages
├── contents/     # MDX source for blogs, projects, now
├── lib/
│   ├── content/  # Collection queries, TOC, formatting
│   ├── i18n/     # Typed message dictionaries
│   ├── seo/      # Canonicals, OG, JSON-LD
│   └── server/   # Guestbook DB, validation, form handling
├── pages/        # Routing only; mirrored under [lang]/
├── plugins/      # Local rehype/Shiki plugins
└── styles/       # Tailwind entry and design tokens
```

Routing files in `src/pages/` stay thin and delegate to `src/components/pages/`,
so the English and Indonesian variants of a page share one implementation.

Path aliases (`tsconfig.json`): `@assets/*`, `@components/*`, `@lib/*`,
`@plugins/*`, `@styles/*`.

## Configuration

| Variable       | Default                | Purpose                        |
| :------------- | :--------------------- | :----------------------------- |
| `GUESTBOOK_DB` | `./data/guestbook.db`  | SQLite file path               |
| `HOST`         | `0.0.0.0` (Docker)     | Server bind address            |
| `PORT`         | `4321`                 | Server port                    |

`data/` is gitignored and mounted as a volume in production.

## Deployment

A multi-stage [`Dockerfile`](Dockerfile) builds on `oven/bun`, installs
production-only dependencies, and runs the compiled server as the non-root
`bun` user with `/app/data` as a volume.

Deployment is automated in [`.github/workflows/`](.github/workflows/):

- **CI** — typecheck and build on push and pull requests.
- **CD** — on a successful CI run against `main`, builds and pushes the image to
  GHCR, then deploys over SSH: the VPS pulls by digest, restarts the
  `portfolio` systemd user service under Podman, and polls a health endpoint.
  If the service fails to come up, it **automatically rolls back** to the
  previous image digest.

Required repository secrets: `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY`.
