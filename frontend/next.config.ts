import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a production build run without fighting a dev server over `.next`:
  //   NEXT_DIST_DIR=.next-build npm run build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.srivigneshwarapackaging.com" }],
        destination: "https://srivigneshwarapackaging.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "srivigneshwarapackaging.com" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://srivigneshwarapackaging.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
