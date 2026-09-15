import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, getAdminEmails } from "@/backend/auth/options";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !getAdminEmails().includes(session.user.email.trim().toLowerCase())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
