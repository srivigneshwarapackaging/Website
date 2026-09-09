"use client";

import { motion } from "framer-motion";
import type { AboutContent, TrustBarContent } from "@/shared/types/content-types";
import { Counter } from "@/components/motion/Counter";
import { useScrollSkew } from "@/lib/useScrollVelocity";

export function TrustBar({
  stats,
  trustBar,
}: {
  stats?: AboutContent["stats"];
  trustBar?: TrustBarContent;
}) {
  const industries = trustBar?.industries?.length ? trustBar.industries : [];
  const items = [...industries, ...industries];
  const skewX = useScrollSkew(3);

  return (
    <section className="relative z-10 border-y border-stone-200/80 bg-white/60 py-5 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/60">
      <motion.div className="overflow-hidden" style={{ skewX }}>
        {items.length > 0 && (
          <div className="animate-marquee flex w-max gap-12 px-6">
            {items.map((label, i) => (
              <span
                key={`${label}-${i}`}
                className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.35em] text-stone-400 whitespace-nowrap"
              >
                {label}
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </span>
            ))}
          </div>
        )}
      </motion.div>
      {stats && stats.length > 0 && (
        <div className="relative hidden lg:grid grid-cols-4 gap-6 max-w-6xl mx-auto px-6 lg:px-10 mt-6 pt-6 border-t border-stone-200/50 dark:border-zinc-800/50">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 right-6 top-0 h-px origin-left bg-gradient-to-r from-transparent via-kraft to-transparent lg:left-10 lg:right-10"
          />
          {stats.slice(0, 4).map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-stone-900 dark:text-white">
                <Counter value={s.value} />
              </p>
              <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
