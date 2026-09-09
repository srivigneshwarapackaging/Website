"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Package, Factory, TrendingUp, CheckCircle, LucideIcon, ArrowRight } from "lucide-react";
import type { ProcessContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { ProcessStageVisual } from "@/components/visual/ProcessStageVisual";

const STAGE_ACCENTS = ["#c4a574", "#b45309", "#e8d5b7", "#9a7b4f"];

/** Swap only the stage diagrams between the first two panels — copy stays put. */
function visualIconForStep(
  steps: ProcessContent["steps"],
  index: number,
  step: ProcessContent["steps"][number]
) {
  if (index === 0 && steps[1]) return steps[1].icon || "factory";
  if (index === 1 && steps[0]) return steps[0].icon || "package";
  return step.icon;
}

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, LucideIcon> = {
  package: Package,
  factory: Factory,
  print: TrendingUp,
  check: CheckCircle,
};

export function ProcessTimeline({ data }: { data: ProcessContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const getDistance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (lineRef.current) {
                lineRef.current.style.strokeDashoffset = `${1 - self.progress}`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const steps = data.steps;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-charcoal text-white"
    >
      {/* Blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.4] lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,165,116,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(196,165,116,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Desktop: horizontal scrubbed track */}
      <div className="hidden lg:block">
        <div ref={trackRef} className="relative flex h-screen w-max flex-nowrap">
          {/* Connecting line that draws as you scrub */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <line
              x1="0"
              y1="58"
              x2="100"
              y2="58"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="6 8"
            />
            <line
              ref={lineRef}
              x1="0"
              y1="58"
              x2="100"
              y2="58"
              stroke="url(#processLine)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
            <defs>
              <linearGradient id="processLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c4a574" />
                <stop offset="100%" stopColor="#e8d5b7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Intro panel */}
          <div className="flex h-screen w-screen shrink-0 items-center px-[8vw]">
            <div className="max-w-xl">
              <Eyebrow className="text-kraft-light">{data.eyebrow}</Eyebrow>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                {data.title}
              </h2>
              <p className="mt-6 max-w-md text-stone-400 leading-relaxed">{data.intro}</p>
              <div className="mt-10 flex items-center gap-3 text-kraft-light">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  {String(steps.length).padStart(2, "0")} stages
                </span>
                <ArrowRight size={18} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* Step panels */}
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon || ""] || Package;
            return (
              <div
                key={i}
                className="relative flex h-screen w-[78vw] shrink-0 items-center justify-between gap-[4vw] border-l border-white/5 px-[6vw]"
              >
                <div
                  className="pointer-events-none absolute left-[4vw] top-1/2 -translate-y-1/2 font-display font-bold leading-none text-white/[0.035]"
                  style={{ fontSize: "clamp(12rem, 28vw, 24rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative max-w-lg">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-kraft to-kraft-dark text-charcoal shadow-[0_20px_60px_-15px_rgba(196,165,116,0.45)] ring-1 ring-white/10">
                    <Icon size={28} />
                  </div>
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-kraft-light">
                    Stage {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed text-stone-400">
                    {step.description}
                  </p>
                </div>
                <div className="relative hidden shrink-0 xl:block">
                  <ProcessStageVisual
                    icon={visualIconForStep(steps, i, step)}
                    accent={STAGE_ACCENTS[i % STAGE_ACCENTS.length]}
                    size={280}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Scrub progress rail */}
        <div className="pointer-events-none absolute bottom-10 left-[8vw] right-[8vw] h-px bg-white/10">
          <span
            ref={fillRef}
            className="block h-full origin-left scale-x-0 bg-gradient-to-r from-kraft via-kraft-light to-kraft-dark"
          />
        </div>
      </div>

      {/* Mobile / reduced-motion: vertical stacked steps */}
      <div className="lg:hidden px-6 py-24">
        <Eyebrow className="text-kraft-light">{data.eyebrow}</Eyebrow>
        <h2 className="font-display text-4xl leading-[0.95] tracking-[-0.03em] mb-4">
          {data.title}
        </h2>
        <p className="text-stone-400 leading-relaxed mb-12">{data.intro}</p>
        <div className="space-y-5">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon || ""] || Package;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="absolute right-5 top-5 font-display text-4xl font-bold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kraft to-kraft-dark text-charcoal shadow-lg ring-1 ring-white/10">
                    <Icon size={22} />
                  </div>
                  <ProcessStageVisual
                    icon={visualIconForStep(steps, i, step)}
                    accent={STAGE_ACCENTS[i % STAGE_ACCENTS.length]}
                    size={112}
                    compact
                  />
                </div>
                <h3 className="font-display text-xl mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-stone-400">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
