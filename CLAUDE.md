# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # http://localhost:3000/portfolio  (NOT localhost:3000 — see basePath)
npm run build      # static export to out/
npm run lint       # eslint .
npm run format     # prettier --write .
npm run predeploy  # fetch screenshots, then build
npm run deploy     # gh-pages -d out
```

There is no test framework in this repo. `next start` is not available — `output: "export"`
means there is no server build to run.

## Static export and the `/portfolio` basePath

`next.config.ts` sets `output: "export"`, `basePath: "/portfolio"`, and `images.unoptimized: true`
(the Image Optimization API cannot run on a static export — do not remove it).

Next applies `basePath` automatically to `next/link` and the router, but **not** to `next/image`
`src`, raw `fetch()`, or `<a href>`. Those must hardcode the prefix:

```tsx
<Link href="/project" />                          // correct — no prefix
<Image src="/portfolio/Profile Picture.jpg" />    // correct — prefix required
handle_download("/portfolio/Resume.pdf", ...)     // correct — prefix required
```

Getting this backwards works in dev and silently 404s in production.

## Styling: MUI `sx` only

All styling goes through MUI v7 `sx` props and the theme in `src/ui/root_client_wrapper.tsx`.
Tailwind is configured (`tailwind.config.js`, PostCSS, `@tailwind` directives in `globals.css`)
but is **vestigial and unused** — there is exactly one `className` in `src/`, and it is a
pass-through prop. Never add Tailwind utility classes to match "existing style"; there is none.

## Naming

- Files are `snake_case`: `project_card.tsx`, `root_client_wrapper.tsx`, `md_reader.tsx`
- Locals, state setters, handlers, and props are `snake_case`: `set_show_contact_form`,
  `handle_download`, `tab_idx`, `experience_list`, `collapsed_item_count`
- Components are `PascalCase`; module-level data constants are `UPPER_SNAKE_CASE` (`PROJECTS`, `WORK`)

Some older camelCase (`setExpanded`, `toggleTheme`) survives. Write new code as `snake_case`.

## Content lives in `src/lib/`

`project.tsx`, `experience.tsx`, `hobby.ts`, `tech_stack.tsx`, and `system_design.tsx` export typed
arrays — this is content-as-code, not a CMS. To add a project or job, edit these files.
`project.tsx` and `experience.tsx` are `.tsx` because their `description` fields are inline JSX.

Long-form markdown (`public/reading/`, `public/blog/`) is fetched **client-side at runtime** by
`src/ui/md_reader.tsx`, so it is neither bundled nor type-checked. `public/blog/` is currently
orphaned — there is no `/blog` route and the navbar tab is commented out.

## Screenshot pipeline — two fragile couplings

`scripts/fetch_screenshots.mjs` pre-generates project card images into `public/screenshots/`
(committed). Two things break silently:

1. **It parses `src/lib/project.tsx` with a regex, not by importing it.** `PROJECT_BLOCK_RE` uses
   `[^{}]` character classes, so **a project object containing any nested `{}` will not match** and
   its screenshot is skipped without error. In practice this means a `description` whose JSX
   contains an expression — including a Prettier-inserted `{" "}` on a wrapped line — silently
   drops that project. It also only reads plain double-quoted strings, so `deployed_url` must not be
   a template literal or concatenation. After editing `project.tsx`, verify all projects still
   extract: `npm run fetch-screenshots` should report one line per project.

2. **The `slug()` function and its filename precedence are duplicated** in
   `scripts/fetch_screenshots.mjs` and `src/ui/card/project_card.tsx`. Change one and the runtime
   `<Image src>` points at a file the generator never wrote. Precedence: `deployed_url` →
   `<title-slug>.png`; else GitHub `source_url` with no `picture_url` → `<owner>-<repo>.png`.

The cache is idempotent — `fetch_one` skips any file that already exists. **To refresh a screenshot,
delete its PNG from `public/screenshots/` first.** Fetch failures are `console.warn` only and never
fail the build.

## Rendering

Every page is a client component. `src/app/layout.tsx` delegates to `root_client_wrapper.tsx`
(`"use client"`), which owns the MUI theme and renders `<></>` until `mounted` — a deliberate
hydration guard for the `localStorage` theme (key `"theme-mode"`, dark by default). Do not
"fix" that empty first render without accounting for hydration mismatch.

## Deployment

GitHub Pages at https://kwanlokto.github.io/portfolio/, published to the `gh-pages` branch from a
developer machine. There is no CI. `.nojekyll` exists only on the `gh-pages` branch — it is not
produced by the build and is not in `public/`. It survives because the `gh-pages` package ignores
dotfiles. Without it GitHub Pages runs Jekyll and 404s every `_next/*` asset.

## Conventions

- Path alias `@/*` → `./src/*`, used throughout (`@/ui/navbar`, `@/lib/project`)
- Commit messages are short, lowercase, imperative, and **not** conventional commits —
  `add deployed url`, `cleaner mobile?`, `revert some small changes`. Match that; no `feat:`/`fix:` prefixes.
- No environment variables. `npm install && npm run dev` is the entire setup.
