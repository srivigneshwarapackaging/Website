import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getAdminEmail } from "@/backend/auth/options";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email === getAdminEmail(),
    },
    pages: {
      signIn: "/auth/admin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
