"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/scroll-to";

let lenisSingleton: Lenis | null = null;
let mountCount = 0;
let rafId = 0;

function initLenis() {
  if (lenisSingleton) return lenisSingleton;

  lenisSingleton = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  registerLenis(lenisSingleton);
  lenisSingleton.on("scroll", ScrollTrigger.update);

  const loop = (time: number) => {
    lenisSingleton?.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  return lenisSingleton;
}

function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
  lenisSingleton?.destroy();
  lenisSingleton = null;
  registerLenis(null);
}

export function SmoothScroll({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (
      !enabled ||
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    mountCount += 1;
    initLenis();

    return () => {
      mountCount -= 1;
      if (mountCount <= 0) {
        mountCount = 0;
        destroyLenis();
      }
    };
  }, [enabled]);

  return null;
}
