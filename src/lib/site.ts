// Mirrors `basePath` / `assetPrefix` in next.config.ts.
//
// Next applies basePath automatically to next/link and the router, but NOT to
// next/image `src`, raw fetch(), or <a href>. Those go through asset() so the
// prefix lives in exactly one place.
export const BASE_PATH = "/portfolio";

export const asset = (path: string): string =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_URL = "https://kwanlokto.github.io/portfolio/";
