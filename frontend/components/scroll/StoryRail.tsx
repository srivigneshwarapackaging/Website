"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  gsap,
  ScrollTrigger,
  registerScrollPlugins,
} from "@/lib/scroll-triggers";

/**
 * The progress spine that runs beneath the whole story.
 *
 * One copper rule spanning every scene, so the reader always knows how far
 * through "how a box gets made" they are. The step labels are the CMS process
 * steps — the story *is* the process, so they are not duplicated anywhere else.
 *
 * Sticks to the bottom of the viewport while the story is on screen, then
 * leaves with it.
 */
export function StoryRail({
  steps,
  storyId,
}: {
  steps: { title: string }[];
  /** Element id wrapping all story scenes — the rail's lifetime. */
  storyId: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const story = document.getElementById(storyId);
    if (!story) return;

    registerScrollPlugins();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = ScrollTrigger.create({
          trigger: story,
          start: "top 60%",
          end: "bottom bottom",
          onToggle: (self) => setVisible(self.isActive),
          onUpdate: (self) => {
            if (fillRef.current) {
              fillRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const next = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            setActive((current) => (current === next ? current : next));
          },
        });

        return () => trigger.kill();
      });

      // Reduced motion: no travelling indicator, and no floating bar.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setVisible(false);
        setActive(steps.length - 1);
        if (fillRef.current) fillRef.current.style.transform = "scaleX(1)";
      });
    }, railRef);

    return () => ctx.revert();
  }, [steps.length, storyId]);

  return (
    <div
      ref={railRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 hidden border-t border-charcoal/10 bg-white/85 backdrop-blur-sm transition-opacity duration-500 lg:block",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="relative h-px w-full bg-charcoal/12">
        <span
          ref={fillRef}
          className="absolute inset-y-0 left-0 block w-full origin-left scale-x-0 bg-copper"
        />
      </div>

      <ol className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-6 py-3 md:px-8 lg:px-16">
        {steps.map((step, index) => {
          const isActive = index <= active;
          return (
            <li key={step.title} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "block h-[5px] w-[5px] rounded-full transition-colors duration-300",
                  isActive ? "bg-copper" : "bg-charcoal/20"
                )}
              />
              <span
                className={cn(
                  "text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                  isActive ? "text-text-primary" : "text-charcoal/35"
                )}
              >
                <span className="tabular-nums text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
