"use client";

import { motion } from "framer-motion";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { IntroMonogram } from "./IntroMonogram";

export function IntroLockup({
  name,
  tagline,
  visible,
  exiting,
}: {
  name: string;
  tagline: string;
  visible: boolean;
  exiting?: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center px-6 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: exiting ? 0 : 1,
        y: exiting ? -28 : 0,
        scale: exiting ? 1.04 : 1,
        filter: exiting ? "blur(8px)" : "blur(0px)",
      }}
      transition={{
        duration: exiting ? 0.55 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-10 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(196,165,116,0.18) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-6 text-kraft"
      >
        <IntroMonogram />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-kraft-light/80"
      >
        {tagline}
      </motion.p>

      <h1 className="font-display text-[clamp(2.25rem,7vw,5rem)] leading-[1.05] tracking-tight text-white">
        <SplitHeadline text={name} playOnMount delay={0.1} className="block" as="span" />
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 h-px w-32 origin-center bg-gradient-to-r from-transparent via-kraft to-transparent md:w-48"
      />
    </motion.div>
  );
}
