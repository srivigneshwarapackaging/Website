"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Lab doorway.
 * The interactive tools live on /lab, not here — the home page states what is
 * in there and gets out of the way. Three lines, one link.
 */


export function LabEntry({ data }: { data: import("@/shared/types/homepage").HomepageContent["lab"] }) {
  const reduced = useReducedMotion();

  return (
    <section
      id="lab"
      className="scroll-mt-24 border-t border-charcoal/10 bg-alabaster py-20 md:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
              {data.title}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary">
              {data.description}
            </p>

            <Link
              href="/lab"
              className="group mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-[10px] bg-copper px-8 text-[0.85rem] font-semibold text-white transition-colors duration-[250ms] hover:bg-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper"
            >
              {data.cta}
              <span
                aria-hidden
                className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </div>

          <ol className="border-t border-charcoal/10 lg:col-span-7 lg:border-t-0">
            {data.items.map((tool, index) => (
              <motion.li
                key={index}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-charcoal/10 py-7 md:grid-cols-12 md:items-baseline lg:first:border-t lg:first:border-charcoal/10"
              >
                <span className="font-hero text-[1.5rem] font-bold leading-none tabular-nums text-copper md:col-span-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-hero text-lg font-bold leading-tight tracking-[-0.01em] text-text-primary md:col-span-4">
                  {tool.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary md:col-span-6">
                  {tool.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
