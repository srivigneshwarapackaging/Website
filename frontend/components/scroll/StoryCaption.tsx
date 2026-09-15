"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/design-system/Eyebrow";

/**
 * The beat text for a story scene.
 *
 * Lines rise out of an overflow-hidden mask, one after another. Only the active
 * beat is mounted, so swapping beats crossfades the caption rather than
 * rebuilding the whole scene.
 *
 * §42: this is discrete state (which beat is showing), so Framer Motion owns
 * it. GSAP never touches these nodes — it only decides *which* beat is active,
 * via the `beat` index ScrollScene hands down.
 */
export function StoryCaption({
  step,
  title,
  body,
  align = "left",
  className,
}: {
  /** Small index label, e.g. "02". */
  step?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const reduced = useReducedMotion();

  const lines = title.split(/(?<=\.)\s+|\s*—\s*/).filter(Boolean);
  const rise = reduced
    ? { initial: false as const, animate: { y: 0, opacity: 1 } }
    : {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "-40%", opacity: 0 },
      };

  return (
    <div
      className={cn(
        "max-w-xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {step && <Eyebrow>{step}</Eyebrow>}

      <h2 className="font-hero text-[clamp(1.75rem,3.4vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em] text-text-primary">
        {lines.map((line, index) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              {...rise}
              transition={{
                duration: 0.62,
                delay: reduced ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      {body && (
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: reduced ? 0 : 0.18 + lines.length * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg"
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}

/**
 * Crossfades between beats. Keyed on `beat` so each caption mounts and unmounts
 * cleanly, which is what drives the line masks above.
 */
export function StoryCaptionSwitch({
  beat,
  children,
  className,
}: {
  beat: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={beat}>{children}</motion.div>
      </AnimatePresence>
    </div>
  );
}
