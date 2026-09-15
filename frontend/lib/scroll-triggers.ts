"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single source of truth for scroll-driven motion.
 *
 * Ownership rule (§42): GSAP/ScrollTrigger owns everything scroll-scrubbed or
 * continuous — pins, parallax plates, the box fold, progress rails. Framer
 * Motion owns discrete UI state only — hover, tap, layoutId underlines,
 * accordions. The two must never write the same property on the same element.
 */

let registered = false;

/** Registers the plugin exactly once, even under React strict-mode remounts. */
export function registerScrollPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Media buckets every scene branches on. Kept here so a scene never invents its
 * own breakpoint and drifts out of step with the rest of the story.
 *
 * DESKTOP pins. MOBILE never pins — the same scenes stack and reveal on entry,
 * so a phone keeps the full narrative at native scroll length. REDUCED renders
 * each scene at its finished state.
 */
export const SCENE_MEDIA = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Trigger positions are measured at mount, but Instrument_Serif / Syne /
 * Plus_Jakarta_Sans load async and reflow the page afterwards — leaving every
 * pin measuring stale offsets. This is the usual cause of "the pin starts in
 * the wrong place". Refresh once the fonts have settled.
 */
export function refreshAfterFonts() {
  if (typeof document === "undefined") return;

  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fonts) {
    ScrollTrigger.refresh();
    return;
  }

  fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {
    ScrollTrigger.refresh();
  });
}

/**
 * Writes a number to a CSS custom property on an element.
 *
 * Scenes drive their visuals through custom properties rather than React state
 * so that scrubbing costs no re-render: GSAP touches one property per frame and
 * CSS resolves the rest on the compositor.
 */
export function setSceneProgress(
  el: HTMLElement | null,
  property: string,
  value: number
) {
  el?.style.setProperty(property, value.toFixed(4));
}

export { gsap, ScrollTrigger };
