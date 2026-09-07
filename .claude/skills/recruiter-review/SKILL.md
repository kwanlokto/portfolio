---
name: recruiter-review
description: Review this portfolio the way a recruiter or hiring manager would for a specific role, and report ranked findings. Use before a job application push, after changing site copy or the resume, or when asked how the site "lands" on a reviewer.
---

# Recruiter review

Audit the site as a hiring reviewer screening for the role in `$ARGUMENTS` (e.g.
`senior software engineer`, `staff backend engineer`, `founding engineer`). If `$ARGUMENTS`
is empty, ask which role and seniority before starting — the verdict is meaningless without it.

You are not reviewing code quality. You are answering one question: **would this reviewer
advance this candidate, flag them, or pass?** Work through the steps in order.

## 1. Rebuild before reading anything

```bash
npm run build
```

**Never trust an existing `out/`.** Compare its mtime against the newest file under `src/`:

```bash
find src -type f -newer out/index.html 2>/dev/null | head
```

If anything lists, `out/` is stale and describes a site that no longer exists. This is not
hypothetical — a previous review nearly shipped findings about a job that had been removed from
the source 13 seconds after the last build. Rebuild, then read.

Also note: `out/` is gitignored and deployment is manual (`npm run predeploy && npm run deploy`),
so **the live site may be older than both.** If the findings depend on something recently changed,
say explicitly that the live site may not reflect it yet.

## 2. Read what a visitor sees, not what the source says

Strip tags from each page in `out/` and read the prose in order:

```bash
python3 -c "
import re, sys, html
h = open(sys.argv[1], encoding='utf8').read()
b = re.search(r'<body[^>]*>(.*)</body>', h, re.S).group(1)
b = re.sub(r'<(script|style).*?</\1>', ' ', b, flags=re.S)
b = re.sub(r'<[^>]+>', '\n', b)
print('\n'.join(l for l in (html.unescape(x).strip() for x in b.split('\n')) if l))
" out/index.html
```

Do this for `index`, `project`, `about-me`, and `404`. Source shows intent; the build shows
reality. Flag anything behind a **"Show more"**, a tab, or a modal — a reviewer skimming for
60 seconds will not click it, so treat it as effectively invisible.

## 3. Cross-check the site against the resume

```bash
pdftotext -layout public/Resume.pdf -
```

Build an explicit divergence table covering: **job titles, date ranges, number of roles per
employer, which employers appear at all, project names, every metric, education wording, and
contact details.**

This is the highest-yield step. A reviewer who finds the site and the resume telling different
stories stops evaluating and starts verifying, and that usually ends the application. Report
every divergence, even small ones — inconsistency compounds.

## 4. The 60-second test

From the **landing page only**, list everything a reviewer can click and have _running_ in one
action. Be strict:

- A store listing is not a running app.
- A `.exe` or `.apk` download is not a running app — nobody runs an unsigned binary from a stranger.
- A GitHub repo is not a running app.

If the count is zero, that is a top-three finding regardless of how good the code is. Check the
button labels actually describe what happens (`deployed_label` in `src/lib/projects.json` exists
for exactly this).

## 5. Measure the first impression

```bash
du -sh out
find out -type f -size +500k -printf '%s\t%p\n' | sort -rn | head
```

Then check the LCP image's real bytes against its rendered size — `next.config.ts` sets
`output: "export"`, which forces `images.unoptimized`, so **whatever is in `public/` is what
ships, at full resolution.**

Verify `og:image` actually resolves rather than trusting the markup:

```bash
grep -o 'og:image" content="[^"]*"' out/index.html
```

`metadataBase` already ends in `/portfolio/`, so a path that also carries the base path produces
`/portfolio/portfolio/...` and 404s. Resolve the emitted URL against `out/` and confirm the file
is really there.

On a portfolio, craft failures are not cosmetic — a multi-megabyte avatar on a page that argues
for "maintainable systems" reads as a contradiction of the candidate's own pitch.

## 6. Look for inspectable depth

Senior and above gets asked "show me how they think." Check whether any claim can be clicked
into: writing, an architecture note, a case study, a design doc. Then check whether it is
reachable **by URL and crawlable**, or buried behind modals and runtime `fetch` (invisible to
search engines and to skimming reviewers alike).

Numbers with nothing behind them — `±1 μm precision`, `40% traffic growth` — read as assertions,
not evidence.

## 7. Report

Rank by **what makes a reviewer pass**, not by technical severity. A title inconsistency outranks
a rendering bug. Give at most 5 findings unless asked for more.

For each: state the problem in the reviewer's voice, then cite evidence — a `file:line`, a
measured number, or a verbatim quote. No finding without evidence.

Close with:

- **Verdict** — advance, flag, or pass, stated against the role from `$ARGUMENTS`.
- **Highest-leverage single change.**

## Calibration

The same site can be strong for one req and disqualifying for another. A CTO framing reads as
overqualified for a senior IC role and as a perfect fit for a founding engineer role. Always name
which req the verdict is against, and if the site would land very differently for an adjacent
role, say so in one line.

Be direct. A review that softens the findings is worthless — the actual recruiter will not soften
them, they will simply not reply.
