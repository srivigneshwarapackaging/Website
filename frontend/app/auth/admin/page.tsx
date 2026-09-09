import { getSiteContent } from "@/backend/services/content/get-site-content";
import { AdminLoginExperience } from "@/components/admin/AdminLoginExperience";

export default async function AdminLoginPage() {
  const content = await getSiteContent();

  return <AdminLoginExperience companyName={content.company.name} />;
}
