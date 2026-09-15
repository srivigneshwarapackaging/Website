"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * One depth layer inside a ScrollScene.
 *
 * Belarosa splits each scene into background / mid / foreground plates that
 * travel at different rates while the scene is pinned; that difference in rate
 * is what reads as depth. This generalises it: `depth` scales how far the plate
 * moves relative to scene progress.
 *
 *   depth < 0  → moves down / recedes (background)
 *   depth = 0  → static
 *   depth > 0  → moves up / advances (foreground)
 *
 * Transform is composed entirely in CSS from --scene-progress, so plates cost
 * nothing per frame — GSAP writes one custom property on the section and every
 * plate resolves off it on the compositor.
 */
export function ParallaxPlate({
  depth = 0,
  /** Vertical travel at depth 1, in vh. */
  travel = 18,
  /** Scale added across the scene. 0.06 → ends 6% larger. */
  zoom = 0,
  /** Fades in over the first third when true. */
  fade = false,
  className,
  style,
  children,
}: {
  depth?: number;
  travel?: number;
  zoom?: number;
  fade?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden={undefined}
      className={cn("will-change-transform motion-reduce:!transform-none", className)}
      style={
        {
          "--depth": depth,
          "--travel": `${travel}vh`,
          "--zoom": zoom,
          transform:
            "translate3d(0, calc(var(--scene-progress, 0) * var(--travel) * var(--depth) * -1), 0) " +
            "scale(calc(1 + var(--scene-progress, 0) * var(--zoom)))",
          ...(fade
            ? { opacity: "clamp(0, calc(var(--scene-progress, 0) * 3), 1)" }
            : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
