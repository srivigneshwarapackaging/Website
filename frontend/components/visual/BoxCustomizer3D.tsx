"use client";

import { useEffect, useState, useRef, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Board & flute explorer — §18
 * One question answered: what does the wall of the box actually look like, and
 * what does each flute profile do. The box is a real CSS 3D object you can
 * turn; everything else is hairlines and type.
 *
 * The ECT and burst figures below are published reference ranges for each
 * flute profile, not measurements of a specific order — the copy says so.
 */

export interface FluteProfile {
  id: string;
  name: string;
  short: string;
  thickness: string;
  frequency: string;
  flutesPerMeter: number;
  ectRating: string;
  burstIndex: string;
  bestFor: string;
  accent: string;
  svgWave: string;
}

export const FLUTE_PROFILES: FluteProfile[] = [
  {
    id: "c-flute",
    name: "C-flute",
    short: "The default",
    thickness: "3.8 mm",
    frequency: "Medium flute",
    flutesPerMeter: 128,
    ectRating: "32 – 44 ECT",
    burstIndex: "200 – 275 psi",
    bestFor: "Standard shipping cartons, FMCG goods, master packaging.",
    accent: "#B87333",
    svgWave:
      "M 0 15 Q 12.5 0 25 15 T 50 15 T 75 15 T 100 15 T 125 15 T 150 15 T 175 15 T 200 15",
  },
  {
    id: "b-flute",
    name: "B-flute",
    short: "Puncture resistance",
    thickness: "2.8 mm",
    frequency: "Fine flute",
    flutesPerMeter: 164,
    ectRating: "32 – 40 ECT",
    burstIndex: "175 – 250 psi",
    bestFor: "High-graphic retail boxes, canned foods, die-cut mailers.",
    accent: "#D4A574",
    svgWave:
      "M 0 12 Q 8 0 16 12 T 32 12 T 48 12 T 64 12 T 80 12 T 96 12 T 112 12 T 128 12 T 144 12 T 160 12 T 176 12 T 192 12 T 200 12",
  },
  {
    id: "e-flute",
    name: "E-flute",
    short: "Thin wall, fine print",
    thickness: "1.5 mm",
    frequency: "Micro flute",
    flutesPerMeter: 295,
    ectRating: "26 – 32 ECT",
    burstIndex: "150 – 200 psi",
    bestFor: "Premium e-commerce mailers, cosmetics, electronics, retail packs.",
    accent: "#8B5A2B",
    svgWave:
      "M 0 8 Q 5 0 10 8 T 20 8 T 30 8 T 40 8 T 50 8 T 60 8 T 70 8 T 80 8 T 90 8 T 100 8 T 110 8 T 120 8 T 130 8 T 140 8 T 150 8 T 160 8 T 170 8 T 180 8 T 190 8 T 200 8",
  },
  {
    id: "bc-flute",
    name: "BC-flute",
    short: "Double wall",
    thickness: "6.6 mm",
    frequency: "Heavy-duty combination",
    flutesPerMeter: 292,
    ectRating: "48 – 71 ECT",
    burstIndex: "350 – 500 psi",
    bestFor: "Industrial machinery, automotive parts, export bulk containers.",
    accent: "#5E3B1A",
    svgWave:
      "M 0 22 Q 10 0 20 22 T 40 22 T 60 22 T 80 22 T 100 22 T 120 22 T 140 22 T 160 22 T 180 22 T 200 22",
  },
];

const KRAFT_FRONT = "linear-gradient(135deg, #E6D0B3 0%, #D4A574 45%, #B87333 100%)";
const KRAFT_SIDE = "linear-gradient(135deg, #B87333 0%, #8B5A2B 60%, #68411D 100%)";
const KRAFT_TOP = "linear-gradient(135deg, #EAD7BE 0%, #DDB689 100%)";
const FLUTE_PATTERN =
  "repeating-linear-gradient(90deg, rgba(139,90,43,0) 0px, rgba(139,90,43,0) 5px, rgba(139,90,43,0.28) 5px, rgba(139,90,43,0.28) 6px)";

const CONTROL_BASE =
  "inline-flex min-h-[40px] items-center rounded-[10px] border px-4 text-[0.75rem] font-semibold transition-colors duration-[250ms] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper";

export function BoxCustomizer3D({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [selectedFlute, setSelectedFlute] = useState<FluteProfile>(
    FLUTE_PROFILES[0]
  );
  const [spinRequested, setSpinRequested] = useState(true);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: -18, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Reduced motion never auto-rotates; you can still turn it by hand.
  const isSpinning = spinRequested && !reduced;

  // Keep one orientation for both automatic rotation and manual dragging.
  // Pausing must not jump back to an unrelated CSS keyframe or stored angle.
  useEffect(() => {
    if (!isSpinning) return;
    let frame: number;
    let previous: number | undefined;
    const tick = (time: number) => {
      if (previous !== undefined) {
        const elapsed = Math.min(time - previous, 64);
        setRotation((value) => ({ ...value, y: (value.y + elapsed * 360 / 22000) % 360 }));
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isSpinning]);

  // Mouse and pen only — hijacking touchmove would trap page scrolling
  // inside a 380px tall stage on a phone.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSpinRequested(false);
    setIsDragging(true);
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;
    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.4,
    }));
    dragStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  const boxWidth = 200;
  const boxHeight = 170;
  const boxDepth = 150;
  const halfW = boxWidth / 2;
  const halfH = boxHeight / 2;
  const halfD = boxDepth / 2;

  const faceStyle = (custom: CSSProperties): CSSProperties => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    transformOrigin: "center center",
    backfaceVisibility: "visible",
    boxShadow: "inset 0 0 40px rgba(0,0,0,0.16)",
    ...custom,
  });

  const specs = [
    { term: "Board caliper", value: selectedFlute.thickness },
    { term: "Flute profile", value: selectedFlute.frequency },
    { term: "Flutes per metre", value: String(selectedFlute.flutesPerMeter) },
    { term: "Edge crush (ECT)", value: selectedFlute.ectRating },
    { term: "Burst index", value: selectedFlute.burstIndex },
  ];

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>Step 02 · Board &amp; flute</Eyebrow>
          <h2 className="font-hero text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary">
            What the wall of the box is made of.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Flute is the wave between the liners. A finer flute prints better; a
            deeper flute carries more. Turn the box, then pick a profile to see
            the cross-section change.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSpinRequested((value) => !value)}
            aria-pressed={isSpinning}
            className={cn(
              CONTROL_BASE,
              isSpinning
                ? "border-copper/45 bg-copper/[0.06] text-copper-dark"
                : "border-charcoal/15 text-text-secondary hover:border-copper hover:text-copper"
            )}
          >
            {isSpinning ? "Stop rotation" : "Rotate"}
          </button>
          <button
            type="button"
            onClick={() => setIsFlapOpen((value) => !value)}
            aria-pressed={isFlapOpen}
            className={cn(
              CONTROL_BASE,
              isFlapOpen
                ? "border-copper/45 bg-copper/[0.06] text-copper-dark"
                : "border-charcoal/15 text-text-secondary hover:border-copper hover:text-copper"
            )}
          >
            {isFlapOpen ? "Close flap" : "Open flap"}
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* 3D stage */}
        <div
          className="relative flex h-[320px] w-full select-none items-center justify-center overflow-hidden rounded-[14px] border border-charcoal/10 bg-alabaster md:h-[380px] lg:col-span-7"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Faint measuring grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-12 h-14 w-64 rounded-full bg-charcoal/10 blur-xl"
            style={{ transform: "scaleY(0.4)" }}
          />

          <div
            className="relative"
            style={{
              perspective: 1200,
              width: boxWidth,
              height: boxHeight,
              transform: "translateY(20px) scale(0.8)",
            }}
          >
            <div
              className="relative"
              style={{
                width: boxWidth,
                height: boxHeight,
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* Front */}
              <div
                style={faceStyle({
                  width: boxWidth,
                  height: boxHeight,
                  marginLeft: -halfW,
                  marginTop: -halfH,
                  background: `${FLUTE_PATTERN}, ${KRAFT_FRONT}`,
                  transform: `translateZ(${halfD}px)`,
                  borderRadius: 4,
                })}
              >
                <div className="absolute inset-x-4 top-4 flex items-baseline justify-between border-b border-copper-dark/25 pb-2">
                  <span className="text-[0.5rem] font-bold uppercase tracking-[0.18em] text-charcoal/80">
                    Sri Vigneshwara
                  </span>
                  <span className="text-[0.5rem] font-bold uppercase tracking-[0.14em] text-charcoal/60">
                    {selectedFlute.name}
                  </span>
                </div>
                <div
                  className="absolute inset-x-0 top-1/2 h-5 -translate-y-1/2"
                  style={{ background: selectedFlute.accent, opacity: 0.9 }}
                />
              </div>

              {/* Back */}
              <div
                style={faceStyle({
                  width: boxWidth,
                  height: boxHeight,
                  marginLeft: -halfW,
                  marginTop: -halfH,
                  background: `${FLUTE_PATTERN}, ${KRAFT_FRONT}`,
                  transform: `rotateY(180deg) translateZ(${halfD}px)`,
                  borderRadius: 4,
                })}
              />

              {/* Right */}
              <div
                style={faceStyle({
                  width: boxDepth,
                  height: boxHeight,
                  marginLeft: -halfD,
                  marginTop: -halfH,
                  background: `${FLUTE_PATTERN}, ${KRAFT_SIDE}`,
                  transform: `rotateY(90deg) translateZ(${halfW}px)`,
                  borderRadius: 4,
                })}
              />

              {/* Left */}
              <div
                style={faceStyle({
                  width: boxDepth,
                  height: boxHeight,
                  marginLeft: -halfD,
                  marginTop: -halfH,
                  background: `${FLUTE_PATTERN}, ${KRAFT_SIDE}`,
                  transform: `rotateY(-90deg) translateZ(${halfW}px)`,
                  borderRadius: 4,
                })}
              />

              {/* Full-depth lid, hinged to the back wall's top edge.
                  Its local top edge stays at y=-halfH, z=-halfD at every angle. */}
              <div
                style={faceStyle({
                  width: boxWidth,
                  height: boxDepth,
                  marginLeft: -halfW,
                  marginTop: 0,
                  transformOrigin: "top center",
                  background: `${FLUTE_PATTERN}, ${KRAFT_TOP}`,
                  transform: `translateY(${-halfH}px) translateZ(${-halfD}px) rotateX(${isFlapOpen ? 155 : 90}deg)`,
                  transition: reduced ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                })}
              />

              {/* Bottom */}
              <div
                style={faceStyle({
                  width: boxWidth,
                  height: boxDepth,
                  marginLeft: -halfW,
                  marginTop: -halfD,
                  background: KRAFT_SIDE,
                  transform: `rotateX(-90deg) translateZ(${halfH}px)`,
                })}
              />
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-4 left-5 text-[0.7rem] text-text-muted">
            Drag to turn
          </p>
        </div>

        {/* Profile picker + specification */}
        <div className="lg:col-span-5">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
            Flute profile
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {FLUTE_PROFILES.map((flute) => {
              const isActive = selectedFlute.id === flute.id;
              return (
                <button
                  key={flute.id}
                  type="button"
                  onClick={() => setSelectedFlute(flute)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex min-h-[64px] flex-col items-start justify-center rounded-[10px] border px-4 py-3 text-left transition-colors duration-[250ms] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper",
                    isActive
                      ? "border-copper bg-copper/[0.05]"
                      : "border-charcoal/12 hover:border-copper/45"
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.85rem] font-semibold",
                      isActive ? "text-copper-dark" : "text-text-primary"
                    )}
                  >
                    {flute.name}
                  </span>
                  <span className="mt-0.5 text-[0.7rem] leading-snug text-text-muted">
                    {flute.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cross-section */}
          <div className="mt-6 rounded-[10px] border border-charcoal/10 bg-white p-5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Cross-section
              </span>
              <span className="text-[0.7rem] font-semibold tabular-nums text-copper">
                {selectedFlute.flutesPerMeter} flutes / m
              </span>
            </div>

            <div className="mt-4 flex h-16 w-full flex-col justify-between overflow-hidden rounded-[6px] border border-charcoal/10 bg-pearl px-2 py-1.5">
              <div className="h-1.5 w-full rounded-sm bg-charcoal/15" />
              <svg
                viewBox="0 0 200 30"
                className="h-8 w-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  key={selectedFlute.id}
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  d={selectedFlute.svgWave}
                  fill="none"
                  stroke={selectedFlute.accent}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <div className="h-1.5 w-full rounded-sm bg-charcoal/15" />
            </div>

            <p className="mt-4 text-[0.85rem] leading-relaxed text-text-secondary">
              {selectedFlute.bestFor}
            </p>
          </div>

          {/* Reference figures */}
          <dl className="mt-6 divide-y divide-charcoal/8 border-t border-charcoal/10 text-[0.8rem]">
            {specs.map((row) => (
              <div
                key={row.term}
                className="flex items-baseline justify-between gap-4 py-2.5"
              >
                <dt className="text-text-muted">{row.term}</dt>
                <dd className="text-right font-semibold tabular-nums text-text-primary">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[0.75rem] leading-relaxed text-text-muted">
            Published reference ranges for each flute profile. Your final
            specification is confirmed against your product and load.
          </p>
        </div>
      </div>
    </div>
  );
}
