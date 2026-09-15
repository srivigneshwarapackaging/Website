"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Ply anatomy — §19
 * Four constructions, one at a time. Left: the actual layer stack drawn to
 * relative thickness. Right: the numbers. Hairline tabs, no pills, no cards.
 *
 * The load and burst figures are standard grade ranges for each construction,
 * printed in full rather than truncated to their first number.
 */

export interface PlyItem {
  id: "3" | "5" | "7" | "diecut";
  title: string;
  subtitle: string;
  tab: string;
  loadCapacity: string;
  burstingStrength: string;
  fluteTypes: string;
  layersCount: number;
  bestUses: string[];
  paperGrades: string;
  description: string;
  layersSchema: { type: "liner" | "flute"; label: string; thickness: number }[];
}

export const PLY_DATA: PlyItem[] = [
  {
    id: "3",
    title: "3-ply single wall",
    subtitle: "High-volume shipping and e-commerce cartons",
    tab: "3-ply",
    loadCapacity: "Up to 15 kg",
    burstingStrength: "120 – 180 psi (12 – 16 BF)",
    fluteTypes: "B, C or E flute",
    layersCount: 3,
    paperGrades: "120 – 230 GSM virgin / semi-kraft",
    bestUses: [
      "E-commerce parcel mailers",
      "Apparel and footwear packaging",
      "Consumer electronics and accessories",
      "FMCG retail master cartons",
    ],
    description:
      "Two smooth outer kraft liners around a single fluted wave. The balance point between lightweight efficiency and stacking strength for parcels under 15 kg.",
    layersSchema: [
      { type: "liner", label: "Outer kraft liner (180 GSM)", thickness: 4 },
      { type: "flute", label: "C-flute medium (120 GSM)", thickness: 14 },
      { type: "liner", label: "Inner kraft liner (140 GSM)", thickness: 4 },
    ],
  },
  {
    id: "5",
    title: "5-ply double wall",
    subtitle: "Heavy-duty industrial and bulk protection",
    tab: "5-ply",
    loadCapacity: "Up to 45 kg",
    burstingStrength: "240 – 350 psi (18 – 24 BF)",
    fluteTypes: "BC or EB combination flute",
    layersCount: 5,
    paperGrades: "180 – 280 GSM high-BF kraft",
    bestUses: [
      "Home appliances and kitchenware",
      "Industrial chemicals and liquid drums",
      "Automotive parts and machinery spares",
      "Pharma cold-chain bulk distribution",
    ],
    description:
      "Three kraft liners interleaved with two fluted profiles. Higher puncture resistance and stacking compression for heavy multi-pallet warehouse storage.",
    layersSchema: [
      { type: "liner", label: "Outer heavy kraft liner", thickness: 5 },
      { type: "flute", label: "B-flute puncture layer", thickness: 10 },
      { type: "liner", label: "Centre reinforcing liner", thickness: 4 },
      { type: "flute", label: "C-flute cushioning layer", thickness: 14 },
      { type: "liner", label: "Inner protective liner", thickness: 5 },
    ],
  },
  {
    id: "7",
    title: "7-ply triple wall",
    subtitle: "Export-grade heavy equipment containers",
    tab: "7-ply",
    loadCapacity: "120 kg and above",
    burstingStrength: "450 – 600 psi (28 – 35 BF)",
    fluteTypes: "AAA, BBC or CAA combination",
    layersCount: 7,
    paperGrades: "250 – 400 GSM high-burst kraft",
    bestUses: [
      "Air and sea freight export cargo",
      "Heavy industrial machinery and engines",
      "Agricultural bulk produce crates",
      "High-value metal castings and transformers",
    ],
    description:
      "A timber substitute: four kraft liners bonded to three fluting waves. Top-to-bottom compression strength, water-resistant glues and shock absorption for international transit.",
    layersSchema: [
      { type: "liner", label: "Outer high-BF kraft liner", thickness: 6 },
      { type: "flute", label: "A-flute cushion layer", thickness: 16 },
      { type: "liner", label: "Reinforcing inner wall", thickness: 5 },
      { type: "flute", label: "B-flute rigid medium", thickness: 10 },
      { type: "liner", label: "Middle stabiliser wall", thickness: 5 },
      { type: "flute", label: "C-flute absorption layer", thickness: 14 },
      { type: "liner", label: "Inner heavy liner", thickness: 6 },
    ],
  },
  {
    id: "diecut",
    title: "Custom die-cut",
    subtitle: "Precision mailers, trays and inserts",
    tab: "Die-cut",
    loadCapacity: "Engineered to the product",
    burstingStrength: "Specified per job",
    fluteTypes: "E, B or micro flute",
    layersCount: 3,
    paperGrades: "White coated or kraft",
    bestUses: [
      "D2C subscription boxes and self-locking mailers",
      "Corrugated internal partitions and inserts",
      "Point-of-sale counter displays",
      "Fragile glassware and cosmetic sets",
    ],
    description:
      "Cut with bespoke steel dies to your tolerances. Self-locking flaps, tear strips, display windows and protective partitions — without relying on tape.",
    layersSchema: [
      { type: "liner", label: "Bleached white or virgin kraft", thickness: 4 },
      { type: "flute", label: "Micro E-flute or B-flute", thickness: 8 },
      { type: "liner", label: "Smooth interior liner", thickness: 4 },
    ],
  },
];

export function PlyShowcase({
  className,
  configureHref = "#configure",
}: {
  className?: string;
  configureHref?: string;
}) {
  const reduced = useReducedMotion();
  const [activePlyId, setActivePlyId] = useState<PlyItem["id"]>("3");
  const currentPly = PLY_DATA.find((p) => p.id === activePlyId) ?? PLY_DATA[0];

  const specs = [
    { term: "Load capacity", value: currentPly.loadCapacity },
    { term: "Bursting strength", value: currentPly.burstingStrength },
    { term: "Flute combinations", value: currentPly.fluteTypes },
    { term: "Kraft paper", value: currentPly.paperGrades },
    { term: "Layers", value: `${currentPly.layersCount}` },
  ];

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="max-w-2xl">
        <Eyebrow>Step 01 · Ply construction</Eyebrow>
        <h2 className="font-hero text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary">
          How many walls your box needs.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Ply counts the paper layers. More layers means more load and more
          protection — and more cost. Start with the weight you&rsquo;re
          shipping.
        </p>
      </div>

      {/* Hairline tabs */}
      <div
        role="tablist"
        aria-label="Ply construction"
        className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-b border-charcoal/10"
      >
        {PLY_DATA.map((ply) => {
          const isActive = ply.id === activePlyId;
          return (
            <button
              key={ply.id}
              type="button"
              role="tab"
              id={`ply-tab-${ply.id}`}
              aria-selected={isActive}
              aria-controls={`ply-panel-${ply.id}`}
              onClick={() => setActivePlyId(ply.id)}
              className={cn(
                "relative min-h-[44px] pb-3 text-[0.85rem] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper",
                isActive
                  ? "text-copper"
                  : "text-text-secondary hover:text-copper"
              )}
            >
              {ply.tab}
              {isActive && (
                <motion.span
                  layoutId="ply-tab-underline"
                  aria-hidden
                  className="absolute -bottom-px left-0 right-0 h-[2px] bg-copper"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPly.id}
          role="tabpanel"
          id={`ply-panel-${currentPly.id}`}
          aria-labelledby={`ply-tab-${currentPly.id}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Layer stack, drawn to relative thickness */}
          <div className="lg:col-span-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                Board layers
              </h3>
              <span className="text-[0.7rem] font-semibold tabular-nums text-copper">
                {currentPly.layersCount} layers
              </span>
            </div>

            <div className="mt-5 space-y-2.5">
              {currentPly.layersSchema.map((layer, index) => (
                <div key={`${layer.label}-${index}`}>
                  <div className="flex items-baseline justify-between gap-4 text-[0.7rem]">
                    <span className="text-text-secondary">{layer.label}</span>
                    <span className="shrink-0 text-text-muted">
                      {layer.type === "liner" ? "Liner" : "Fluted"}
                    </span>
                  </div>

                  {layer.type === "liner" ? (
                    <div
                      className="mt-1.5 w-full rounded-[3px]"
                      style={{
                        height: `${layer.thickness * 2.4}px`,
                        background:
                          "linear-gradient(90deg, #D4A574, #B87333 55%, #8B5A2B)",
                      }}
                    />
                  ) : (
                    <div
                      className="relative mt-1.5 w-full overflow-hidden rounded-[3px] border border-copper/25 bg-white"
                      style={{ height: `${layer.thickness * 2.4}px` }}
                    >
                      <svg
                        viewBox="0 0 400 30"
                        className="h-full w-full"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 0 15 Q 15 0 30 15 T 60 15 T 90 15 T 120 15 T 150 15 T 180 15 T 210 15 T 240 15 T 270 15 T 300 15 T 330 15 T 360 15 T 390 15 T 400 15"
                          fill="none"
                          stroke="#B87333"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-[0.85rem] leading-relaxed text-text-secondary">
              {currentPly.description}
            </p>
          </div>

          {/* Specification + where it's used */}
          <div className="lg:col-span-6">
            <h3 className="font-hero text-xl font-bold leading-[1.15] tracking-[-0.02em] text-text-primary">
              {currentPly.title}
            </h3>
            <p className="mt-1.5 text-[0.85rem] text-text-muted">
              {currentPly.subtitle}
            </p>

            <dl className="mt-6 divide-y divide-charcoal/8 border-t border-charcoal/10 text-[0.8rem]">
              {specs.map((row) => (
                <div
                  key={row.term}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="shrink-0 text-text-muted">{row.term}</dt>
                  <dd className="text-right font-semibold text-text-primary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Typically used for
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {currentPly.bestUses.map((use) => (
                <li
                  key={use}
                  className="flex gap-2.5 text-[0.85rem] leading-snug text-text-secondary"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-px w-3 shrink-0 bg-copper"
                  />
                  {use}
                </li>
              ))}
            </ul>

            <a
              href={configureHref}
              className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-[0.85rem] font-semibold text-copper transition-colors hover:text-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper"
            >
              Configure a {currentPly.tab} box
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
