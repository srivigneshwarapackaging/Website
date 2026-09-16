"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * Build your box — §20 / §21
 * Controls on the left, live specification on the right. Numbers ease to their
 * new value rather than snapping. The only outcome is a real WhatsApp message
 * with the configuration pre-filled — no simulated "quote sent" state.
 */

export type UnitType = "mm" | "cm" | "inches";

export interface BoxConfig {
  length: number;
  width: number;
  height: number;
  unit: UnitType;
  ply: PlyKey;
  printType: PrintKey;
  quantity: number;
}

type PlyKey = "3" | "5" | "7" | "diecut";
type PrintKey = "plain" | "one-color" | "multi-color";

const PLY_DETAILS: Record<
  PlyKey,
  { label: string; short: string; desc: string; maxWeight: string; burstStrength: string }
> = {
  "3": {
    label: "3-ply single wall",
    short: "3-ply",
    desc: "Lightweight goods, e-commerce parcels, apparel.",
    maxWeight: "15 kg",
    burstStrength: "150–200 psi",
  },
  "5": {
    label: "5-ply double wall",
    short: "5-ply",
    desc: "Heavy-duty protection for FMCG, electronics, appliances.",
    maxWeight: "45 kg",
    burstStrength: "250–350 psi",
  },
  "7": {
    label: "7-ply triple wall",
    short: "7-ply",
    desc: "High compression for industrial export and auto components.",
    maxWeight: "120 kg",
    burstStrength: "450+ psi",
  },
  diecut: {
    label: "Custom die-cut",
    short: "Die-cut",
    desc: "Mailer boxes, display trays and custom inserts.",
    maxWeight: "Custom",
    burstStrength: "Variable",
  },
};

const PRINT_OPTIONS: { id: PrintKey; label: string; desc: string }[] = [
  { id: "plain", label: "Plain kraft", desc: "Unprinted" },
  { id: "one-color", label: "1-colour flexo", desc: "Logo + handling marks" },
  { id: "multi-color", label: "Multi-colour", desc: "Full brand artwork" },
];

/**
 * Eases a number toward its target so spec values never snap.
 * With easing off (reduced motion) the target passes straight through — no
 * animation frames, no state writes.
 */
function useEasedNumber(target: number, enabled: boolean) {
  const [value, setValue] = useState(target);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      setValue((current) => {
        const delta = target - current;
        if (Math.abs(delta) < 0.05) {
          frame.current = null;
          return target;
        }
        frame.current = requestAnimationFrame(tick);
        return current + delta * 0.18;
      });
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [target, enabled]);

  return enabled ? value : target;
}

function FieldLabel({ step, children }: { step: string; children: React.ReactNode }) {
  return (
    <span className="flex items-baseline gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
      <span className="tabular-nums text-copper">{step}</span>
      {children}
    </span>
  );
}

export function PackagingCalculator({
  phone = "+919945019279",
  whatsappMessage,
  className,
}: {
  phone?: string;
  whatsappMessage?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const [unit, setUnit] = useState<UnitType>("mm");
  const [length, setLength] = useState(400);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(250);
  const [ply, setPly] = useState<PlyKey>("5");
  const [printType, setPrintType] = useState<PrintKey>("one-color");
  const [quantity, setQuantity] = useState(1000);

  const toMm = (val: number, u: UnitType) =>
    u === "inches" ? val * 25.4 : u === "cm" ? val * 10 : val;

  const lenMm = toMm(length, unit);
  const widMm = toMm(width, unit);
  const hgtMm = toMm(height, unit);

  const volumeTarget = (lenMm * widMm * hgtMm) / 1_000_000;
  const volume = useEasedNumber(volumeTarget, !reduced);
  const volumeLabel = volume.toFixed(1);

  // Isometric preview proportions, damped so the box glides between shapes.
  const maxDim = Math.max(lenMm, widMm, hgtMm, 1);
  const targetW = Math.max(80, Math.min(220, (lenMm / maxDim) * 200));
  const targetH = Math.max(70, Math.min(180, (hgtMm / maxDim) * 160));
  const targetD = Math.max(60, Math.min(160, (widMm / maxDim) * 140));
  const previewW = useEasedNumber(targetW, !reduced);
  const previewH = useEasedNumber(targetH, !reduced);
  const previewD = useEasedNumber(targetD, !reduced);

  const changeUnit = (next: UnitType) => {
    if (next === unit) return;
    const divisor = next === "inches" ? 25.4 : next === "cm" ? 10 : 1;
    setLength(Math.round(lenMm / divisor));
    setWidth(Math.round(widMm / divisor));
    setHeight(Math.round(hgtMm / divisor));
    setUnit(next);
  };

  const whatsappHref = useMemo(() => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const intro =
      whatsappMessage?.trim() ||
      "Hi Sri Vigneshwara Packaging, I'd like a quote for the following:";
    const msg =
      `${intro}\n\n` +
      `Box type: ${PLY_DETAILS[ply].label}\n` +
      `Dimensions: ${length} × ${width} × ${height} ${unit} (L × W × H)\n` +
      `Volume: ~${volumeTarget.toFixed(1)} litres\n` +
      `Printing: ${PRINT_OPTIONS.find((p) => p.id === printType)?.label}\n` +
      `Quantity: ${quantity.toLocaleString("en-IN")} units`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }, [
    phone,
    whatsappMessage,
    ply,
    length,
    width,
    height,
    unit,
    volumeTarget,
    printType,
    quantity,
  ]);

  const dimensions: {
    label: string;
    axis: string;
    value: number;
    set: (n: number) => void;
  }[] = [
    { label: "Length", axis: "L", value: length, set: setLength },
    { label: "Width", axis: "W", value: width, set: setWidth },
    { label: "Height", axis: "H", value: height, set: setHeight },
  ];

  return (
    <div className={cn("grid min-w-0 grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12", className)}>
      {/* Heading + controls */}
      <div className="min-w-0 lg:col-span-7">
        <Eyebrow>Step 03 · Configure</Eyebrow>
        <h2 className="font-hero text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-text-primary">
          Build the exact box.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          Set the dimensions, construction and run size. The specification
          updates as you go, and goes straight to our team on WhatsApp.
        </p>

        <div className="mt-10 space-y-10">
          {/* 01 — Dimensions */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <FieldLabel step="01">Outer dimensions</FieldLabel>

              <div
                role="group"
                aria-label="Measurement unit"
                className="inline-flex items-center gap-1 rounded-[10px] border border-charcoal/10 p-1"
              >
                {(["mm", "cm", "inches"] as UnitType[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => changeUnit(u)}
                    aria-pressed={unit === u}
                    className={cn(
                      "min-h-[32px] rounded-[6px] px-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
                      unit === u
                        ? "bg-charcoal text-white"
                        : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {dimensions.map((d) => (
                <div
                  key={d.axis}
                  className="min-w-0 rounded-[10px] border border-charcoal/10 bg-white px-4 py-3 transition-colors duration-200 focus-within:border-copper"
                >
                  <label
                    htmlFor={`dim-${d.axis}`}
                    className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-text-muted"
                  >
                    {d.label} ({d.axis})
                  </label>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <input
                      id={`dim-${d.axis}`}
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={d.value}
                      onChange={(e) => d.set(Number(e.target.value) || 0)}
                      className="w-full min-w-0 bg-transparent font-hero text-2xl font-bold tabular-nums text-text-primary outline-none"
                    />
                    <span className="text-[0.7rem] font-medium text-text-muted">
                      {unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 02 — Construction */}
          <div className="border-t border-charcoal/10 pt-10">
            <FieldLabel step="02">Construction</FieldLabel>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.keys(PLY_DETAILS) as PlyKey[]).map((p) => {
                const info = PLY_DETAILS[p];
                const active = ply === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPly(p)}
                    aria-pressed={active}
                    className={cn(
                      "flex min-h-[68px] flex-col items-start justify-center rounded-[10px] border px-4 py-3 text-left transition-colors duration-[250ms]",
                      active
                        ? "border-copper bg-copper/[0.06]"
                        : "border-charcoal/10 bg-white hover:border-copper/45"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.85rem] font-semibold",
                        active ? "text-copper-dark" : "text-text-primary"
                      )}
                    >
                      {info.short}
                    </span>
                    <span className="mt-1 text-[0.7rem] text-text-muted">
                      to {info.maxWeight}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-text-secondary">
              {PLY_DETAILS[ply].desc}
            </p>
          </div>

          {/* 03 — Print */}
          <div className="border-t border-charcoal/10 pt-10">
            <FieldLabel step="03">Print finish</FieldLabel>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {PRINT_OPTIONS.map((opt) => {
                const active = printType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPrintType(opt.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex min-h-[64px] flex-col items-start justify-center rounded-[10px] border px-4 py-3 text-left transition-colors duration-[250ms]",
                      active
                        ? "border-copper bg-copper/[0.06]"
                        : "border-charcoal/10 bg-white hover:border-copper/45"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.85rem] font-semibold",
                        active ? "text-copper-dark" : "text-text-primary"
                      )}
                    >
                      {opt.label}
                    </span>
                    <span className="mt-0.5 text-[0.7rem] text-text-muted">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 04 — Quantity */}
          <div className="border-t border-charcoal/10 pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <FieldLabel step="04">Run size</FieldLabel>
              <output
                htmlFor="quantity"
                className="font-hero text-xl font-bold tabular-nums text-text-primary"
              >
                {quantity.toLocaleString("en-IN")}
                <span className="ml-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  boxes
                </span>
              </output>
            </div>
            <input
              id="quantity"
              type="range"
              min={500}
              max={25000}
              step={500}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              aria-label="Run size in boxes"
              className="mt-5 h-1 w-full cursor-pointer appearance-none rounded-full bg-charcoal/12 accent-[#B87333]"
            />
            <div className="mt-2 flex justify-between text-[0.65rem] font-medium tabular-nums text-text-muted">
              <span>500 min.</span>
              <span>25,000+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live specification */}
      <div className="min-w-0 lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-[14px] border border-charcoal/10 bg-alabaster p-6 md:p-7">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Live specification
            </p>

            {/* Isometric proportion preview */}
            <div className="mt-5 flex h-56 items-center justify-center rounded-[10px] border border-charcoal/10 bg-white">
              <svg
                width="280"
                height="200"
                className="max-w-full"
                viewBox="0 0 280 200"
                role="img"
                aria-label={`Proportional preview of a ${length} by ${width} by ${height} ${unit} box`}
              >
                <g transform="translate(140, 104)">
                  {/* Top */}
                  <polygon
                    points={`0,${-previewH / 2} ${previewW / 2},${-previewH / 2 - previewD / 4} 0,${-previewH / 2 - previewD / 2} ${-previewW / 2},${-previewH / 2 - previewD / 4}`}
                    fill="#EFE3D2"
                    stroke="#8B5A2B"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  {/* Left */}
                  <polygon
                    points={`${-previewW / 2},${-previewH / 2 - previewD / 4} 0,${-previewH / 2} 0,${previewH / 2} ${-previewW / 2},${previewH / 2 - previewD / 4}`}
                    fill="#C88A4E"
                    stroke="#8B5A2B"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                  {/* Right */}
                  <polygon
                    points={`0,${-previewH / 2} ${previewW / 2},${-previewH / 2 - previewD / 4} ${previewW / 2},${previewH / 2 - previewD / 4} 0,${previewH / 2}`}
                    fill="#D9AF83"
                    stroke="#8B5A2B"
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>

            <dl className="mt-6 divide-y divide-charcoal/8">
              {[
                {
                  term: "Construction",
                  value: PLY_DETAILS[ply].label,
                },
                {
                  term: "Dimensions",
                  value: `${length} × ${width} × ${height} ${unit}`,
                },
                { term: "Internal volume", value: `${volumeLabel} L` },
                { term: "Load capacity", value: PLY_DETAILS[ply].maxWeight },
                {
                  term: "Bursting strength",
                  value: PLY_DETAILS[ply].burstStrength,
                },
                {
                  term: "Print",
                  value:
                    PRINT_OPTIONS.find((p) => p.id === printType)?.label ?? "—",
                },
              ].map((row) => (
                <div
                  key={row.term}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-text-muted">
                    {row.term}
                  </dt>
                  <dd className="text-right text-[0.875rem] font-semibold tabular-nums text-text-primary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-copper px-6 text-[0.85rem] font-semibold text-white transition-colors duration-[250ms] hover:bg-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper"
            >
              Send this spec on WhatsApp
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
            </a>

            <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-text-muted">
              Opens WhatsApp with the configuration above already written out.
              Nothing is sent until you press send.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
