"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-to";


export function MaterialFilm({ data }: { data: import("@/shared/types/homepage").HomepageContent }) {
  const materials = data.materials.items.map((item, i) => ({ name: item.title, detail: item.description, src: item.imageUrl || "/materials/kraft-roll.png", number: String(i + 1).padStart(2, "0") }));
  const reduced = useReducedMotion();
  const reveal = (index: number) =>
    reduced
      ? { initial: false as const, whileInView: undefined }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <>
      <section id="material" className="scroll-mt-24 bg-[#191817] py-20 md:py-28 lg:py-36">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:px-8 lg:grid-cols-12 lg:gap-16 lg:px-16">
          <motion.div {...reveal(0)} className="lg:col-span-4">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[#d5a578]">{data.materials.eyebrow}</p>
            <span aria-hidden className="mt-5 block h-px w-8 bg-[#8f5a32]" />
            <h2 className="mt-7 max-w-sm font-body text-[clamp(2.8rem,5vw,5.6rem)] font-normal leading-[0.96] tracking-[-0.06em] text-[#f5f1e8]">
              {data.materials.title}
            </h2>
            <p className="mt-7 max-w-sm text-[1rem] leading-[1.7] text-white/65">
              {data.materials.description}
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
            {materials.map((material, index) => (
              <motion.figure key={material.name} {...reveal(index + 1)} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#191817]">
                  <Image src={material.src} alt={material.name} fill sizes="(min-width: 1024px) 25vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transform-none" />
                </div>
                <figcaption className="mt-4 flex gap-3 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#f5f1e8]">
                  <span className="text-[#a96b3d]">{material.number}</span>
                  <span>{material.name}<span className="mt-1 block text-[0.55rem] tracking-[0.14em] text-white/50">{material.detail}</span></span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#191817] py-0 text-[#f5f1e8]">
        <div className="grid min-h-[680px] lg:grid-cols-2">
          <div className="flex items-end px-6 py-16 md:px-8 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[#d5a578]">{data.solutions.eyebrow}</p>
              <span aria-hidden className="mt-5 block h-px w-8 bg-[#a96b3d]" />
              <h2 className="mt-7 font-body text-[clamp(3rem,5vw,5.7rem)] font-normal leading-[0.94] tracking-[-0.065em]">
                {data.solutions.title}
              </h2>
              <p className="mt-7 max-w-md text-[1rem] leading-[1.7] text-white/65">
                {data.solutions.description}
              </p>
              <button type="button" onClick={() => scrollToSection("products")} className="mt-9 border-b border-[#d5a578] pb-2 text-sm font-medium text-[#f5f1e8] transition-colors hover:text-[#d5a578] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5a578]">
                {data.solutions.cta} <span aria-hidden className="ml-2">→</span>
              </button>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden">
            <Image src={data.solutions.imageUrl || "/materials/open-diecut-box.png"} alt="Open custom die-cut corrugated packaging" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
