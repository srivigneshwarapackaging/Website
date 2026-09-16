import { getSiteContent } from "@/backend/services/content/get-site-content";
import { HomeExperience } from "@/components/home/HomeExperience";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { seo } = await getSiteContent();
  const metadata = pageMetadata(seo.title, seo.description, "/");
  // CMS editors control the homepage title, description and optional share image.
  metadata.title = { absolute: seo.title };
  if (seo.ogImage && /^(\/[^/]|https:\/\/)/.test(seo.ogImage)) {
    metadata.openGraph = { ...metadata.openGraph, images: [{ url: seo.ogImage, alt: seo.title }] };
    metadata.twitter = { ...metadata.twitter, images: [seo.ogImage] };
  }
  return metadata;
}

export default async function HomePage() {
  const content = await getSiteContent();
  return <HomeExperience content={content} />;
}
