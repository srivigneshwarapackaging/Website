"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { TrustBarContent } from "@/shared/types/content-types";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Applications / industries — §24
 * Typography, not colourful cards. Hovering an industry shifts it 4px and
 * reveals a copper indicator; on desktop only, a short technical note appears
 * alongside. No cursor-following imagery (§24 forbids it on mobile, and it adds
 * nothing on desktop).
 */

const NOTES: Record<string, string> = {
  Automotive: "Heavy components, part protection, returnable formats.",
  Electronics: "Static-safe inner packing and cushioned die-cut inserts.",
  FMCG: "High-volume repeat cartons with consistent print.",
  Engineering: "Dense, high-load assemblies in 5- and 7-ply construction.",
  "E-commerce": "Right-sized single-parcel boxes built for handling.",
  Furniture: "Large-format panels and edge protection.",
  "Industrial components": "Bulk supply for recurring production schedules.",
  Pharmaceutical: "Clean, consistent cartons for regulated supply chains.",
};

export function Applications({ trustBar, data }: { trustBar?: TrustBarContent; data: import("@/shared/types/homepage").HomepageContent["applications"] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const industries = trustBar?.industries?.length
    ? trustBar.industries
    : Object.keys(NOTES);

  return (
    <section
      id="applications"
      className="scroll-mt-24 border-t border-charcoal/10 py-20 md:py-28 lg:py-36"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
              {data.title}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              {data.description}
            </p>

            {/* Desktop-only contextual note. Replaces the old cursor effect. */}
            <div className="mt-10 hidden min-h-[3.5rem] lg:block" aria-hidden>
              <AnimatePresence mode="wait">
                {active && (
                  <motion.p
                    key={active}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-sm border-l-2 border-copper pl-4 text-sm leading-relaxed text-text-secondary"
                  >
                    {NOTES[active] ?? "Custom construction to your specification."}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {industries.map((industry, index) => (
              <motion.li
                key={industry}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-charcoal/10 first:border-t"
                onMouseEnter={() => setActive(industry)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(industry)}
                onBlur={() => setActive(null)}
              >
                <div className="group flex items-baseline gap-4 py-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 md:py-6">
                  <span className="w-8 shrink-0 text-[0.7rem] font-semibold tabular-nums tracking-[0.12em] text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-hero text-2xl font-bold tracking-[-0.02em] text-text-primary md:text-3xl">
                    {industry}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-px w-0 bg-copper transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-10"
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
