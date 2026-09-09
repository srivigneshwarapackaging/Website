"use client";

import { useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const GOLD = {
  highlight: "#f0e0c4",
  light: "#e8d5b7",
  mid: "#c4a574",
  dark: "#a07d4e",
  shadow: "#7a5c38",
  edge: "#5c4528",
} as const;

/**
 * Isometric folded carton corner — S / V / P on left, top, and right faces.
 */
export function BrandMark({
  size = 36,
  className,
  gradientId,
}: {
  size?: number;
  className?: string;
  gradientId?: string;
}) {
  const autoId = useId();
  const base = gradientId || `brand-${autoId}`;
  const gTop = `${base}-top`;
  const gLeft = `${base}-left`;
  const gRight = `${base}-right`;

  const letterStyle = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontWeight: 700,
    fill: "#1c1917",
  } as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      shapeRendering="geometricPrecision"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={gTop} x1="12" y1="6" x2="36" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GOLD.highlight} />
          <stop offset="50%" stopColor={GOLD.light} />
          <stop offset="100%" stopColor={GOLD.mid} />
        </linearGradient>
        <linearGradient id={gLeft} x1="6" y1="16" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GOLD.light} />
          <stop offset="55%" stopColor={GOLD.mid} />
          <stop offset="100%" stopColor={GOLD.dark} />
        </linearGradient>
        <linearGradient id={gRight} x1="42" y1="16" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GOLD.mid} />
          <stop offset="55%" stopColor={GOLD.dark} />
          <stop offset="100%" stopColor={GOLD.shadow} />
        </linearGradient>
      </defs>

      {/* Top face */}
      <path
        d="M24 7.5 L37 14.25 L24 15.75 L11 14.25 Z"
        fill={`url(#${gTop})`}
        stroke={GOLD.edge}
        strokeWidth="0.35"
        strokeOpacity="0.25"
        strokeLinejoin="round"
      />
      {/* Left face */}
      <path
        d="M11 14.25 L24 15.75 L24 42.5 L7.5 35.25 Z"
        fill={`url(#${gLeft})`}
        stroke={GOLD.edge}
        strokeWidth="0.4"
        strokeOpacity="0.3"
        strokeLinejoin="round"
      />
      {/* Right face */}
      <path
        d="M37 14.25 L24 15.75 L24 42.5 L40.5 35.25 Z"
        fill={`url(#${gRight})`}
        stroke={GOLD.edge}
        strokeWidth="0.4"
        strokeOpacity="0.3"
        strokeLinejoin="round"
      />

      {/* Fold creases from corner apex */}
      <path
        d="M11 14.25 L24 15.75 L37 14.25 M24 15.75 L24 42.5"
        stroke={GOLD.highlight}
        strokeWidth="0.45"
        strokeOpacity="0.4"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 35.25 L24 42.5 L40.5 35.25"
        stroke={GOLD.edge}
        strokeWidth="0.45"
        strokeOpacity="0.35"
        strokeLinejoin="round"
      />

      {/* SVP — centered on each face */}
      <text
        x="24"
        y="12.9"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9.5"
        {...letterStyle}
      >
        V
      </text>
      <text
        x="16.6"
        y="27"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9.5"
        transform="rotate(-27 16.6 27)"
        {...letterStyle}
      >
        S
      </text>
      <text
        x="31.4"
        y="27"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9.5"
        transform="rotate(27 31.4 27)"
        {...letterStyle}
      >
        P
      </text>
    </svg>
  );
}

function BrandWordmark({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-body font-bold uppercase tracking-[0.22em] text-kraft",
          compact ? "text-[8px]" : "text-[9px] md:text-[10px]"
        )}
      >
        Sri Vigneshwara
      </span>
      <span
        className={cn(
          "mt-1 font-body font-semibold uppercase tracking-[0.38em] text-kraft-light/90",
          compact ? "text-[7px]" : "text-[8px] md:text-[9px]"
        )}
      >
        Packaging
      </span>
      <span
        aria-hidden
        className={cn(
          "mt-1.5 h-px bg-emerald-800/80",
          compact ? "w-10" : "w-12 md:w-14"
        )}
      />
    </span>
  );
}

export function BrandLogo({
  logoUrl,
  variant = "header",
  className,
  onDark = false,
}: {
  logoUrl?: string;
  variant?: "header" | "footer" | "mark";
  className?: string;
  onDark?: boolean;
}) {
  if (logoUrl?.trim()) {
    const h = variant === "footer" ? 40 : variant === "mark" ? 32 : 36;
    return (
      <Image
        src={logoUrl}
        alt="Sri Vigneshwara Packaging"
        width={variant === "footer" ? 180 : 140}
        height={h}
        className={cn("h-auto w-auto object-contain", className)}
        style={{ maxHeight: h }}
        priority={variant === "header"}
      />
    );
  }

  if (variant === "mark") {
    return <BrandMark size={32} className={className} />;
  }

  const markSize = variant === "footer" ? 44 : 38;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3.5",
        onDark && "text-kraft-light",
        className
      )}
    >
      <BrandMark size={markSize} />
      <BrandWordmark compact={variant === "header"} />
    </span>
  );
}
