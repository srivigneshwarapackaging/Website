"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { HeroContent, CompanyContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { Button } from "@/components/design-system/Button";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/MagneticButton";
import { scrollToSection } from "@/lib/scroll-to";

function parseTitle(title: string) {
  const dot = title.indexOf(". ");
  if (dot > 0) return { line1: title.slice(0, dot + 1), line2: title.slice(dot + 2) };
  return { line1: title, line2: "" };
}

export function HeroSection({
  data,
  company,
  introComplete = true,
  introInstant = false,
}: {
  data: HeroContent;
  company: CompanyContent;
  introComplete?: boolean;
  introInstant?: boolean;
}) {
  const { line1, line2 } = parseTitle(data.title);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const revealDuration = introInstant ? 0 : 1.2;
  const contentDelay = (offset: number) =>
    introComplete && !introInstant ? offset : 0;
  const contentDuration = introInstant ? 0 : undefined;

  useEffect(() => {
    const vid = videoRef.current;
    const section = ref.current;
    if (!vid || !section || !introComplete) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [introComplete]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden scroll-mt-24"
      initial={false}
      animate={{
        opacity: introComplete ? 1 : 0,
        scale: introComplete ? 1 : 1.03,
      }}
      transition={{ duration: revealDuration, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: introInstant ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="h-full w-full"
          style={reduced ? undefined : { scale: mediaScale, y: mediaY }}
        >
        {data.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={data.videoUrl || "/videos/factory.mp4"}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/box1.jpg"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
        <motion.div
          className="absolute inset-0 bg-charcoal"
          style={reduced ? { opacity: 0 } : { opacity: overlayOpacity }}
        />
        </motion.div>
      </motion.div>

      <motion.div
        className="mx-auto w-full max-w-6xl flex-1 flex items-center px-6 pt-28 pb-24 lg:px-10"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl -ml-[1in]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 12 }}
            transition={{
              duration: contentDuration ?? 0.6,
              delay: contentDelay(0.2),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Eyebrow className="text-kraft-light">{data.eyebrow || company.tagline || company.name}</Eyebrow>
          </motion.div>

          <h1 className="font-hero text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
            {introInstant ? (
              <>
                <span className="block">{line1}</span>
                {line2 && <span className="block text-gradient-gold-anim">{line2}</span>}
              </>
            ) : (
              <>
                <SplitHeadline text={line1} delay={0.15} className="block" active={introComplete} />
                {line2 && (
                  <SplitHeadline
                    text={line2}
                    delay={0.35}
                    className="block text-gradient-gold-anim"
                    active={introComplete}
                  />
                )}
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
            transition={{
              duration: contentDuration ?? 0.8,
              delay: contentDelay(0.55),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-lg text-base md:text-lg font-normal leading-relaxed text-stone-300"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
            transition={{
              duration: contentDuration ?? 0.8,
              delay: contentDelay(0.7),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <Button onClick={() => scrollToSection("contact")}>{data.ctaPrimary}</Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                className="!border-white/30 !bg-white/5 !text-white backdrop-blur-sm hover:!border-kraft hover:!text-kraft-light"
                onClick={() => scrollToSection("products")}
              >
                {data.ctaSecondary}
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 20 }}
            transition={{
              duration: contentDuration ?? 0.8,
              delay: contentDelay(0.85),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 flex items-stretch gap-8 border-t border-white/10 pt-6"
          >
            {(data.stats?.length ? data.stats : []).map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-white">
                  <Counter value={s.value} />
                </div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={reduced ? undefined : { opacity: contentOpacity }}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">
          Scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-kraft to-transparent" />
      </motion.div>
    </motion.section>
  );
}
