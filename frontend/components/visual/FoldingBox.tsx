"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * A corrugated box that folds from a flat net into a sealed carton, driven
 * entirely by one inherited CSS custom property: --fold (0 → 1).
 *
 *   --fold: 0                       --fold: 1
 *         ┌───┐                        ▄▄▄▄
 *     ┌───┼───┼───┐                   █    █
 *     └───┼───┼───┘        →           ▀▀▀▀
 *         └───┘
 *   flat net, scored              walls up, flaps closed
 *
 * Geometry is a hinged net, not a cube: every panel keeps its own
 * transform-origin on the edge it shares with its neighbour, so panels pivot
 * around real creases the way board actually does. The back panel is nested
 * inside the top panel, so it carries the top's rotation and folds a second
 * 90° on top of it — exactly how the far wall comes over on a real net.
 *
 * Walls fold across 0→0.55 and flaps across 0.45→1, so the sequence reads as
 * two stages rather than everything collapsing at once.
 *
 * Nothing here re-renders while scrubbing: GSAP writes --fold on an ancestor
 * and the compositor resolves every panel from it.
 */

const FLUTE =
  "repeating-linear-gradient(90deg, rgba(122,86,48,0) 0px, rgba(122,86,48,0) 6px, rgba(94,64,33,0.35) 6px, rgba(94,64,33,0.35) 7px)";
const FLUTE_H =
  "repeating-linear-gradient(0deg, rgba(122,86,48,0) 0px, rgba(122,86,48,0) 6px, rgba(94,64,33,0.32) 6px, rgba(94,64,33,0.32) 7px)";

const KRAFT_FACE = "linear-gradient(135deg, #d8b483 0%, #c4a574 45%, #a07d4e 100%)";
const KRAFT_DARK = "linear-gradient(135deg, #a07d4e 0%, #8a6a40 60%, #6f5333 100%)";
const KRAFT_TOP = "linear-gradient(135deg, #e6cfa6 0%, #cdab78 100%)";

/** Two-stage timing, expressed once and reused by every panel. */
const WALLS = "clamp(0, calc(var(--fold, 0) / 0.55), 1)";
const FLAPS = "clamp(0, calc((var(--fold, 0) - 0.45) / 0.55), 1)";

export function FoldingBox({
  size = 220,
  accent = "#B87333",
  className,
}: {
  size?: number;
  accent?: string;
  className?: string;
}) {
  const panel = (extra: CSSProperties): CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    backfaceVisibility: "hidden",
    boxShadow: "inset 0 0 60px rgba(0,0,0,0.18)",
    border: "1px solid rgba(94,64,33,0.28)",
    ...extra,
  });

  return (
    <div
      className={cn("pointer-events-none select-none", className)}
      style={{ perspective: 1400, width: size, height: size }}
      aria-hidden
    >
      {/*
        Camera. Tilts from a flat, plan-view read of the net toward a 3/4 view
        as the box forms, so the flat stage is legible as a net and the folded
        stage is legible as a box.
      */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform:
            "rotateX(calc(-8deg - var(--fold, 0) * 12deg)) " +
            "rotateY(calc(var(--fold, 0) * 32deg)) " +
            `translateZ(calc(var(--fold, 0) * ${-size * 0.16}px))`,
        }}
      >
        {/* FRONT — the base panel. Never moves; everything hinges off it. */}
        <div
          style={panel({
            backgroundImage: `${FLUTE}, ${KRAFT_FACE}`,
            transform: `translateZ(${size / 2}px)`,
          })}
        >
          {/* Seam tape, drawn on only once the carton is closed. */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 16,
              marginTop: -8,
              background: accent,
              opacity: `calc(${FLAPS} * 0.85)`,
              boxShadow: "0 0 24px rgba(0,0,0,0.25)",
            }}
          />
        </div>

        {/* RIGHT wall — hinges on the front's right crease. */}
        <div
          style={panel({
            backgroundImage: `${FLUTE_H}, ${KRAFT_DARK}`,
            left: size,
            transformOrigin: "left center",
            transform: `translateZ(${size / 2}px) rotateY(calc(${WALLS} * -90deg))`,
          })}
        />

        {/* LEFT wall */}
        <div
          style={panel({
            backgroundImage: `${FLUTE_H}, ${KRAFT_DARK}`,
            left: -size,
            transformOrigin: "right center",
            transform: `translateZ(${size / 2}px) rotateY(calc(${WALLS} * 90deg))`,
          })}
        />

        {/* BOTTOM flap */}
        <div
          style={panel({
            backgroundImage: `${FLUTE}, ${KRAFT_DARK}`,
            top: size,
            transformOrigin: "center top",
            transform: `translateZ(${size / 2}px) rotateX(calc(${FLAPS} * -90deg))`,
          })}
        />

        {/*
          TOP flap — carries the back panel as a child, so the back inherits
          this rotation and folds a further 90° from it.
        */}
        <div
          style={panel({
            backgroundImage: `repeating-linear-gradient(0deg, rgba(94,64,33,0.35) 0px, rgba(94,64,33,0.35) 1px, transparent 1px, transparent 7px), ${KRAFT_TOP}`,
            top: -size,
            transformOrigin: "center bottom",
            transformStyle: "preserve-3d",
            transform: `translateZ(${size / 2}px) rotateX(calc(${WALLS} * 90deg))`,
          })}
        >
          {/* BACK panel — hinged on the top flap's far crease. */}
          <div
            style={panel({
              backgroundImage: `${FLUTE}, ${KRAFT_FACE}`,
              top: -size,
              left: 0,
              transformOrigin: "center bottom",
              transform: `rotateX(calc(${WALLS} * 90deg))`,
            })}
          />
        </div>
      </div>
    </div>
  );
}
