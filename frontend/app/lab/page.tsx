import { getSiteContent } from "@/backend/services/content/get-site-content";
import { LabPage } from "@/components/lab/LabPage";

export const metadata = {
  title: "The Lab",
  description:
    "Work out the corrugated box you need — ply construction, flute profile and a live specification you can send us.",
};

export default async function LabRoute() {
  const content = await getSiteContent();
  return <LabPage content={content} />;
}
