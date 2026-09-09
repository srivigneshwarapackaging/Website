import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db/connection";
import Analytics from "@/backend/models/Analytics";
import { requireAdminSession } from "@/backend/auth/admin";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();

    const deletedMissing = await Analytics.deleteMany({
      $or: [
        { category: { $exists: false } },
        { metricName: { $exists: false } },
        { metricName: "undefined" },
        { metricName: null },
      ],
    });

    const deletedInvalidHeat = await Analytics.deleteMany({
      category: "heatmap",
      $or: [{ value: "NaN" }, { value: "0" }, { value: "" }],
    });

    const fixedTimestamps = await Analytics.updateMany(
      { timestamp: { $exists: false } },
      { $set: { timestamp: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: "Database sanitized successfully",
      details: {
        removedIncomplete: deletedMissing.deletedCount,
        removedInvalidHeat: deletedInvalidHeat.deletedCount,
        patchedTimestamps: fixedTimestamps.modifiedCount,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
