"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Bespoke pointer: a precise dot plus a trailing ring that enlarges over
 * interactive elements. Disabled entirely on touch / coarse pointers.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="link"]'
      );
      setActive(interactive);
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[130] hidden md:block"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      <motion.div
        style={{ x, y }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="block rounded-full bg-kraft transition-all duration-200"
          style={{ width: active ? 6 : 5, height: active ? 6 : 5 }}
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="block rounded-full border transition-all duration-200"
          style={{
            width: active ? 52 : 30,
            height: active ? 52 : 30,
            borderColor: active
              ? "rgba(196,165,116,0.65)"
              : "rgba(120,113,108,0.45)",
            backgroundColor: active ? "rgba(196,165,116,0.08)" : "transparent",
          }}
        />
      </motion.div>
    </div>
  );
}
