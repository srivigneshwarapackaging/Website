import { connectDB } from "@/backend/db/connection";
import Inquiry from "@/backend/models/Inquiry";
import { requireAdminSession } from "@/backend/auth/admin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Valid ID is required" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const result = await Inquiry.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete API Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
