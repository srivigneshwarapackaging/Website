import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, getAdminEmail } from "@/backend/auth/options";

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || session.user.email !== getAdminEmail()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
