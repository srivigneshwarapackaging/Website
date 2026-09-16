import { getSiteContent } from "@/backend/services/content/get-site-content";
import { AboutPage as AboutPageView } from "@/components/about/AboutPage";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const content = await getSiteContent();
  return pageMetadata("About Our Packaging Company", content.about.description.slice(0, 160), "/about");
}

export default async function AboutRoute() {
  const content = await getSiteContent();
  return <AboutPageView content={content} />;
}
