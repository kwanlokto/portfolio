import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    unoptimized: true, // Fixes image optimization issue for static export
  },
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
};

export default nextConfig;
