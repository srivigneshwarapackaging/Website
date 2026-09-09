"use client";

import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/motion/MagneticButton";
import { scrollToSection } from "@/lib/scroll-to";

export function BackToTop() {
  return (
    <Magnetic strength={0.5}>
      <button
        type="button"
        onClick={() => scrollToSection("hero", 0)}
        data-cursor="link"
        className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-stone-300 transition-colors hover:border-kraft/60 hover:text-white"
      >
        <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
        Back to top
      </button>
    </Magnetic>
  );
}
