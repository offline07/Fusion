import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is prerendered, so the site ships as static files to Cloudflare Workers.
  output: "export",
  images: {
    // Static export has no image optimizer; thumbnails are already sized by YouTube.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
