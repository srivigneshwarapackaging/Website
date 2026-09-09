"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type RevealKind = "up" | "fade" | "blur" | "scale";

const EASE = [0.22, 1, 0.36, 1] as const;

function variantsFor(kind: RevealKind): Variants {
  switch (kind) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
      };
    case "blur":
      return {
        hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1, ease: EASE },
        },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.9, ease: EASE },
        },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      };
  }
}

/**
 * Unified scroll-into-view reveal. Use `stagger` to choreograph children
 * (children must be <ScrollReveal.Item /> or any motion element using the
 * shared `item` variants).
 */
export function ScrollReveal({
  children,
  className,
  kind = "up",
  delay = 0,
  stagger,
  as = "div",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  delay?: number;
  stagger?: number;
  as?: "div" | "section" | "li" | "ul" | "span";
  once?: boolean;
}) {
  const MotionTag = motion[as] as typeof motion.div;

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };
    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-80px" }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={variantsFor(kind)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Child element for a staggered ScrollReveal container. */
export function RevealItem({
  children,
  className,
  kind = "up",
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
}) {
  return (
    <motion.div className={className} variants={variantsFor(kind)}>
      {children}
    </motion.div>
  );
}
