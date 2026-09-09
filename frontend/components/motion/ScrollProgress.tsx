"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed hairline at the very top of the viewport that fills as the page
 * scrolls — a subtle signal of progress used on premium editorial sites.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left bg-gradient-to-r from-kraft via-accent to-kraft"
    />
  );
}
