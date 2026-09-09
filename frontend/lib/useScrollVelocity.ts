"use client";

import {
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

/**
 * Returns a smoothed skew value (deg) driven by scroll velocity — the subtle
 * "kinetic" tilt used on premium marquee/type bands. Clamped both directions.
 */
export function useScrollSkew(maxSkew = 4): MotionValue<number> {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 250, damping: 50, mass: 0.4 });
  return useTransform(smooth, [-2500, 0, 2500], [maxSkew, 0, -maxSkew], {
    clamp: true,
  });
}
