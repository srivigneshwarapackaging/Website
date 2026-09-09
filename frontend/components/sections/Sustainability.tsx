"use client";

import { motion } from "framer-motion";
import type { SustainabilityContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { DisplayHeading, BodyText } from "@/components/design-system/Heading";
import { Counter } from "@/components/motion/Counter";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

function ringPercent(stat: string): number {
  const num = parseFloat(stat.replace(/[^\d.]/g, ""));
  if (stat.includes("%") && Number.isFinite(num)) return Math.min(100, num);
  return 100;
}

function ProgressRing({ stat, label }: { stat: string; label: string }) {
  const percent = ringPercent(stat);
  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="group flex flex-col items-center rounded-2xl border border-emerald-700/40 bg-emerald-950/50 p-6 text-center backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-emerald-900/40">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="rgba(16,185,129,0.15)"
            strokeWidth="6"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="url(#ecoGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * percent) / 100 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <defs>
            <linearGradient id="ecoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl md:text-3xl font-bold text-emerald-300">
            <Counter value={stat} />
          </span>
        </div>
      </div>
      <div className="mt-4 text-[9px] font-black uppercase tracking-[0.25em] text-emerald-200/60">
        {label}
      </div>
    </div>
  );
}

export function SustainabilitySection({ data }: { data: SustainabilityContent }) {
  const words = data.title.split(" ");
  const lastWord = words.pop() || "";
  const rest = words.join(" ");

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-gradient-to-br from-emerald-950 via-emerald-900 to-charcoal p-10 md:p-16 text-white shadow-[var(--shadow-premium)]">
      <div
        className="bg-mesh-drift pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 85%, rgba(52,211,153,0.4) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(6,78,59,0.6) 0%, transparent 40%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.5) 12px, rgba(255,255,255,0.5) 13px)",
        }}
      />

      <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="text-emerald-400/90">{data.eyebrow}</Eyebrow>
          <DisplayHeading className="text-white mb-6">
            {rest} <span className="italic text-emerald-300">{lastWord}</span>
          </DisplayHeading>
          <ScrollReveal kind="blur">
            <BodyText className="text-emerald-100/75 max-w-lg">{data.description}</BodyText>
          </ScrollReveal>
        </div>

        <ScrollReveal
          stagger={0.12}
          className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
        >
          {data.stats.map((item, i) => (
            <RevealItem key={i} kind="scale">
              <ProgressRing stat={item.stat} label={item.label} />
            </RevealItem>
          ))}
        </ScrollReveal>
      </div>
    </div>
  );
}
