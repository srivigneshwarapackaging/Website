"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { AboutContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Heritage / about — §26
 * One strong manufacturing photograph, then a decade timeline with large years
 * and minimal text. No scroll choreography beyond a single grouped reveal.
 */

const TIMELINE = [
  { year: "1990s", label: "Foundation" },
  { year: "2000s", label: "Capability expansion" },
  { year: "2010s", label: "Industrial scale" },
  { year: "2020s", label: "Modernization" },
  { year: "Today", label: "Engineering-led packaging" },
];

export function AboutSection({
  data,
  showFullPageLink = false,
}: {
  data: AboutContent;
  showFullPageLink?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {data.title}
          </h2>
        </div>

        <div className="lg:col-span-7">
          <p className="whitespace-pre-line text-lg leading-[1.7] text-text-secondary">
            {data.description}
          </p>
          {showFullPageLink && (
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition-colors duration-200 hover:text-copper"
              >
                Read our full story
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* One strong manufacturing photograph */}
      {data.imageUrl && (
        <motion.figure
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 overflow-hidden rounded-[14px] border border-charcoal/10 md:mt-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.imageUrl}
            alt="Corrugated board being manufactured at the Bengaluru facility"
            className="h-[320px] w-full object-cover md:h-[480px]"
            loading="lazy"
          />
        </motion.figure>
      )}

      {/* Decade timeline */}
      <motion.ol
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-charcoal/10 pt-10 md:mt-20 md:grid-cols-3 lg:grid-cols-5"
      >
        {TIMELINE.map((entry) => (
          <li key={entry.year}>
            <span
              aria-hidden
              className="mb-4 block h-px w-6 bg-copper"
            />
            <span className="block font-hero text-2xl font-bold leading-none tracking-[-0.02em] text-text-primary md:text-[1.75rem]">
              {entry.year}
            </span>
            <span className="mt-2 block text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.14em] text-text-muted">
              {entry.label}
            </span>
          </li>
        ))}
      </motion.ol>
    </div>
  );
}
