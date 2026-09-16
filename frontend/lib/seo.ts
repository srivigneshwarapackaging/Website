import type { Metadata } from "next";

// Public SEO URLs must never inherit localhost or an OAuth callback host.
export const SITE_URL = "https://srivigneshwarapackaging.com";
export const SITE_NAME = "Sri Vigneshwara Packaging";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, SITE_URL).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, siteName: SITE_NAME, locale: "en_IN", type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: `${SITE_NAME} — corrugated packaging in Bengaluru` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/opengraph-image`] },
  };
}
