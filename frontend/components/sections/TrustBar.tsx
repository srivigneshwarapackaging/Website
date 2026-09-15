"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AboutContent } from "@/shared/types/content-types";
import { Container } from "@/components/design-system/Container";
import { Counter } from "@/components/motion/Counter";

/**
 * Trust / capability metrics — §14
 * Clean horizontal row, thin vertical separators on desktop, 2-column grid on
 * mobile. Deliberately no cards, no colour fills, no icons: the numbers carry it.
 *
 * The figures count with scroll position rather than firing once, so the row
 * reads as part of the scroll story. Non-numeric values ("Custom", "Bengaluru")
 * pass through untouched.
 */

const FALLBACK_METRICS: AboutContent["stats"] = [
  { value: "30+", label: "Years of experience" },
  { value: "240T", label: "Monthly capacity" },
  { value: "3–7", label: "Ply options" },
  { value: "Custom", label: "Manufacturing" },
  { value: "Bengaluru", label: "Based" },
];

export function TrustBar({ stats }: { stats?: AboutContent["stats"] }) {
  const reduced = useReducedMotion();
  const metrics = stats?.length ? stats.slice(0, 5) : FALLBACK_METRICS;

  return (
    <section
      aria-label="Manufacturing capability at a glance"
      className="border-y border-charcoal/8 bg-alabaster py-12 md:py-14"
    >
      <Container>
        {/*
          Opacity only, no y-translate: the counters inside measure their own
          scroll positions, and a transformed parent would offset those
          measurements. The numbers counting up is the entrance.
        */}
        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-y-0"
        >
          {metrics.map((metric, index) => (
            <div
              key={`${metric.value}-${metric.label}`}
              className={
                // Hairline separators only between items on desktop
                "px-0 lg:flex-1 lg:px-8 " +
                (index > 0 ? "lg:border-l lg:border-charcoal/10" : "lg:pl-0")
              }
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <Counter
                  value={metric.value}
                  scrub
                  className="block font-hero text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-text-primary tabular-nums"
                />
                <span className="mt-3 block text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.14em] text-text-muted">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
