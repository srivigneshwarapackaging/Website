"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts up a numeric portion of a stat string when scrolled into view,
 * preserving any prefix/suffix ("30+", "10M+", "95%", "Zero", "Carbon").
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

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
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}
