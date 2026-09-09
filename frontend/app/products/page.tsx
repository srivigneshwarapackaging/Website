import { getSiteContent } from "@/backend/services/content/get-site-content";
import { ProductCataloguePage } from "@/components/products/ProductCataloguePage";

export const metadata = {
  title: "Products",
  description: "Full corrugated product catalogue and specifications.",
};

export default async function ProductsPage() {
  const content = await getSiteContent();

  return <ProductCataloguePage content={content} />;
}
