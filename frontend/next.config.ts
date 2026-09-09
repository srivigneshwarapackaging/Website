import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  turbopack: {
    root: path.resolve(__dirname, ".."),
    resolveAlias: {
      "@/backend": path.join(__dirname, "../backend"),
      "@/shared": path.join(__dirname, "../shared"),
      mongoose: path.join(__dirname, "node_modules/mongoose"),
      "next-auth": path.join(__dirname, "node_modules/next-auth"),
      zod: path.join(__dirname, "node_modules/zod"),
    },
  },
  webpack: (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      "node_modules",
      ...(config.resolve.modules || []),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/backend": path.join(__dirname, "../backend"),
      "@/shared": path.join(__dirname, "../shared"),
      mongoose: path.join(__dirname, "node_modules/mongoose"),
      "next-auth": path.join(__dirname, "node_modules/next-auth"),
      zod: path.join(__dirname, "node_modules/zod"),
    };
    return config;
  },
};

export default nextConfig;
