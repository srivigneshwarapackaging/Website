"use client";

import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Pointer-reactive 3D tilt with a moving sheen. Lightweight (CSS transforms
 * only) and disabled on touch / reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const sheen = useTransform(
    sx,
    (v) =>
      `radial-gradient(420px circle at ${v * 100}% 0%, rgba(255,255,255,0.18), transparent 45%)`
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        reduced
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }
      }
      className={className}
    >
      {children}
      {!reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheen }}
        />
      )}
    </motion.div>
  );
}
