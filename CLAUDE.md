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

Use `asset()` from `src/lib/site.ts` rather than writing the prefix by hand:

```tsx
<Link href="/project" />                  // correct — next/link is prefixed for you
<Image src={asset("/Profile Picture.jpg")} />   // correct — asset() adds /portfolio
<Button href={asset("/")} />              // correct — a raw href is NOT prefixed
```

Getting this backwards works in dev and silently 404s in production. MUI's `href` prop renders a
raw `<a>`, so it always needs `asset()`.

## Styling: MUI `sx` only

All styling goes through MUI v7 `sx` props and the theme in `src/ui/root_client_wrapper.tsx`.
There is **no CSS framework** — Tailwind was removed once it was confirmed unused, and there is
no PostCSS config, so Next uses its own defaults. Do not reintroduce a utility framework; there
are zero `className` usages in `src/` and the codebase should stay that way.

The only global CSS is `src/app/globals.css`, which holds keyframes and two narrow overrides.
MUI's `CssBaseline` is the only reset. It does **not** zero the margins that Tailwind's Preflight
used to, so any raw HTML element rendered outside a MUI component (chiefly the markdown map in
`src/ui/markdown/components.tsx`) must set its own margins — see the `blockquote` entry, which
pins `mx: 0` against the browser's default 40px.

## Naming

- Files are `snake_case`: `project_card.tsx`, `root_client_wrapper.tsx`, `hobby_gallery_modal.tsx`
- Locals, state setters, handlers, and props are `snake_case`: `set_show_contact_form`,
  `handle_download`, `tab_idx`, `experience_list`, `collapsed_item_count`
- Components are `PascalCase`; module-level data constants are `UPPER_SNAKE_CASE` (`PROJECTS`, `WORK`)

Some older camelCase (`setExpanded`, `toggleTheme`) survives. Write new code as `snake_case`.

## Content lives in `src/lib/`

`projects.json`, `experience.ts`, `hobby.ts`, and `tech_stack.ts` hold the site's content as plain
typed data — no JSX. To add a project or job, edit these files.

`src/lib/` must not import from `src/ui/`. Emphasis in copy is written as `**bold**` and rendered by
`src/ui/rich_text.tsx`; icons are stored as component references (`icon: FaPython`), with the size
applied at the render site.

Long-form markdown (`public/reading/`) is fetched **client-side at runtime** by
`src/ui/markdown/reader.tsx`, so it is neither bundled nor type-checked.

## Screenshot pipeline

`scripts/fetch_screenshots.mjs` pre-generates project card images into `public/screenshots/`
(committed). It reads `src/lib/projects.json` directly and derives filenames from
`src/lib/screenshot_name.mjs` — the same module `src/lib/project.ts` uses to build the `<Image src>`,
so the generator and the runtime cannot disagree. **Change filename logic in that one module only.**

Precedence: `deployed_url` → `<title-slug>.png`; else `picture_url` used as-is; else GitHub
`source_url` → `<owner>-<repo>.png`; else a live microlink URL.

The cache is idempotent — existing files are skipped. **To refresh a screenshot, delete its PNG from
`public/screenshots/` first.** Fetch failures are `console.warn` only and never fail the build, so
read the output after adding a project.

## Rendering

`src/app/layout.tsx` delegates to `root_client_wrapper.tsx` (`"use client"`), which owns the MUI
theme. Theme mode comes from `src/lib/theme_mode.ts` via `useSyncExternalStore`, whose server
snapshot is always `"dark"` — that is what lets the static export contain real HTML while still
honouring the stored preference after hydration.

**Never gate the tree behind a `mounted` flag.** An earlier version returned `<></>` until mount,
which shipped an empty `<body>` in the export. If you touch the theme, rebuild and check:

```bash
python3 -c "import re;h=open('out/index.html').read();b=re.search(r'<body[^>]*>(.*)</body>',h,re.S).group(1);print(len(re.sub(r'<script.*?</script>','',b,flags=re.S).strip()))"
```

That should print six figures, not double digits.

`src/app/project/page.tsx` is a server component. Keep it that way — don't pass function props to
`ItemGrid`, and don't put JSX back into `src/lib/`.

## Deployment

GitHub Pages at https://kwanlokto.github.io/portfolio/, published to the `gh-pages` branch from a
developer machine. There is no CI. `.nojekyll` exists only on the `gh-pages` branch — it is not
produced by the build and is not in `public/`. It survives because the `gh-pages` package ignores
dotfiles. Without it GitHub Pages runs Jekyll and 404s every `_next/*` asset.

## Git

**Do not commit or push unless explicitly asked.** Leave finished work staged or in the working
tree and say what changed; the author commits from GitKraken and wants to review diffs first.
This is easy to get wrong when finishing a multi-phase task — completing a phase is not a
request to commit it.

Never use `git add -A`/`git add .` — the author edits in an IDE and GitKraken stages files
during a session, so a blanket add sweeps unrelated changes into a commit whose message does not
describe them. Stage the specific paths you changed.

## Conventions

- Path alias `@/*` → `./src/*`, used throughout (`@/ui/navbar`, `@/lib/project`)
- Prettier is enforced by a `PostToolUse` hook; run `npm run format` if it drifts
- Commit messages are short, lowercase, imperative, and **not** conventional commits —
  `add deployed url`, `cleaner mobile?`, `revert some small changes`. Match that; no `feat:`/`fix:` prefixes.
- No environment variables. `npm install && npm run dev` is the entire setup.
