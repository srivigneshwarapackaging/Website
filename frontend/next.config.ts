import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: {
      "@/backend": path.join(__dirname, "../backend"),
      "@/shared": path.join(__dirname, "../shared"),
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/backend": path.join(__dirname, "../backend"),
      "@/shared": path.join(__dirname, "../shared"),
    };
    return config;
  },
};

export default nextConfig;
