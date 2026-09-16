import { getSiteContent } from "@/backend/services/content/get-site-content";
import { ProductCataloguePage } from "@/components/products/ProductCataloguePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Corrugated Boxes, Trays & Custom Packaging",
  "Explore custom corrugated boxes, trays, 3-ply ice cream cartons and 5-ply heavy-duty packaging manufactured in Bengaluru.",
  "/products"
);

export default async function ProductsPage() {
  const content = await getSiteContent();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <ProductCataloguePage content={content} />
    </>
  );
}
