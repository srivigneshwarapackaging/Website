"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent } from "@/shared/types/content-types";
import { Button } from "@/components/design-system/Button";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { scrollToSection } from "@/lib/scroll-to";
import Image from "next/image";

/**
 * Hero — §11 / §12 / §13
 * Light background, 55/45 split, one dominant box with small engineering
 * callouts. Load sequence: eyebrow → headline (line by line) → paragraph →
 * CTAs → box. Trust metrics live in their own section directly below (§14).
 */

function splitHeadline(title: string) {
  const trimmed = title.trim();
  const dot = trimmed.indexOf(". ");
  if (dot > 0) {
    return [trimmed.slice(0, dot + 1), trimmed.slice(dot + 2)];
  }
  // "Packaging made to perform." → two balanced lines rather than one long one.
  const words = trimmed.split(" ");
  if (words.length > 3) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
  }
  return [trimmed, ""];
}

const CALLOUTS = ["Protect", "Perform", "Progress"];

export function HeroSection({ data }: { data: HeroContent }) {
  const reduced = useReducedMotion();
  const [line1, line2] = splitHeadline(data.title);

  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="hero"
      className="relative isolate min-h-[min(780px,100svh)] scroll-mt-24 overflow-hidden bg-[#f5f1e8] pt-[104px] pb-16 md:pt-[136px] lg:pt-[152px]"
    >
      <Image src={data.imageUrl || "/materials/hero-kraft-box.png"} alt="Unbranded corrugated box framed by kraft paper" fill priority sizes="100vw" className="pointer-events-none absolute inset-0 -z-10 object-cover object-[66%_center]" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-[#f5f1e8]/45 md:w-[53%]" />
      <div className="mx-auto flex min-h-[calc(min(780px,100svh)-104px)] w-full max-w-[1400px] items-center px-6 md:px-8 lg:min-h-[calc(min(780px,100svh)-152px)] lg:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <motion.p
              {...fade(0.08)}
              className="mb-6 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper"
            >
              <span aria-hidden className="h-px w-6 bg-copper" />
              {data.eyebrow}
            </motion.p>

            <h1 className="font-body text-[clamp(3rem,6vw,6.6rem)] font-normal leading-[0.91] tracking-[-0.065em] text-[#191817]">
              {reduced ? (
                <>
                  <span className="block">{line1}</span>
                  {line2 && <span className="block">{line2}</span>}
                </>
              ) : (
                <>
                  <SplitHeadline text={line1} delay={0.16} className="block" active />
                  {line2 && (
                    <SplitHeadline
                      text={line2}
                      delay={0.3}
                      className="block"
                      active
                    />
                  )}
                </>
              )}
            </h1>

            <motion.p
              {...fade(0.46)}
              className="mt-7 max-w-md text-[1rem] leading-[1.7] text-[#4f4a45]"
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              {...fade(0.58)}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Button
                variant="primary"
                arrow
                onClick={() => scrollToSection("contact")}
                className="min-h-[48px] rounded-none bg-[#a96b3d] px-7 text-white hover:bg-[#8f5a32]"
              >
                {data.ctaPrimary || "Get a quote"}
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("products")}
                className="min-h-[48px] rounded-none border-0 border-b border-[#191817]/50 px-2 text-[#191817] hover:border-[#a96b3d] hover:text-[#a96b3d]"
              >
                {data.ctaSecondary || "Explore products"}
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
      <motion.ul {...fade(0.75)} className="absolute bottom-7 left-6 flex gap-5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[#534d47] md:bottom-9 md:left-8 lg:left-16">
        {CALLOUTS.map((callout, index) => <li key={callout} className="flex items-center gap-5"><span>{callout}</span>{index < CALLOUTS.length - 1 && <span aria-hidden className="h-4 w-px bg-[#191817]/30" />}</li>)}
      </motion.ul>
    </section>
  );
}
