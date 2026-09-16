import { getSiteContent } from "@/backend/services/content/get-site-content";
import { AboutPage as AboutPageView } from "@/components/about/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const content = await getSiteContent();
  return pageMetadata("About Our Packaging Company", content.about.description.slice(0, 160), "/about");
}

export default async function AboutRoute() {
  const content = await getSiteContent();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutPageView content={content} />
    </>
  );
}
