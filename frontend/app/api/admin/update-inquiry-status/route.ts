import { connectDB } from "@/backend/db/connection";
import Inquiry from "@/backend/models/Inquiry";
import { requireAdminSession } from "@/backend/auth/admin";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    if (status !== "new" && status !== "resolved") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update inquiry status error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
