"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll-to";
import { useScrollSkew } from "@/lib/useScrollVelocity";

function Row({
  phrase,
  reverse,
  outline,
}: {
  phrase: string;
  reverse?: boolean;
  outline?: boolean;
}) {
  return (
    <div className="flex w-max overflow-hidden whitespace-nowrap">
      <span
        className={`flex items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {[0, 1].map((k) => (
          <span key={k} className="flex items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-5 px-5">
                <span
                  className={
                    outline
                      ? "font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
                      : "font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-white/90 transition-colors group-hover:text-kraft-light"
                  }
                >
                  {phrase}
                </span>
                <ArrowUpRight className="text-kraft" size={28} />
              </span>
            ))}
          </span>
        ))}
      </span>
    </div>
  );
}

export function MarqueeCTA({ label = "Let's build your packaging" }: { label?: string }) {
  const skewX = useScrollSkew(5);
  return (
    <button
      type="button"
      onClick={() => scrollToSection("contact")}
      aria-label={label}
      data-cursor="link"
      className="group relative block w-full overflow-hidden border-y border-white/10 bg-charcoal py-10 md:py-14"
    >
      <div
        className="bg-mesh-drift pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, rgba(196,165,116,0.35) 0%, transparent 55%)",
        }}
      />
      <motion.div className="relative flex flex-col gap-2" style={{ skewX }}>
        <Row phrase={label} />
        <Row phrase={label} reverse outline />
      </motion.div>
    </button>
  );
}
