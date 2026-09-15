import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getAdminEmails } from "@/backend/auth/options";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => Boolean(token?.email && getAdminEmails().includes(String(token.email).trim().toLowerCase())),
    },
    pages: {
      signIn: "/auth/admin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
