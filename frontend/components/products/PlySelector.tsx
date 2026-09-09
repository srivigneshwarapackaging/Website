"use client";

import { motion } from "framer-motion";
import type { ProductItem } from "@/shared/types/content-types";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { plyLabel } from "./shared";

export function PlySelector({
  items,
  activeIndex,
  onSelect,
  layoutId = "ply-pill",
}: {
  items: ProductItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  layoutId?: string;
}) {
  return (
    <ScrollReveal kind="fade" className="mb-8 flex flex-wrap gap-2">
      {items.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => onSelect(i)}
          className={`relative rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
            activeIndex === i
              ? "text-charcoal"
              : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
          }`}
        >
          {activeIndex === i && (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-kraft to-kraft-dark shadow-lg dark:from-kraft dark:to-kraft-dark"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative">{plyLabel(p.ply)}</span>
        </button>
      ))}
    </ScrollReveal>
  );
}
