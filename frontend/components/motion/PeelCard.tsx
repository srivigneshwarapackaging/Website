"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Corner "peel" hover — the top-right lifts to reveal kraft texture underneath.
 * Lightweight CSS transforms only.
 */
export function PeelCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 280, damping: 22 });
  const sy = useSpring(py, { stiffness: 280, damping: 22 });

  const peelX = useTransform(sx, [0, 1], [0, 14]);
  const peelY = useTransform(sy, [0, 1], [0, -14]);
  const peelRotate = useTransform(sx, [0, 1], [-2, 8]);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.85);
    py.set(0.15);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseEnter={reset}
      className={`group/peel relative ${className ?? ""}`}
    >
      {/* Kraft under-layer revealed on peel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/peel:opacity-100"
        style={{
          background:
            "repeating-linear-gradient(90deg, #c4a574 0px, #c4a574 8px, #a07d4e 8px, #a07d4e 9px)",
        }}
      />
      <div className="relative h-full">{children}</div>
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 z-20 h-16 w-16 origin-top-right rounded-bl-2xl bg-gradient-to-br from-white/90 to-stone-100 shadow-[-4px_4px_12px_rgba(0,0,0,0.08)] dark:from-zinc-800 dark:to-zinc-900"
          style={{
            x: peelX,
            y: peelY,
            rotate: peelRotate,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />
      )}
    </div>
  );
}
