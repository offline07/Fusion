import type { NextConfig } from "next";

// GitHub project Pages serves the site at /Fusion, not at the domain root.
const githubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Every route is prerendered, so the site ships as static files.
  output: "export",
  // Folder URLs (…/lesson/) match how GitHub Pages serves index.html.
  trailingSlash: true,
  ...(githubPages
    ? { basePath: "/Fusion", assetPrefix: "/Fusion" }
    : {}),
  images: {
    // Static export has no image optimizer; thumbnails are already sized by YouTube.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
