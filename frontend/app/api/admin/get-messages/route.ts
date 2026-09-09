import { connectDB } from "@/backend/db/connection";
import Inquiry from "@/backend/models/Inquiry";
import { requireAdminSession } from "@/backend/auth/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;

  try {
    await connectDB();
    const messages = await Inquiry.find({}).sort({ date: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json([]);
  }
}
