import { NextResponse } from "next/server";
import { connectDB } from "@/backend/db/connection";
import Analytics from "@/backend/models/Analytics";
import { requireAdminSession } from "@/backend/auth/admin";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const data = await Analytics.find({}).sort({ timestamp: -1 });

    let csvContent = "Date,Category,Metric Name,Value/Views\n";

    data.forEach((item) => {
      const date = item.timestamp
        ? new Date(item.timestamp).toLocaleDateString()
        : "N/A";
      const category = item.category || "N/A";
      const name = item.metricName || "N/A";
      const val = item.value || item.views || 0;
      csvContent += `${date},${category},${name},${val}\n`;
    });

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=analytics_report.csv",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
