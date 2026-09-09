import { getSiteContent } from "@/backend/services/content/get-site-content";
import { AdminAuthErrorExperience } from "@/components/admin/AdminAuthErrorExperience";

export default async function AuthErrorPage() {
  const content = await getSiteContent();

  return <AdminAuthErrorExperience companyName={content.company.name} />;
}
