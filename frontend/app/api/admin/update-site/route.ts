import { connectDB } from "@/backend/db/connection";
import SiteContent from "@/backend/models/SiteContent";
import { requireAdminSession } from "@/backend/auth/admin";
import { normalizeSiteContent } from "@/backend/services/content/normalize-content";
import { siteContentSchema } from "@/shared/validation/site-content";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const body = await req.json();
    const parsed = siteContentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const normalized = normalizeSiteContent(parsed.data as Record<string, unknown>);

    const updatedContent = await SiteContent.findOneAndUpdate(
      {},
      { $set: normalized },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updatedContent });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
