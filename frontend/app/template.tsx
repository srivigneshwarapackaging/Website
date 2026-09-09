"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Route-transition wipe. `template.tsx` remounts on every navigation, so this
 * plays a charcoal panel sweeping away to reveal the incoming page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  // Note: children are rendered without a transform wrapper on purpose —
  // a transformed ancestor would break `position: fixed` for the header and
  // overlays. The wipe is a standalone fixed sibling.
  return (
    <>
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[150] bg-charcoal"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          style={{ originY: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      )}
      {children}
    </>
  );
}
