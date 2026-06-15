// Downloads GitHub OpenGraph card images for projects that don't ship
// their own picture_url, so the cards render instantly from /public instead
// of waiting on a remote screenshot service. Idempotent: skips files that
// already exist (delete the screenshots dir to force a refresh).

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_FILE = path.join(__dirname, "..", "src", "lib", "project.tsx");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "screenshots");

const PROJECT_BLOCK_RE = /\{[^{}]*?source_url:\s*"([^"]+)"[^{}]*?\}/gs;
const PICTURE_NULL_RE = /picture_url:\s*null/;

async function get_targets() {
  const source = await readFile(PROJECT_FILE, "utf8");
  const targets = new Set();
  for (const match of source.matchAll(PROJECT_BLOCK_RE)) {
    const [block, source_url] = match;
    if (!PICTURE_NULL_RE.test(block)) continue;

    let url;
    try {
      url = new URL(source_url);
    } catch {
      continue;
    }
    if (url.hostname !== "github.com") continue;

    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (owner && repo) targets.add(`${owner}/${repo}`);
  }
  return [...targets];
}

async function fetch_one(slug) {
  const filename = `${slug.replace("/", "-")}.png`;
  const out_path = path.join(OUTPUT_DIR, filename);
  if (existsSync(out_path)) {
    console.log(`skip  ${filename} (already exists)`);
    return;
  }

  const og_url = `https://opengraph.githubassets.com/1/${slug}`;
  const res = await fetch(og_url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${og_url}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(out_path, buf);
  console.log(`saved ${filename} (${buf.length} bytes)`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const targets = await get_targets();
  if (targets.length === 0) {
    console.log("No GitHub projects without picture_url. Nothing to fetch.");
    return;
  }
  console.log(`Fetching ${targets.length} screenshot(s)...`);
  for (const slug of targets) {
    await fetch_one(slug);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
