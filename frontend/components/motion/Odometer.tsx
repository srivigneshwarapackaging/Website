"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function DigitRoll({ digit, index, play }: { digit: number; index: number; play: boolean }) {
  return (
    <span
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ height: "1em", lineHeight: "1em" }}
    >
      {/* invisible spacer keeps width */}
      <span className="invisible">0</span>
      <motion.span
        className="absolute left-0 top-0 flex flex-col"
        initial={{ y: "0em" }}
        animate={play ? { y: `${-digit}em` } : { y: "0em" }}
        transition={{ duration: 1.4, ease: EASE, delay: index * 0.08 }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} style={{ height: "1em", lineHeight: "1em" }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/**
 * Mechanical odometer counter: each digit rolls up to its final value on
 * scroll-in. Preserves any non-numeric prefix/suffix (e.g. "10M+", "95%").
 * Falls back to plain text for non-numeric values ("ISO", "Zero").
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const [, prefix, numStr, suffix] = match;
  const digits = numStr.replace(/,/g, "").split("");

  return (
    <span ref={ref} className={className} aria-label={value}>
      {prefix}
      {digits.map((d, i) => (
        <DigitRoll key={i} digit={Number(d)} index={i} play={inView} />
      ))}
      {suffix}
    </span>
  );
}
