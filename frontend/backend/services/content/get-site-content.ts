import { connectDB } from "@/backend/db/connection";
import SiteContent from "@/backend/models/SiteContent";
import { normalizeSiteContent } from "@/backend/services/content/normalize-content";
import { DEFAULT_SITE_CONTENT, SiteContentData } from "@/shared/types/content-types";

export async function getSiteContent(): Promise<SiteContentData> {
  try {
    await connectDB();
    const doc = await SiteContent.findOne({}).sort({ updatedAt: -1 }).lean();
    if (!doc) return DEFAULT_SITE_CONTENT;
    return normalizeSiteContent(doc as Record<string, unknown>);
  } catch (error) {
    console.error("getSiteContent error:", error);
    return DEFAULT_SITE_CONTENT;
  }
}
