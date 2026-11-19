import type { Metadata } from "next";

// Public SEO URLs must never inherit localhost or an OAuth callback host.
export const SITE_URL = "https://srivigneshwarapackaging.com";
export const SITE_NAME = "Sri Vigneshwara Packaging";

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).href,
    })),
  };
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function dayIndex(token: string) {
  const t = token.trim().toLowerCase().slice(0, 3);
  return DAYS.findIndex((day) => day.toLowerCase().startsWith(t));
}

function to24h(time: string) {
  const m = time.trim().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*([ap])\.?m\.?$/i);
  if (!m) return null;
  let hour = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "p") hour += 12;
  return `${String(hour).padStart(2, "0")}:${m[2] ?? "00"}`;
}

/**
 * Turns CMS office-hour rows such as { label: "Mon – Sat", value: "9:00 AM – 7:00 PM IST" }
 * into schema.org OpeningHoursSpecification. Rows that are not day/time ranges
 * (e.g. "Quote turnaround") are ignored, so the schema only states what the page states.
 */
export function openingHoursJsonLd(rows: Array<{ label: string; value: string }>) {
  const specs: Array<Record<string, unknown>> = [];
  for (const row of rows) {
    const days = row.label.split(/\s*(?:–|—|-|to)\s*/i).map(dayIndex);
    if (days.length < 1 || days.length > 2 || days.some((d) => d < 0)) continue;
    const times = row.value.replace(/\b(IST|hrs?)\b/gi, "").split(/\s*(?:–|—|-|to)\s*/i);
    if (times.length !== 2) continue;
    const [opens, closes] = times.map(to24h);
    if (!opens || !closes) continue;
    const [start, end = start] = days;
    const dayOfWeek: string[] = [];
    for (let i = start; ; i = (i + 1) % 7) {
      dayOfWeek.push(`https://schema.org/${DAYS[i]}`);
      if (i === end) break;
    }
    specs.push({ "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes });
  }
  return specs;
}

/** Accepts "12.9716, 77.5946" or "12.9716° N, 77.5946° E". Returns null when unparseable. */
export function geoJsonLd(coordinates: string | undefined) {
  if (!coordinates) return null;
  const parts = [...coordinates.matchAll(/(-?\d{1,3}(?:\.\d+)?)\s*°?\s*([NSEW])?/gi)];
  if (parts.length !== 2) return null;
  const [lat, lng] = parts.map(([, num, dir]) => (dir && /[SW]/i.test(dir) ? -1 : 1) * Number(num));
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { "@type": "GeoCoordinates", latitude: lat, longitude: lng };
}

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
