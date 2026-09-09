import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "preethamcv.2006@gmail.com";
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
      return user.email === getAdminEmail();
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
