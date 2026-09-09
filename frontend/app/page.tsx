import { getSiteContent } from "@/backend/services/content/get-site-content";
import { HomeExperience } from "@/components/home/HomeExperience";

export default async function HomePage() {
  const content = await getSiteContent();
  return <HomeExperience content={content} />;
}
