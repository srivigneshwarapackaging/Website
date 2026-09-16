import { getSiteContent } from "@/backend/services/content/get-site-content";
import { LabPage } from "@/components/lab/LabPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Corrugated Box Configuration Lab", "Explore ply construction and flute profiles, configure your corrugated box dimensions, and send your packaging specification to our team.", "/lab");

export default async function LabRoute() {
  const content = await getSiteContent();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Box configuration lab", path: "/lab" },
        ])}
      />
      <LabPage content={content} />
    </>
  );
}
