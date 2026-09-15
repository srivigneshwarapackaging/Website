import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run without fighting a dev server over `.next`:
  //   NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
