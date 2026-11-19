import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/products", "/about", "/lab", "/contact", "/guides/3-ply-vs-5-ply-vs-7-ply", "/privacy", "/terms"].map(path => ({
    url: new URL(path, SITE_URL).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
