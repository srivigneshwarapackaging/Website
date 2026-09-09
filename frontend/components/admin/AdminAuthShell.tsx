"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { GrainOverlay, AmbientGlow } from "@/components/design-system/PremiumEffects";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { BrandMark } from "@/components/brand/BrandLogo";

const EASE = [0.22, 1, 0.36, 1] as const;

function CorrugatedStripes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(196,165,116,0.55) 11px, rgba(196,165,116,0.55) 12px)",
      }}
    />
  );
}

function BrandPanel({ companyName }: { companyName: string }) {
  const initials = companyName
    .split(/\s+/)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex flex-col justify-between overflow-hidden bg-charcoal p-10 text-white md:p-12 lg:p-14">
      <AmbientGlow className="-left-24 top-0 h-72 w-72" color="kraft" />
      <AmbientGlow className="-right-16 bottom-0 h-64 w-64" color="accent" />
      <CorrugatedStripes />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-stone-500 transition-colors hover:text-kraft-light"
        >
          <ArrowLeft size={14} />
          Public site
        </Link>
      </motion.div>

      <div className="relative my-auto py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mb-10"
        >
          <BrandMark size={56} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-kraft-light"
        >
          Internal access
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
          className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.92] tracking-[-0.03em]"
        >
          Operations
          <br />
          <span className="text-gradient-gold">Portal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
          className="mt-6 max-w-sm text-sm leading-relaxed text-stone-400"
        >
          Manage site content, inquiries, and analytics for {companyName}. Authorized
          personnel only.
        </motion.p>

        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-none absolute -bottom-6 right-0 hidden font-display text-[9rem] font-bold leading-none text-white/[0.03] lg:block"
        >
          {initials}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600"
      >
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Systems online
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-kraft" />
          OAuth secured
        </span>
      </motion.div>
    </div>
  );
}

export function AdminAuthShell({
  companyName,
  children,
}: {
  companyName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-charcoal text-white">
      <GrainOverlay />

      <div className="relative grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <BrandPanel companyName={companyName} />

        <div className="relative flex items-center justify-center px-6 py-14 md:px-10 lg:px-14">
          <AmbientGlow className="right-0 top-1/4 h-80 w-80 -translate-y-1/2" color="kraft" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="relative w-full max-w-md"
          >
            <div className="overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-charcoal-soft/90 shadow-[var(--shadow-float)] backdrop-blur-xl">
              <CorrugatedStripes />
              <div className="relative p-8 md:p-10">{children}</div>
            </div>

            <p className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-stone-600">
              <Lock size={11} />
              Encrypted session via NextAuth
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AdminAuthHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 text-center lg:text-left">
      <Eyebrow className="!text-kraft-light [&>span]:bg-kraft/60">{eyebrow}</Eyebrow>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-400">{description}</p>
    </div>
  );
}
