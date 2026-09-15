"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import {
  gsap,
  ScrollTrigger,
  registerScrollPlugins,
  refreshAfterFonts,
} from "@/lib/scroll-triggers";
import { registerLenis } from "@/lib/scroll-to";

/**
 * Smooth scroll, driven from GSAP's ticker.
 *
 * Lenis and ScrollTrigger must share one frame clock: if Lenis runs its own
 * requestAnimationFrame loop, scrubbed animations resolve against a scroll
 * position that is a frame stale, which reads as jitter on pinned scenes.
 * lagSmoothing(0) stops GSAP from swallowing frames after a long task, which
 * would otherwise desync the pin from the page.
 *
 * Lenis drives window scroll here (no wrapper/content config), so ScrollTrigger
 * needs no scrollerProxy.
 */

let lenisSingleton: Lenis | null = null;
let mountCount = 0;
let tickerFn: ((time: number) => void) | null = null;

function initLenis() {
  if (lenisSingleton) return lenisSingleton;

  registerScrollPlugins();

  lenisSingleton = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  registerLenis(lenisSingleton);
  lenisSingleton.on("scroll", ScrollTrigger.update);

  // GSAP ticker time is in seconds; Lenis expects milliseconds.
  tickerFn = (time: number) => lenisSingleton?.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  refreshAfterFonts();

  return lenisSingleton;
}

function destroyLenis() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  gsap.ticker.lagSmoothing(500, 33);
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
