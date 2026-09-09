"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/**
 * Per-word mask reveal for headlines — each word rises from behind a clip edge
 * with a staggered cascade. The flagship headline treatment.
 */
export function SplitHeadline({
  text,
  className,
  delay = 0,
  once = true,
  playOnMount = false,
  active,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  playOnMount?: boolean;
  /** When set, drives visibility instead of in-view or mount triggers. */
  active?: boolean;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;
  const controlled = active !== undefined;

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={delay}
      initial="hidden"
      animate={
        controlled ? (active ? "visible" : "hidden") : playOnMount ? "visible" : undefined
      }
      whileInView={controlled || playOnMount ? undefined : "visible"}
      viewport={controlled || playOnMount ? undefined : { once, margin: "-40px" }}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span variants={word} style={{ display: "inline-block" }}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
