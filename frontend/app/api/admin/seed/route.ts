import { connectDB } from "@/backend/db/connection";
import SiteContent from "@/backend/models/SiteContent";
import { requireAdminSession } from "@/backend/auth/admin";
import { DEFAULT_SITE_CONTENT } from "@/shared/types/content-types";
import { siteContentSchema } from "@/shared/validation/site-content";
import { NextResponse } from "next/server";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const parsed = siteContentSchema.safeParse(DEFAULT_SITE_CONTENT);
    const payload = parsed.success ? parsed.data : DEFAULT_SITE_CONTENT;
    await SiteContent.findOneAndUpdate({}, payload, {
      upsert: true,
      new: true,
    });
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
  }
}
