"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IntroRollingText } from "./IntroRollingText";
import { IntroLockup } from "./IntroLockup";

type Phase = "pending" | "rolling" | "lockup" | "exiting" | "done";

const TIMING = {
  rolling: 2000,
  lockup: 2000,
  reveal: 1200,
  reducedLockup: 2000,
} as const;

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export function IntroLoader({
  name,
  tagline,
  onComplete,
}: {
  name: string;
  tagline: string;
  onComplete: (options: { instant?: boolean }) => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("pending");
  const [exiting, setExiting] = useState(false);
  const [skipEnabled, setSkipEnabled] = useState(false);
  const timers = useRef<number[]>([]);
  const completed = useRef(false);
  const revealed = useRef(false);

  const revealHero = useCallback(
    (instant = false) => {
      if (revealed.current) return;
      revealed.current = true;
      onComplete({ instant });
    },
    [onComplete]
  );

  const finish = useCallback(
    (instant = false) => {
      if (completed.current) return;
      completed.current = true;
      setPhase("done");
      revealHero(instant);
    },
    [revealHero]
  );

  const startExit = useCallback(() => {
    if (completed.current || exiting) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    revealHero();
    setExiting(true);
    setPhase("exiting");
  }, [exiting, revealHero]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    const seen = !!sessionStorage.getItem("intro-seen");

    if (seen) {
      finish(true);
      return;
    }

    sessionStorage.setItem("intro-seen", "1");
    document.body.style.overflow = "hidden";

    if (reduced) {
      setPhase("lockup");
      schedule(() => startExit(), TIMING.reducedLockup);
    } else {
      setPhase("rolling");
      schedule(() => setPhase("lockup"), TIMING.rolling);
      schedule(() => startExit(), TIMING.rolling + TIMING.lockup);
    }

    schedule(() => setSkipEnabled(true), 800);

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [reduced, finish, schedule, startExit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") startExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [startExit]);

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  if (phase === "pending" || phase === "done") return null;

  const showRolling = phase === "rolling" || phase === "lockup" || phase === "exiting";
  const showLockup = phase === "lockup" || phase === "exiting";
  const dimRolling = phase === "lockup" || phase === "exiting";

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-charcoal"
      role="dialog"
      aria-label="Site introduction"
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{
        duration: reduced ? 0.5 : TIMING.reveal / 1000,
        ease: REVEAL_EASE,
      }}
      onAnimationComplete={() => {
        if (exiting) finish();
      }}
      onClick={() => skipEnabled && !exiting && startExit()}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(196,165,116,0.55) 11px, rgba(196,165,116,0.55) 12px)",
        }}
      />

      {showRolling && (
        <IntroRollingText dimmed={dimRolling} exiting={exiting} />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <IntroLockup
          name={name}
          tagline={tagline}
          visible={showLockup}
          exiting={exiting}
        />
      </div>

      {skipEnabled && !exiting && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            startExit();
          }}
          className="absolute bottom-8 right-8 z-20 text-[10px] font-black uppercase tracking-[0.3em] text-kraft-light/60 transition-colors hover:text-kraft-light"
        >
          Skip
        </button>
      )}
    </motion.div>
  );
}
