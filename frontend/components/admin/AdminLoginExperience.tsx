"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Magnetic } from "@/components/motion/MagneticButton";
import { AdminAuthShell, AdminAuthHeader } from "./AdminAuthShell";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AdminLoginExperience({ companyName }: { companyName: string }) {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/admin/dashboard" });
    setLoading(false);
  };

  const isBusy = loading || status === "loading";

  return (
    <AdminAuthShell companyName={companyName}>
      <AdminAuthHeader
        eyebrow="Sign in"
        title="Command center"
        description="Use your authorized Google account to access the dashboard, CMS, and analytics."
      />

      <Magnetic className="w-full">
        <motion.button
          type="button"
          onClick={handleLogin}
          disabled={isBusy}
          whileTap={{ scale: 0.98 }}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-6 py-4 text-sm font-bold text-charcoal shadow-[0_20px_40px_-20px_rgba(255,255,255,0.35)] transition-all hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-kraft/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {isBusy ? (
            <Loader2 size={20} className="animate-spin text-stone-500" />
          ) : (
            <GoogleIcon />
          )}
          <span>{isBusy ? "Connecting…" : "Continue with Google"}</span>
        </motion.button>
      </Magnetic>

      <div className="mt-8 space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
        {[
          "Content management & live preview",
          "Inquiry inbox & status tracking",
          "Analytics export & heatmaps",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-xs text-stone-400"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-kraft" />
            {item}
          </div>
        ))}
      </div>
    </AdminAuthShell>
  );
}
