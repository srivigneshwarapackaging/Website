"use client";

import type { ProcessIcon } from "@/shared/types/content-types";

const KRAFT = "#c4a574";
const KRAFT_LIGHT = "#e8d5b7";
const KRAFT_DARK = "#9a7b4f";

function StageFrame({
  children,
  label,
  size,
  compact,
}: {
  children: React.ReactNode;
  label: string;
  size: number;
  compact?: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {!compact && (
        <div
          className="absolute inset-[8%] rounded-[2rem] opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${KRAFT}55 0%, transparent 70%)` }}
        />
      )}
      <div
        className={
          compact
            ? "relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            : "relative h-full w-full rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-kraft/10"
        }
      >
        {!compact && (
          <span className="absolute left-5 top-4 text-[9px] font-black uppercase tracking-[0.35em] text-kraft-light/70">
            {label}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

/** Kraft sheets + parent roll — Material Selection */
function MaterialVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center pt-8">
      <svg viewBox="0 0 320 200" className="h-auto w-full max-w-[280px]" aria-hidden>
        {/* parent roll — isometric cylinder */}
        <ellipse cx="72" cy="118" rx="34" ry="12" fill="#6f5333" opacity="0.85" />
        <rect x="38" y="52" width="68" height="66" rx="4" fill="url(#rollBody)" />
        <ellipse cx="72" cy="52" rx="34" ry="12" fill={KRAFT_LIGHT} />
        <ellipse cx="72" cy="52" rx="22" ry="7" fill="none" stroke={KRAFT_DARK} strokeWidth="1.5" opacity="0.55" />
        <ellipse cx="72" cy="52" rx="12" ry="4" fill="none" stroke={KRAFT_DARK} strokeWidth="1" opacity="0.4" />
        <path
          d="M38 64 C48 58 58 55 72 55 C86 55 96 58 106 64"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.12"
        />

        {/* stacked flat sheets — material being selected */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${128 + i * 10}, ${58 + i * 14})`}>
            <rect
              x="0"
              y="0"
              width="148"
              height="18"
              rx="2"
              fill={i === 2 ? KRAFT_LIGHT : i === 1 ? "#d8b483" : "#cdb088"}
              opacity={0.55 + i * 0.18}
              stroke={i === 2 ? accent : "rgba(255,255,255,0.12)"}
              strokeWidth={i === 2 ? 1.5 : 1}
            />
            <line
              x1="8"
              y1="9"
              x2="140"
              y2="9"
              stroke="rgba(94,64,33,0.25)"
              strokeWidth="0.75"
              strokeDasharray="2 3"
            />
          </g>
        ))}

        {/* selection indicator on top sheet */}
        <rect
          x="148"
          y="86"
          width="148"
          height="18"
          rx="2"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="animate-process-flute"
          opacity="0.9"
        />
        <circle cx="162" cy="95" r="5" fill={accent} opacity="0.95" />
        <path d="M160 95 L162.5 97.5 L166 93" stroke="#1c1917" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* fiber texture on selected sheet */}
        <rect x="148" y="86" width="148" height="18" rx="2" fill="url(#fiberTex)" opacity="0.35" />

        {/* spec callouts */}
        <text x="24" y="36" fill={KRAFT_LIGHT} fontSize="9" fontWeight="700" opacity="0.75">
          PARENT ROLL
        </text>
        <text x="148" y="36" fill={accent} fontSize="9" fontWeight="700">
          SELECTED SHEET
        </text>
        <text x="148" y="128" fill={KRAFT_LIGHT} fontSize="8.5" opacity="0.65">
          180 GSM · Kraft liner
        </text>
        <text x="148" y="142" fill={KRAFT_LIGHT} fontSize="8.5" opacity="0.65">
          40% recycled fiber
        </text>

        {/* dimension ticks */}
        <line x1="148" y1="152" x2="296" y2="152" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="148" y1="148" x2="148" y2="156" stroke={accent} strokeWidth="1" opacity="0.7" />
        <line x1="296" y1="148" x2="296" y2="156" stroke={accent} strokeWidth="1" opacity="0.7" />

        <defs>
          <linearGradient id="rollBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={KRAFT_LIGHT} />
            <stop offset="55%" stopColor={KRAFT} />
            <stop offset="100%" stopColor={KRAFT_DARK} />
          </linearGradient>
          <pattern id="fiberTex" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(94,64,33,0.45)" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}

/** Flute cross-section — Corrugation */
function CorrugationVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center pt-8">
      <svg viewBox="0 0 320 180" className="h-auto w-full max-w-[280px]" aria-hidden>
        <rect x="20" y="28" width="280" height="18" rx="4" fill={KRAFT_LIGHT} opacity="0.9" />
        <rect x="20" y="134" width="280" height="18" rx="4" fill={KRAFT_LIGHT} opacity="0.9" />
        <path
          d="M20 72 L35 46 L50 72 L65 46 L80 72 L95 46 L110 72 L125 46 L140 72 L155 46 L170 72 L185 46 L200 72 L215 46 L230 72 L245 46 L260 72 L275 46 L290 72 L300 72 L300 98 L285 124 L270 98 L255 124 L240 98 L225 124 L210 98 L195 124 L180 98 L165 124 L150 98 L135 124 L120 98 L105 124 L90 98 L75 124 L60 98 L45 124 L30 98 L20 98 Z"
          fill={KRAFT_DARK}
          opacity="0.95"
          className="animate-process-flute"
        />
        <path
          d="M20 72 L300 72"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.8"
        />
        <path
          d="M20 98 L300 98"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.8"
        />
        <text x="24" y="22" fill={KRAFT_LIGHT} fontSize="9" fontWeight="700" opacity="0.7">
          TOP LINER
        </text>
        <text x="24" y="92" fill={accent} fontSize="9" fontWeight="700">
          FLUTE MEDIUM
        </text>
        <text x="24" y="168" fill={KRAFT_LIGHT} fontSize="9" fontWeight="700" opacity="0.7">
          BOTTOM LINER
        </text>
      </svg>
    </div>
  );
}

/** Print rollers + ink pass — Printing & Coating */
function PrintingVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center pt-8">
      <div className="relative w-full max-w-[260px]">
        <div className="mb-3 flex justify-center gap-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-14 w-14 rounded-full border border-white/10 shadow-lg animate-process-roller"
              style={{
                animationDelay: `${i * 0.15}s`,
                background: `linear-gradient(135deg, ${i === 0 ? "#4a4a4a" : accent}, #1a1a1a)`,
              }}
            >
              <div className="mx-auto mt-3 h-8 w-8 rounded-full border border-white/10 opacity-40" />
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#d8b483] to-[#a07d4e] shadow-lg">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(94,64,33,0.4) 4px, rgba(94,64,33,0.4) 5px)",
            }}
          />
          <div className="relative h-28 p-4">
            <div
              className="absolute inset-x-4 top-1/2 h-10 -translate-y-1/2 rounded-md opacity-90 animate-process-ink"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, ${KRAFT_LIGHT}, ${accent}, transparent)`,
              }}
            />
            <div className="absolute bottom-3 left-4 right-4 flex gap-2">
              {[accent, KRAFT_DARK, "#4ade80", "#2563eb"].map((c, i) => (
                <span key={i} className="h-2 flex-1 rounded-full opacity-80" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Inspection frame + pass stamp — Quality Control */
function QualityVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center pt-8">
      <div className="relative w-full max-w-[240px]">
        <div className="absolute -inset-3 rounded-2xl border border-dashed border-kraft/30" />
        <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-kraft-light" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-kraft-light" />
        <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-kraft-light" />
        <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-kraft-light" />

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-charcoal-soft/80 p-5">
          <div className="animate-process-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-kraft-light to-transparent" />
          <div className="space-y-3">
            {["Burst strength", "Moisture", "Print register"].map((item, i) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-charcoal animate-process-check"
                  style={{
                    background: accent,
                    animationDelay: `${0.2 + i * 0.25}s`,
                  }}
                >
                  ✓
                </span>
                <span className="text-[11px] font-medium tracking-wide text-stone-300">{item}</span>
              </div>
            ))}
          </div>
          <div
            className="pointer-events-none absolute bottom-4 right-4 rotate-[-12deg] rounded-md border-2 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] animate-process-stamp"
            style={{ borderColor: accent, color: accent }}
          >
            Passed
          </div>
        </div>
      </div>
    </div>
  );
}

const STAGE_LABELS: Record<ProcessIcon, string> = {
  package: "Material spec",
  factory: "Flute forming",
  print: "Print pass",
  check: "Inspection",
};

const STAGE_VISUALS: Record<
  ProcessIcon,
  React.ComponentType<{ accent: string }>
> = {
  package: MaterialVisual,
  factory: CorrugationVisual,
  print: PrintingVisual,
  check: QualityVisual,
};

export function ProcessStageVisual({
  icon = "package",
  accent = KRAFT,
  size = 280,
  compact = false,
}: {
  icon?: string;
  accent?: string;
  size?: number;
  compact?: boolean;
}) {
  const key = (icon in STAGE_VISUALS ? icon : "package") as ProcessIcon;
  const Visual = STAGE_VISUALS[key];

  return (
    <StageFrame label={STAGE_LABELS[key]} size={size} compact={compact}>
      <Visual accent={accent} />
    </StageFrame>
  );
}
