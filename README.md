# Portfolio

My personal portfolio — projects, experience, and a few things I do outside of work.

**Live: https://kwanlokto.github.io/portfolio/**

Built with Next.js (App Router) and MUI, statically exported to GitHub Pages.

## Getting started

```bash
git clone git@github.com:kwanlokto/portfolio.git
cd portfolio
npm install
npm run dev
```

Open **http://localhost:3000/portfolio** — note the `/portfolio` path. `next.config.ts`
sets `basePath`, so plain `localhost:3000` returns a 404.

No environment variables or secrets are required.

## Commands

| Command                     | What it does                              |
| --------------------------- | ----------------------------------------- |
| `npm run dev`               | Dev server at `localhost:3000/portfolio`  |
| `npm run build`             | Static export to `out/`                   |
| `npm run lint`              | ESLint                                    |
| `npm run format`            | Prettier over the repo                    |
| `npm run fetch-screenshots` | Generate missing project card screenshots |
| `npm run predeploy`         | Fetch screenshots, then build             |
| `npm run deploy`            | Publish `out/` to the `gh-pages` branch   |

There is no test suite, and `next start` is unavailable — `output: "export"` means
there is no server build to run.

## How content works

Site content is typed data, not a CMS. To change what the site says, edit:

- `src/lib/projects.json` — project cards
- `src/lib/experience.ts` — work history and education
- `src/lib/hobby.ts` — hobby cards and their galleries
- `src/lib/tech_stack.ts` — the tech stack grid

Achievement and description strings support `**bold**`, rendered by `src/ui/rich_text.tsx`.

Long-form writing (book reviews) lives as markdown under `public/reading/` and is
fetched at runtime by `src/ui/markdown/reader.tsx`.

## Project screenshots

`scripts/fetch_screenshots.mjs` pre-generates project card images into
`public/screenshots/` (committed) so cards render instantly instead of waiting on a
remote service.

It is **idempotent** — existing files are skipped. To refresh one, delete its PNG and
re-run `npm run fetch-screenshots`. Failures only warn; they never fail the build, so
read the output when adding a project.

Filenames are derived by `src/lib/screenshot_name.mjs`, which both the generator and
the runtime card import — so they cannot disagree.

## Structure

```
public/            Static assets, served under /portfolio/
scripts/           Build-time screenshot generator
src/
├── app/           App Router routes: /, /project, /about-me
├── lib/           Site content as typed data, plus shared constants
├── ui/            Presentational components
└── utils/         Browser helpers
```

## Deployment

GitHub Pages, from a developer machine — there is no CI:

```bash
npm run predeploy
npm run deploy
```

`.nojekyll` must exist on the `gh-pages` branch. It is not produced by the build; it
survives because the `gh-pages` package skips dotfiles. Without it, GitHub Pages runs
Jekyll and 404s every `_next/*` asset.

## License

[MIT](LICENSE).
