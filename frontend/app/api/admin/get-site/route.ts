import { connectDB } from "@/backend/db/connection";
import SiteContent from "@/backend/models/SiteContent";
import { normalizeSiteContent } from "@/backend/services/content/normalize-content";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const content = await SiteContent.findOne({}).sort({ updatedAt: -1 }).lean();
    if (!content) return NextResponse.json(normalizeSiteContent(null));
    return NextResponse.json(normalizeSiteContent(content as Record<string, unknown>));
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Content could not be loaded. Please retry before editing." }, { status: 503 });
  }
}
