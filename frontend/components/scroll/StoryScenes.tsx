"use client";

import type { CSSProperties } from "react";
import { ScrollScene } from "@/components/scroll/ScrollScene";
import { ParallaxPlate } from "@/components/scroll/ParallaxPlate";
import { StoryCaption, StoryCaptionSwitch } from "@/components/scroll/StoryCaption";
import { FoldingBox } from "@/components/visual/FoldingBox";
import { Container } from "@/components/design-system/Container";
import type { ProcessContent } from "@/shared/types/content-types";

/**
 * The story: how a box gets made.
 *
 * Four scenes — raw material, corrugation, the fold, print & ship — each pinned
 * on desktop while scroll scrubs it. Captions come from the CMS process steps,
 * so the narrative and the process are the same content, edited in one place.
 *
 * Every visual here is procedural CSS/SVG. No image plates to load, nothing
 * that can 404, and the whole story stays honest to §27: no invented figures.
 */

/** Reads the Nth CMS process step, falling back to the scene's own copy. */
function step(steps: ProcessContent["steps"], index: number) {
  return steps[index] ?? null;
}

/* ------------------------------------------------------------------ *
 * S1 — Raw material
 * ------------------------------------------------------------------ */

export function S1RawMaterial({ steps }: { steps: ProcessContent["steps"] }) {
  const s = step(steps, 0);

  return (
    <ScrollScene id="story-material" beats={1} heightVh={220} className="bg-white">
      {() => (
        <>
          {/* Background: kraft field drifting up behind everything. */}
          <ParallaxPlate
            depth={-0.5}
            travel={26}
            zoom={0.08}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, #FBFBF9 0%, #F0E6D6 55%, #E4D2B8 100%)",
              }}
            />
          </ParallaxPlate>

          {/* Mid: the sheet itself, tilting toward the reader. */}
          <ParallaxPlate
            depth={0.35}
            travel={14}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              className="h-[52vh] w-[74vw] max-w-[900px] rounded-[4px] border border-[rgba(94,64,33,0.25)] shadow-2xl"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(122,86,48,0) 0px, rgba(122,86,48,0) 7px, rgba(94,64,33,0.16) 7px, rgba(94,64,33,0.16) 8px), linear-gradient(135deg, #d8b483 0%, #c4a574 45%, #a07d4e 100%)",
                transform:
                  "perspective(1200px) rotateX(calc(46deg - var(--scene-progress, 0) * 34deg))",
              }}
            />
          </ParallaxPlate>

          {/* Foreground: the caption. */}
          <Container className="relative z-10">
            <ParallaxPlate depth={0.9} travel={10} fade>
              <StoryCaption
                step={s ? "01" : undefined}
                title={s?.title ?? "It starts as paper."}
                body={
                  s?.description ??
                  "Kraft liner and fluting medium, selected by grade before anything is made."
                }
              />
            </ParallaxPlate>
          </Container>
        </>
      )}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ *
 * S2 — Corrugation
 * ------------------------------------------------------------------ */

export function S2Corrugation({ steps }: { steps: ProcessContent["steps"] }) {
  const s = step(steps, 1);

  return (
    <ScrollScene
      id="story-corrugation"
      beats={1}
      heightVh={240}
      className="bg-alabaster"
    >
      {() => (
        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ParallaxPlate depth={0.6} travel={12} fade className="lg:col-span-5">
              <StoryCaption
                step={s ? "02" : undefined}
                title={s?.title ?? "Then it becomes structure."}
                body={
                  s?.description ??
                  "Two liners bonded either side of a fluted medium. The flute is what carries the load."
                }
              />
            </ParallaxPlate>

            {/* The board assembling: liner, medium, liner. */}
            <ParallaxPlate
              depth={-0.25}
              travel={16}
              className="lg:col-span-7"
            >
              <svg
                viewBox="0 0 520 260"
                className="w-full"
                role="img"
                aria-label="A fluted medium bonded between two kraft liners"
              >
                {/* Top liner — slides down into place. */}
                <g
                  style={{
                    transform:
                      "translateY(calc(var(--scene-progress, 0) * 46px - 46px))",
                  }}
                >
                  <rect
                    x="20"
                    y="46"
                    width="480"
                    height="16"
                    rx="2"
                    fill="#C4A574"
                    stroke="#8B5A2B"
                    strokeWidth="1.5"
                  />
                </g>

                {/* Fluting — drawn on as the scene scrubs. */}
                <path
                  d={fluteWave()}
                  fill="none"
                  stroke="#8B5A2B"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: "calc(1 - var(--scene-progress, 0))",
                  }}
                />

                {/* Bottom liner — slides up. */}
                <g
                  style={{
                    transform:
                      "translateY(calc(46px - var(--scene-progress, 0) * 46px))",
                  }}
                >
                  <rect
                    x="20"
                    y="198"
                    width="480"
                    height="16"
                    rx="2"
                    fill="#C4A574"
                    stroke="#8B5A2B"
                    strokeWidth="1.5"
                  />
                </g>

                {/* Callout, once the board is together. */}
                <text
                  x="20"
                  y="242"
                  className="font-body"
                  fontSize="11"
                  letterSpacing="1.6"
                  fill="#6B6B6B"
                  style={{ opacity: "calc(var(--scene-progress, 0) * 1.4 - 0.4)" }}
                >
                  LINER · FLUTING MEDIUM · LINER
                </text>
              </svg>
            </ParallaxPlate>
          </div>
        </Container>
      )}
    </ScrollScene>
  );
}

/** One continuous flute wave across the board. */
function fluteWave() {
  const left = 20;
  const right = 500;
  const midY = 130;
  const amp = 30;
  const period = 40;

  let d = `M ${left} ${midY}`;
  for (let x = left; x < right; x += period) {
    d += ` q ${period / 4} ${-amp} ${period / 2} 0`;
    d += ` q ${period / 4} ${amp} ${period / 2} 0`;
  }
  return d;
}

/* ------------------------------------------------------------------ *
 * S3 — The fold (signature)
 * ------------------------------------------------------------------ */

export function S3Fold({ steps }: { steps: ProcessContent["steps"] }) {
  const s = step(steps, 2);

  return (
    <ScrollScene id="story-fold" beats={1} heightVh={320} className="bg-white">
      {() => (
        <>
          <ParallaxPlate
            depth={-0.4}
            travel={20}
            className="pointer-events-none absolute inset-0"
          >
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,#FBFBF9_0%,#F4F4F2_60%,#EFE7DA_100%)]" />
          </ParallaxPlate>

          <Container className="relative z-10">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <ParallaxPlate depth={0.7} travel={9} fade className="lg:col-span-4">
                <StoryCaption
                  step={s ? "03" : undefined}
                  title={s?.title ?? "And then it becomes a box."}
                  body={
                    s?.description ??
                    "Scored, slotted and folded to the dimensions your product actually needs."
                  }
                />
              </ParallaxPlate>

              {/*
                The fold. --fold tracks scene progress but is its own property,
                so the box can be re-timed against the caption without touching
                the scene.
              */}
              <div
                className="flex items-center justify-center lg:col-span-8"
                style={
                  { "--fold": "var(--scene-progress, 0)" } as CSSProperties
                }
              >
                <FoldingBox size={200} accent="#B87333" />
              </div>
            </div>
          </Container>
        </>
      )}
    </ScrollScene>
  );
}

/* ------------------------------------------------------------------ *
 * S4 — Print & ship
 * ------------------------------------------------------------------ */

export function S4PrintShip({ steps }: { steps: ProcessContent["steps"] }) {
  const s = step(steps, 3);
  const last = step(steps, 4);

  return (
    <ScrollScene
      id="story-ship"
      beats={2}
      heightVh={260}
      className="bg-alabaster"
    >
      {({ beat }) => (
        <>
          <ParallaxPlate
            depth={-0.35}
            travel={18}
            className="pointer-events-none absolute inset-0"
          >
            <div className="h-full w-full bg-[linear-gradient(200deg,#FBFBF9_0%,#F4F4F2_70%,#EAE3D6_100%)]" />
          </ParallaxPlate>

          <Container className="relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <ParallaxPlate depth={0.65} travel={10} fade className="lg:col-span-5">
                <StoryCaptionSwitch beat={beat}>
                  {beat === 0 ? (
                    <StoryCaption
                      step={s ? "04" : undefined}
                      title={s?.title ?? "Printed to your brand."}
                      body={
                        s?.description ??
                        "Flexo printing in one colour or full artwork, plus the handling marks the box needs."
                      }
                    />
                  ) : (
                    <StoryCaption
                      step={last ? "05" : undefined}
                      title={last?.title ?? "Then it ships."}
                      body={
                        last?.description ??
                        "Checked against specification, baled and dispatched."
                      }
                    />
                  )}
                </StoryCaptionSwitch>
              </ParallaxPlate>

              {/* The finished carton, travelling out of frame at the end. */}
              <div className="lg:col-span-7">
                <div
                  className="flex items-center justify-center"
                  style={{
                    transform:
                      "translate3d(calc(clamp(0, calc((var(--scene-progress, 0) - 0.6) / 0.4), 1) * 26vw), 0, 0)",
                    opacity:
                      "calc(1 - clamp(0, calc((var(--scene-progress, 0) - 0.75) / 0.25), 1) * 0.85)",
                  }}
                >
                  <div style={{ "--fold": 1 } as CSSProperties}>
                    <FoldingBox size={190} accent="#B87333" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </>
      )}
    </ScrollScene>
  );
}
