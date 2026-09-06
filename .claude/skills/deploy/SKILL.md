---
name: deploy
description: Build and publish the portfolio to GitHub Pages (gh-pages branch). User-triggered only.
disable-model-invocation: true
---

# Deploy to GitHub Pages

Publishes to https://kwanlokto.github.io/portfolio/ from the local machine. There is no CI — this
is the only deploy path.

Arguments: $ARGUMENTS (optional; e.g. `--skip-screenshots` to go straight to build)

## Preflight

1. Confirm the working tree is clean and you are on `main`: `git status --short && git branch --show-current`.
   If there are uncommitted changes, stop and ask whether to commit them first — the deploy
   publishes `out/`, not the branch, so uncommitted work would go live without being in git history.
2. `npm run lint`
3. Note the current live state in case a rollback is needed: `git rev-parse origin/gh-pages`

## Screenshots

Unless `--skip-screenshots` was passed:

```bash
npm run fetch-screenshots
```

- Existing PNGs in `public/screenshots/` are **skipped**, not refreshed. To force a refresh, delete
  the specific PNG first and re-run.
- Failures are `console.warn` only and will not stop the build. Read the output: a `failed` line
  means that card will render a broken image in production.
- Any newly saved PNG must be **committed** — they are tracked files.

## Build and publish

```bash
npm run build     # static export to out/
npm run deploy    # gh-pages -d out
```

`npm run predeploy` runs the fetch and build together if you prefer one command.

## Verify

1. Check `out/` contains `index.html`, `project.html`, `about-me.html`, and `_next/`.
2. After `gh-pages` pushes, load https://kwanlokto.github.io/portfolio/ and hard-refresh.
   Pages can take a minute to propagate.
3. If the page loads unstyled or the console shows 404s on `_next/*`, `.nojekyll` has gone missing
   from the `gh-pages` branch. It is not produced by the build — it persists only because the
   `gh-pages` package ignores dotfiles. Restore it by committing an empty `.nojekyll` to the
   `gh-pages` branch, or permanently by adding an empty `public/.nojekyll` (verified: it is copied
   into `out/` by the export).

## Notes

- `basePath` is `/portfolio`, so asset paths in `next/image`, `fetch()`, and `<a href>` must
  hardcode the `/portfolio/` prefix. These break **only** in production — always click through the
  deployed site, not just dev.
- Never commit `out/` to `main`; it is gitignored.
