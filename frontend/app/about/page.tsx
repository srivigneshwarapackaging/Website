import { getSiteContent } from "@/backend/services/content/get-site-content";
import { AboutPage as AboutPageView } from "@/components/about/AboutPage";

export async function generateMetadata() {
  const content = await getSiteContent();
  return {
    title: "About",
    description: content.about.description.slice(0, 160),
  };
}

export default async function AboutRoute() {
  const content = await getSiteContent();
  return <AboutPageView content={content} />;
}
