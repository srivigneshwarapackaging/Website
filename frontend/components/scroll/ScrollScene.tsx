"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  gsap,
  ScrollTrigger,
  SCENE_MEDIA,
  registerScrollPlugins,
  setSceneProgress,
} from "@/lib/scroll-triggers";

/**
 * A pinned story scene.
 *
 * The scene holds still while scroll scrubs its progress from 0 to 1, and the
 * children read that progress to animate. Progress is published two ways:
 *
 *   1. `--scene-progress` (0→1) on the section — for anything CSS can express.
 *      This is the fast path: no React render happens per frame.
 *   2. `beat` state — a coarse integer index, for content that must actually
 *      change (captions swapping). This renders, but only `beats` times across
 *      the whole scene rather than once per frame.
 *
 * Three media buckets, per SCENE_MEDIA:
 *   desktop — pinned, scrubbed
 *   mobile  — never pinned; the scene stacks and reveals on entry, so a phone
 *             keeps the full story at native scroll length
 *   reduced — no pin, no scrub: the finished state, rendered immediately
 */
export function ScrollScene({
  id,
  beats = 1,
  heightVh = 300,
  className,
  contentClassName,
  children,
}: {
  id: string;
  /** Number of discrete content beats across the scene. */
  beats?: number;
  /** Scroll distance the pin consumes, in vh. Ignored on mobile/reduced. */
  heightVh?: number;
  className?: string;
  contentClassName?: string;
  children: (state: { beat: number; pinned: boolean }) => ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    registerScrollPlugins();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(SCENE_MEDIA.desktop, () => {
        setPinned(true);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${heightVh}%`,
          pin: stage,
          pinSpacing: true,
          scrub: true,
          // will-change is applied only while the scene is live; leaving it on
          // permanently keeps a compositor layer alive for the whole page.
          onToggle: (self) => {
            stage.style.willChange = self.isActive ? "transform" : "auto";
          },
          onUpdate: (self) => {
            setSceneProgress(section, "--scene-progress", self.progress);
            const next = Math.min(
              beats - 1,
              Math.floor(self.progress * beats)
            );
            setBeat((current) => (current === next ? current : next));
          },
        });

        return () => {
          stage.style.willChange = "auto";
          trigger.kill();
        };
      });

      // Mobile: no pin. The scene plays as it passes through the viewport, so
      // the page keeps its natural length and touch scrolling is never hijacked.
      mm.add(SCENE_MEDIA.mobile, () => {
        setPinned(false);

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          onUpdate: (self) => {
            setSceneProgress(section, "--scene-progress", self.progress);
            const next = Math.min(
              beats - 1,
              Math.floor(self.progress * beats)
            );
            setBeat((current) => (current === next ? current : next));
          },
        });

        return () => trigger.kill();
      });

      // Reduced motion: the finished state, never blank and never half-folded.
      mm.add(SCENE_MEDIA.reduced, () => {
        setPinned(false);
        setSceneProgress(section, "--scene-progress", 1);
        setBeat(beats - 1);
      });
    }, section);

    return () => ctx.revert();
  }, [beats, heightVh]);

  return (
    <section
      ref={sectionRef}
      id={id}
      // --scene-progress is declared here so descendants always resolve it,
      // even before the first scroll event lands.
      style={{ "--scene-progress": 0 } as React.CSSProperties}
      className={cn("relative scroll-mt-24", className)}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative flex w-full flex-col justify-center overflow-hidden",
          pinned ? "h-screen" : "min-h-[70vh] py-20 md:py-28",
          contentClassName
        )}
      >
        {children({ beat, pinned })}
      </div>
    </section>
  );
}
