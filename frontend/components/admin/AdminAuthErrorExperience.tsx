"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/MagneticButton";
import { AdminAuthShell, AdminAuthHeader } from "./AdminAuthShell";

function AuthErrorContent({ companyName }: { companyName: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const message =
    error === "AccessDenied"
      ? "Your Google account is not on the authorized allowlist for this portal."
      : "A security protocol error occurred during authentication. Please try again.";

  return (
    <AdminAuthShell companyName={companyName}>
      <div className="mb-6 flex justify-center lg:justify-start">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10"
        >
          <ShieldAlert size={28} className="text-accent" />
        </motion.div>
      </div>

      <AdminAuthHeader
        eyebrow="Access denied"
        title="Restricted area"
        description={message}
      />

      <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-center text-xs leading-relaxed text-stone-400 lg:text-left">
        If you believe this is a mistake, contact your site administrator to add your email
        to the allowlist.
      </div>

      <Magnetic className="w-full">
        <button
          type="button"
          onClick={() => router.push("/auth/admin")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-all hover:border-kraft/40 hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Return to login
        </button>
      </Magnetic>
    </AdminAuthShell>
  );
}

export function AdminAuthErrorExperience({ companyName }: { companyName: string }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-charcoal text-sm text-stone-500">
          Loading…
        </div>
      }
    >
      <AuthErrorContent companyName={companyName} />
    </Suspense>
  );
}
