"use client";

import { motion } from "framer-motion";

export const DEFAULT_ROLLING_PRIMARY = [
  "CORRUGATED",
  "PACKAGING",
  "BENGALURU",
  "ISO CERTIFIED",
  "EXPORT",
  "FMCG",
  "E-COMMERCE",
];

export const DEFAULT_ROLLING_SECONDARY = [
  "BUILT TO LAST",
  "DESIGNED TO PROTECT",
  "3 PLY",
  "5 PLY",
  "7 PLY",
  "DIE-CUT",
];

function MarqueeRow({
  phrases,
  reverse,
  outline,
  opacity,
}: {
  phrases: string[];
  reverse?: boolean;
  outline?: boolean;
  opacity: number;
}) {
  const items = [...phrases, ...phrases];
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className="overflow-hidden whitespace-nowrap" style={{ opacity }}>
      <div className={`flex w-max ${animClass}`}>
        {items.map((phrase, i) => (
          <span key={`${phrase}-${i}`} className="flex items-center">
            <span
              className={
                outline
                  ? "px-6 font-hero text-[clamp(2rem,10vw,6.5rem)] font-extrabold uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(196,165,116,0.45)]"
                  : "px-6 font-hero text-[clamp(2rem,10vw,6.5rem)] font-extrabold uppercase leading-none tracking-tighter text-white/25"
              }
            >
              {phrase}
            </span>
            <span className="text-kraft/40 text-[clamp(1rem,3vw,2rem)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function IntroRollingText({
  dimmed,
  exiting,
  primary = DEFAULT_ROLLING_PRIMARY,
  secondary = DEFAULT_ROLLING_SECONDARY,
}: {
  dimmed?: boolean;
  exiting?: boolean;
  primary?: string[];
  secondary?: string[];
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 md:gap-10"
      animate={{
        opacity: exiting ? 0 : dimmed ? 0.08 : 1,
        filter: exiting ? "blur(12px)" : dimmed ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ duration: exiting ? 0.45 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0.12 }}
        animate={{ opacity: dimmed ? 0.08 : 0.28 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <MarqueeRow phrases={primary} opacity={1} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.08 }}
        animate={{ opacity: dimmed ? 0.06 : 0.2 }}
        transition={{ duration: 1.2, delay: 0.35 }}
      >
        <MarqueeRow phrases={secondary} reverse outline opacity={1} />
      </motion.div>
    </motion.div>
  );
}
