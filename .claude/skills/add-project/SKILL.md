---
name: add-project
description: Add or edit a project entry on the portfolio, keeping the screenshot pipeline in sync. Use whenever adding, removing, or editing a project card.
---

# Adding a project

Project cards are driven entirely by `src/lib/projects.json`. It is plain JSON — no JSX, no
regex parsing, no formatting constraints.

## 1. Add the entry

Append to `src/lib/projects.json`, matching `ProjectType` in `src/lib/project.ts`:

```json
{
  "title": "Project Name",
  "description": "One or two sentences. Lead with what it does, not why you built it.",
  "picture_url": null,
  "tech_stack": ["Next.js", "TypeScript"],
  "deployed_url": "https://example.com/",
  "source_url": "https://github.com/kwanlokto/repo",
  "featured": false
}
```

`title`, `description`, `picture_url`, `tech_stack`, and `source_url` are required
(`picture_url` may be `null`). `deployed_url`, `download_url`, and `featured` are optional.

Notes:

- `picture_url` and `download_url` are site-relative **without** the `/portfolio` prefix —
  `asset()` adds it. Write `/atm.png`, not `/portfolio/atm.png`.
- `featured: true` is what puts a card on the home page. The home page renders
  `FEATURED_PROJECTS`; `/project` renders all of them.
- Descriptions are plain strings. Keep them comparable in length and voice to their neighbours,
  and lead with capability rather than backstory.

## 2. Generate the screenshot

```bash
npm run fetch-screenshots
```

It prints how many projects are defined and how many have a capturable URL, then one
`saved`/`skip`/`failed` line each. Confirm the new project appears.

Filenames come from `src/lib/screenshot_name.mjs`, which **both** the generator and
`src/lib/project.ts` import. Precedence:

| Condition                            | Image used                                    |
| ------------------------------------ | --------------------------------------------- |
| `deployed_url` set                   | `screenshots/<title-slug>.png` (live capture) |
| no `deployed_url`, `picture_url` set | `picture_url` as-is                           |
| neither, GitHub `source_url`         | `screenshots/<owner>-<repo>.png`              |
| none of the above                    | live microlink URL                            |

If you change that logic, change it in `screenshot_name.mjs` only — nowhere else derives it.

## 3. Refreshing an existing screenshot

The cache is idempotent; existing files are skipped. Delete the PNG from `public/screenshots/`
first, then re-run. Failures only `console.warn`, so read the output.

## 4. Finish

```bash
npm run lint && npm run build
```

Then confirm the card resolves to a real file:

```bash
for f in $(grep -o '/portfolio/screenshots/[^"&?]*' out/project.html | sort -u); do
  [ -f "public/${f#/portfolio/}" ] && echo "OK $f" || echo "MISSING $f"
done
```

Commit the JSON change **and** any new PNG in `public/screenshots/` — they are tracked.
Use a short lowercase commit message.
