// Single source of truth for project screenshot filenames.
//
// Imported by BOTH src/lib/project.ts (to build the <Image src>) and
// scripts/fetch_screenshots.mjs (to write the file). Plain JS so Node can run
// it directly without a TypeScript step.

/**
 * @param {string} value
 * @returns {string}
 */
export const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Filename the generator writes for a project, or null when it captures nothing.
 *
 * Precedence:
 *   1. deployed_url            -> <title-slug>.png   (live screenshot)
 *   2. picture_url             -> null               (card uses the static image)
 *   3. github source_url       -> <owner>-<repo>.png (GitHub OG card)
 *   4. otherwise               -> null               (card falls back to microlink)
 *
 * @param {{title: string, picture_url?: string|null, deployed_url?: string, source_url: string}} project
 * @returns {string|null}
 */
export const screenshot_filename = (project) => {
  if (project.deployed_url) return `${slug(project.title)}.png`;
  if (project.picture_url) return null;
  try {
    const url = new URL(project.source_url);
    if (url.hostname === "github.com") {
      const [owner, repo] = url.pathname.split("/").filter(Boolean);
      if (owner && repo) return `${owner}-${repo}.png`;
    }
  } catch {
    // Unparseable source_url — nothing to capture.
  }
  return null;
};

/** URL the generator captures for a project, or null when there is nothing to capture. */
export const screenshot_source_url = (project) => {
  if (project.deployed_url) return project.deployed_url;
  if (project.picture_url) return null;
  return screenshot_filename(project) ? project.source_url : null;
};
