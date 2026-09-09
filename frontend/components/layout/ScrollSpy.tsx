"use client";

import { useEffect } from "react";
import { computeSectionFromDOM, useJourneyStore } from "@/store/useJourneyStore";

/**
 * Lightweight scroll spy. Keeps the journey store's active section /
 * section progress in sync with the page so nav highlighting, the process
 * step highlight, and product variant interactions keep working — without
 * any 3D canvas or fixed video pane.
 */
export function ScrollSpy() {
  const syncFromScroll = useJourneyStore((s) => s.syncFromScroll);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const globalProgress = max > 0 ? window.scrollY / max : 0;
      const { activeSection, sectionProgress } = computeSectionFromDOM();
      syncFromScroll({ globalProgress, activeSection, sectionProgress });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncFromScroll]);

  return null;
}
