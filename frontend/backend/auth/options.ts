import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function getAdminEmails() {
  const configured = (process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  // Keep the two owner accounts available even if an older dev server has
  // not reloaded `.env.local` yet. Additional addresses can still be added
  // through ADMIN_EMAIL as a comma-separated list.
  return Array.from(
    new Set([...configured, "svcartons2015@gmail.com", "cvjayanthkrishna@gmail.com"]),
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/admin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      return Boolean(user.email && getAdminEmails().includes(user.email.trim().toLowerCase()));
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
};
