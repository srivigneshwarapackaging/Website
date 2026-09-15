"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Why Sri Vigneshwara — §15
 * Editorial blocks separated by hairlines. Deliberately not a card grid:
 * the number and the rule do the structuring work.
 */


export function WhyChooseUs({ data }: { data: import("@/shared/types/homepage").HomepageContent["why"] }) {
  const reduced = useReducedMotion();

  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-28 lg:py-36">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {data.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {data.description}
          </p>
        </div>

        <div className="mt-16 border-t border-charcoal/10 md:mt-20">
          {data.items.map((block, index) => (
            <motion.article
              key={index}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-charcoal/10 py-9 md:grid-cols-12 md:items-baseline md:py-11"
            >
              <div className="md:col-span-2">
                <span className="font-hero text-[2rem] font-bold leading-none tabular-nums text-copper md:text-[2.5rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-hero text-xl font-bold uppercase leading-tight tracking-[0.01em] text-text-primary md:col-span-4 md:text-2xl">
                {block.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-text-secondary md:col-span-6">
                {block.description}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
