"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Clip-path wipe reveal for imagery: the panel unmasks from the bottom as it
 * scrolls into view, while the inner content drifts with a subtle parallax.
 */
export function ImageReveal({
  children,
  className,
  parallax = 0.12,
}: {
  children: ReactNode;
  className?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallax * 100}%`, `${-parallax * 100}%`]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE }}
      style={{ overflow: "hidden" }}
    >
      <motion.div
        style={reduced ? { height: "100%" } : { y: innerY, height: "100%" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
