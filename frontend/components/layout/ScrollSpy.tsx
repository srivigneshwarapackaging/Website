"use client";

import { useEffect } from "react";
import {
  ScrollTrigger,
  registerScrollPlugins,
} from "@/lib/scroll-triggers";
import { computeSectionFromDOM, useJourneyStore } from "@/store/useJourneyStore";

/**
 * Keeps the journey store's active section / progress in sync with the page,
 * so nav highlighting and product variant interactions keep working.
 *
 * Runs on ScrollTrigger's clock rather than its own scroll listener: a second
 * listener would race the first and, once sections are pinned, would read
 * positions that disagree with what the pinned scenes are rendering.
 */
export function ScrollSpy() {
  const syncFromScroll = useJourneyStore((s) => s.syncFromScroll);

  useEffect(() => {
    registerScrollPlugins();

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const globalProgress = max > 0 ? window.scrollY / max : 0;
      const { activeSection, sectionProgress } = computeSectionFromDOM();
      syncFromScroll({ globalProgress, activeSection, sectionProgress });
    };

    update();

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight,
      onUpdate: update,
      onRefresh: update,
    });

    return () => trigger.kill();
  }, [syncFromScroll]);

  return null;
}
