"use client";

import { ArrowUp } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to";

/**
 * Back to top — quiet text link with a hairline underline on hover.
 * No magnetic pull, no pill, no dark-surface styling.
 */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("hero", 0)}
      className="group inline-flex min-h-[44px] items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper"
    >
      <ArrowUp
        size={13}
        className="transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none"
      />
      Back to top
    </button>
  );
}
