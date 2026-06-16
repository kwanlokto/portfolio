// Pre-generates project screenshots at build time so the project cards render
// instantly from /public instead of waiting on a remote screenshot service.
//
// Per project, the highest-priority capturable URL wins:
//   1. deployed_url → live screenshot via microlink (saved as <title-slug>.png)
//   2. github source_url with no picture_url → GitHub OG card (<owner>-<repo>.png)
//   3. otherwise skip; runtime falls back to picture_url
//
// Idempotent: existing files are kept. Delete the screenshots dir to refresh.

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_FILE = path.join(__dirname, "..", "src", "lib", "project.tsx");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "screenshots");

const PROJECT_BLOCK_RE = /\{[^{}]*?source_url:\s*"[^"]+"[^{}]*?\}/gs;

const string_field = (block, name) => {
  const m = block.match(new RegExp(`${name}:\\s*"([^"]+)"`));
  return m ? m[1] : null;
};

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function get_targets() {
  const source = await readFile(PROJECT_FILE, "utf8");
  const targets = [];
  for (const match of source.matchAll(PROJECT_BLOCK_RE)) {
    const block = match[0];
    const title = string_field(block, "title");
    const source_url = string_field(block, "source_url");
    const deployed_url = string_field(block, "deployed_url");
    const picture_url = string_field(block, "picture_url");
    if (!title) continue;

    if (deployed_url) {
      targets.push({
        kind: "deployed",
        filename: `${slug(title)}.png`,
        url: deployed_url,
      });
      continue;
    }
    if (!picture_url && source_url) {
      try {
        const url = new URL(source_url);
        if (url.hostname === "github.com") {
          const [owner, repo] = url.pathname.split("/").filter(Boolean);
          if (owner && repo) {
            targets.push({
              kind: "github_og",
              filename: `${owner}-${repo}.png`,
              url: `https://opengraph.githubassets.com/1/${owner}/${repo}`,
            });
          }
        }
      } catch {
        // ignore unparseable URLs
      }
    }
  }
  return targets;
}

async function fetch_deployed_screenshot(deployed_url) {
  const api =
    `https://api.microlink.io/?url=${encodeURIComponent(deployed_url)}` +
    `&screenshot=true&meta=false&viewport.width=800&viewport.height=500` +
    `&colorScheme=dark&waitUntil=networkidle0&waitFor=1500`;
  const res = await fetch(api);
  if (!res.ok) {
    throw new Error(`microlink failed for ${deployed_url}: ${res.status}`);
  }
  const json = await res.json();
  const img_url = json?.data?.screenshot?.url;
  if (!img_url) {
    throw new Error(`microlink returned no screenshot URL for ${deployed_url}`);
  }
  const img_res = await fetch(img_url);
  if (!img_res.ok) {
    throw new Error(`fetching screenshot at ${img_url}: ${img_res.status}`);
  }
  return Buffer.from(await img_res.arrayBuffer());
}

async function fetch_one(target) {
  const out_path = path.join(OUTPUT_DIR, target.filename);
  if (existsSync(out_path)) {
    console.log(`skip   ${target.filename} (already exists)`);
    return;
  }
  try {
    const buf =
      target.kind === "deployed"
        ? await fetch_deployed_screenshot(target.url)
        : await (async () => {
            const res = await fetch(target.url);
            if (!res.ok) {
              throw new Error(`fetching ${target.url}: ${res.status}`);
            }
            return Buffer.from(await res.arrayBuffer());
          })();
    await writeFile(out_path, buf);
    console.log(`saved  ${target.filename} (${buf.length} bytes)`);
  } catch (err) {
    console.warn(`failed ${target.filename}: ${err.message}`);
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const targets = await get_targets();
  if (targets.length === 0) {
    console.log("Nothing to fetch.");
    return;
  }
  console.log(`Fetching ${targets.length} screenshot(s)...`);
  for (const target of targets) {
    await fetch_one(target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
