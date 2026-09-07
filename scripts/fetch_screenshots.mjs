// Pre-generates project screenshots at build time so the project cards render
// instantly from /public instead of waiting on a remote screenshot service.
//
// Reads src/lib/projects.json directly and derives filenames with the same
// module the app uses (src/lib/screenshot_name.mjs), so the generator and the
// runtime <Image src> can never disagree.
//
// Idempotent: existing files are kept. Delete a PNG to refresh it.

import {
  screenshot_filename,
  screenshot_source_url,
} from "../src/lib/screenshot_name.mjs";

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_FILE = path.join(__dirname, "..", "src", "lib", "projects.json");
const OUTPUT_DIR = path.join(__dirname, "..", "public", "screenshots");

async function get_targets() {
  const projects = JSON.parse(await readFile(PROJECT_FILE, "utf8"));
  const targets = [];
  for (const project of projects) {
    const filename = screenshot_filename(project);
    const url = screenshot_source_url(project);
    if (filename && url) targets.push({ filename, url, title: project.title });
  }
  return { targets, total: projects.length };
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
    const buf = await fetch_deployed_screenshot(target.url);
    await writeFile(out_path, buf);
    console.log(`saved  ${target.filename} (${buf.length} bytes)`);
  } catch (err) {
    console.warn(`failed ${target.filename}: ${err.message}`);
  }
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const { targets, total } = await get_targets();
  console.log(
    `${total} project(s) defined; ${targets.length} with a capturable URL.`,
  );
  for (const target of targets) {
    await fetch_one(target);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
