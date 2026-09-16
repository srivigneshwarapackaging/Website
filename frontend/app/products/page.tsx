import { getSiteContent } from "@/backend/services/content/get-site-content";
import { ProductCataloguePage } from "@/components/products/ProductCataloguePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Corrugated Boxes & Custom Packaging", "Compare 3, 5 and 7-ply corrugated boxes and custom die-cut packaging. Explore flute profiles, applications and specifications for your business.", "/products");

export default async function ProductsPage() {
  const content = await getSiteContent();

  return <ProductCataloguePage content={content} />;
}
