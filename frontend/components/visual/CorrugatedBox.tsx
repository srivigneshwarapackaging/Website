"use client";

import { CSSProperties } from "react";

const FLUTE =
  "repeating-linear-gradient(90deg, rgba(122,86,48,0.0) 0px, rgba(122,86,48,0.0) 6px, rgba(94,64,33,0.35) 6px, rgba(94,64,33,0.35) 7px)";

const KRAFT_FACE = "linear-gradient(135deg, #d8b483 0%, #c4a574 45%, #a07d4e 100%)";
const KRAFT_DARK = "linear-gradient(135deg, #a07d4e 0%, #8a6a40 60%, #6f5333 100%)";
const KRAFT_TOP = "linear-gradient(135deg, #e6cfa6 0%, #cdab78 100%)";

/**
 * A procedural corrugated carton rendered in pure CSS 3D — idle spin + float,
 * with a kraft gradient and flute texturing. `accent` tints the seam tape per
 * manufacturing stage. No WebGL, GPU-cheap, disabled under reduced motion.
 */
export function CorrugatedBox({
  size = 200,
  accent = "#c4a574",
}: {
  size?: number;
  accent?: string;
}) {
  const half = size / 2;

  const face = (style: CSSProperties): CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    left: "50%",
    top: "50%",
    marginLeft: -half,
    marginTop: -half,
    backfaceVisibility: "hidden",
    boxShadow: "inset 0 0 60px rgba(0,0,0,0.25)",
    ...style,
  });

  return (
    <div
      className="pointer-events-none select-none"
      style={{ perspective: 1000, width: size, height: size }}
      aria-hidden
    >
      <div
        className="animate-box-spin"
        style={{
          position: "relative",
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="animate-box-float" style={{ transformStyle: "preserve-3d" }}>
          {/* front */}
          <div
            style={face({
              background: KRAFT_FACE,
              backgroundImage: `${FLUTE}, ${KRAFT_FACE}`,
              transform: `translateZ(${half}px)`,
            })}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 18,
                marginTop: -9,
                background: accent,
                opacity: 0.85,
                boxShadow: "0 0 24px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          {/* back */}
          <div style={face({ backgroundImage: `${FLUTE}, ${KRAFT_FACE}`, transform: `rotateY(180deg) translateZ(${half}px)` })} />
          {/* right */}
          <div style={face({ backgroundImage: KRAFT_DARK, transform: `rotateY(90deg) translateZ(${half}px)` })} />
          {/* left */}
          <div style={face({ backgroundImage: KRAFT_DARK, transform: `rotateY(-90deg) translateZ(${half}px)` })} />
          {/* top (open flaps look) */}
          <div
            style={face({
              backgroundImage: `repeating-linear-gradient(0deg, rgba(94,64,33,0.35) 0px, rgba(94,64,33,0.35) 1px, transparent 1px, transparent 7px), ${KRAFT_TOP}`,
              transform: `rotateX(90deg) translateZ(${half}px)`,
            })}
          />
          {/* bottom */}
          <div style={face({ backgroundImage: KRAFT_DARK, transform: `rotateX(-90deg) translateZ(${half}px)` })} />
        </div>
      </div>
    </div>
  );
}
