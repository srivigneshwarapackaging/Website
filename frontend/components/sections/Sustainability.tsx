"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { SustainabilityContent } from "@/shared/types/content-types";
import { Counter } from "@/components/motion/Counter";

const PRINCIPLES = [
  "Closed-loop industrial paper scrap recycling",
  "Zero plastic lining or hazardous solvent inks",
  "Compostable, biodegradable board matrix",
];

/** Sustainability uses the same editorial grid as the manufacturing content. */
export function SustainabilitySection({ data, principles = PRINCIPLES }: { data: SustainabilityContent; principles?: string[] }) {
  const reduced = useReducedMotion();
  const words = data.title.split(" ");
  const emphasis = words.pop();

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
      <div className="lg:col-span-6">
        <p className="font-technical text-eco-deep">{data.eyebrow}</p>
        <h2 className="mt-5 max-w-xl font-hero text-[clamp(2.5rem,4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
          {words.join(" ")} <span className="font-editorial font-normal italic text-eco-deep">{emphasis}</span>
        </h2>
        <p className="mt-6 max-w-lg text-lg leading-[1.7] text-text-secondary">{data.description}</p>
        <ul className="mt-9 space-y-4 border-t border-charcoal/10 pt-7">
          {principles.map((principle) => <li key={principle} className="flex gap-3 text-sm leading-relaxed text-text-secondary"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-eco-deep" />{principle}</li>)}
        </ul>
      </div>

      <motion.dl initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="grid self-end border-y border-charcoal/10 sm:grid-cols-3 lg:col-span-6">
        {data.stats.map((item, index) => <div key={item.label} className={`px-0 py-7 sm:px-5 sm:py-9 ${index > 0 ? "border-t border-charcoal/10 sm:border-l sm:border-t-0" : ""}`}><dt className="font-technical !text-[0.64rem] text-text-muted">{item.label}</dt><dd className="mt-5 font-hero text-[clamp(2rem,3vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-text-primary"><Counter value={item.stat} /></dd></div>)}
      </motion.dl>
    </div>
  );
}
