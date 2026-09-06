---
name: add-project
description: Add or edit a project entry in src/lib/project.tsx without breaking the screenshot pipeline. Use whenever adding, removing, or editing a project card on the portfolio.
---

# Adding a project

Project cards are driven entirely by the `PROJECTS` array in `src/lib/project.tsx`. A build-time
script parses that file **with a regex**, so the shape of what you write matters as much as its
content.

## 1. Add the entry

Append to `PROJECTS` in `src/lib/project.tsx`, matching `ProjectType`:

```tsx
{
  title: "Project Name",
  description: (
    <>
      One or two sentences, plain prose.
    </>
  ),
  picture_url: null,
  TECH_STACK: ["Next.js", "TypeScript"],
  deployed_url: "https://example.com/",
  source_url: "https://github.com/kwanlokto/repo",
  featured: false,
}
```

`deployed_url`, `download_url`, `picture_url`, and `featured` are optional; `title`, `description`,
`TECH_STACK`, and `source_url` are required (`picture_url` is required by the type but may be `null`).

## 2. Respect the regex constraints

`scripts/fetch_screenshots.mjs` matches project objects with:

```js
const PROJECT_BLOCK_RE = /\{[^{}]*?source_url:\s*"[^"]+"[^{}]*?\}/gs;
```

The `[^{}]` classes mean the object must contain **no nested braces**. Therefore:

- The `description` JSX must contain **no `{...}` expression** — no interpolation, and no
  Prettier-inserted `{" "}`. Keep description lines short enough that Prettier does not wrap in a
  way that injects `{" "}`. If it does, rewrap the prose by hand.
- `deployed_url`, `source_url`, `picture_url`, and `title` must be **plain double-quoted string
  literals** — not template literals, not concatenations. A long URL may sit on its own line.

A violating entry does not error. It is silently skipped and the card renders a missing image.

## 3. Verify extraction

```bash
npm run fetch-screenshots
```

It prints one `saved`/`skip` line per capturable project. Confirm the new project appears. If it is
absent, the regex did not match it — recheck step 2.

## 4. Keep filename derivation in sync

`slug()` and the filename precedence are **duplicated** in `scripts/fetch_screenshots.mjs` and
`src/ui/card/project_card.tsx`. If you touch either, update both. Precedence:

| Condition                                                | Screenshot file                         |
| -------------------------------------------------------- | --------------------------------------- |
| `deployed_url` set                                       | `<slug(title)>.png`                     |
| no `deployed_url`, `picture_url` set                     | `picture_url` used directly (card only) |
| no `deployed_url`, no `picture_url`, GitHub `source_url` | `<owner>-<repo>.png`                    |
| none of the above                                        | live microlink URL (card only)          |

## 5. Refreshing an existing screenshot

The cache is idempotent — existing files are skipped. Delete the PNG from `public/screenshots/`
first, then re-run `npm run fetch-screenshots`.

## 6. Finish

Run `npm run lint` and `npm run build`. Commit the `project.tsx` change **and** any new PNG in
`public/screenshots/` (they are committed, not gitignored). Use a short lowercase commit message.
