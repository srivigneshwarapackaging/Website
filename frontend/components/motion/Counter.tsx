"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  gsap,
  ScrollTrigger,
  registerScrollPlugins,
} from "@/lib/scroll-triggers";

/**
 * Counts up a numeric portion of a stat string, preserving any prefix/suffix
 * ("30+", "240T", "95%", "Zero", "Carbon").
 *
 * Two modes:
 *   default — counts once on entry, on its own timeline
 *   scrub   — the number is tied to scroll position, so it counts as you scroll
 *             and counts back down if you scroll up
 *
 * Non-numeric values ("Zero") render as-is in both modes.
 */
export function Counter({
  value,
  className,
  scrub = false,
}: {
  value: string;
  className?: string;
  /** Ties the count to scroll position instead of firing once on entry. */
  scrub?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);

  // Scrubbed mode — GSAP owns the value, driven by scroll position.
  useEffect(() => {
    if (!scrub) return;

    const el = ref.current;
    const parsed = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!el || !parsed) return;

    registerScrollPlugins();

    const prefix = parsed[1];
    const numStr = parsed[2].replace(/,/g, "");
    const suffix = parsed[3];
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    if (!Number.isFinite(target)) return;

    const render = (n: number) =>
      setDisplay(
        `${prefix}${Number(n.toFixed(decimals)).toLocaleString()}${suffix}`
      );

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: 0 };
        const tween = gsap.to(counter, {
          n: target,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 42%",
            scrub: true,
          },
          onUpdate: () => render(counter.n),
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // Reduced motion: the final figure, immediately.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        render(target);
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [scrub, value]);

  // Default mode — count once on entry.
  useEffect(() => {
    if (scrub || !inView || hasAnimated.current) return;

    const parsed = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!parsed) return;

    hasAnimated.current = true;

    const prefix = parsed[1];
    const numStr = parsed[2].replace(/,/g, "");
    const suffix = parsed[3];
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    if (!Number.isFinite(target)) return;

    const start = performance.now();
    const duration = 1400;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplay(`${prefix}${Number(current).toLocaleString()}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, scrub]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}
