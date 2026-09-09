"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Line-mask reveal: text rises from behind a clipping edge as it enters view.
 * Used for headline drama on a flagship-grade site.
 */
export function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
