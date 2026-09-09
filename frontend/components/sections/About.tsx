"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AboutContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { DisplayHeading, BodyText } from "@/components/design-system/Heading";
import { Button } from "@/components/design-system/Button";
import { StatCard, ImageSlot } from "@/components/design-system/GlassPanel";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { SplitHeadline } from "@/components/motion/SplitHeadline";

export function AboutSection({
  data,
  showFullPageLink = false,
}: {
  data: AboutContent;
  showFullPageLink?: boolean;
}) {
  return (
    <div>
      {showFullPageLink && (
        <div className="mb-10 flex justify-end">
          <Link href="/about" className="hidden sm:inline-block" data-cursor="link">
            <Button variant="outline" className="group">
              Our story
              <ArrowUpRight
                size={16}
                className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          </Link>
        </div>
      )}

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
      {/* Sticky editorial column */}
      <div className="order-1 lg:sticky lg:top-32">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <DisplayHeading className="mb-6" as="h2">
          <SplitHeadline text={data.title} as="span" />
        </DisplayHeading>
        <ScrollReveal kind="blur" delay={0.1}>
          <BodyText className="whitespace-pre-line">{data.description}</BodyText>
        </ScrollReveal>

        <ScrollReveal kind="up" delay={0.2} className="mt-10 border-l-2 border-accent/50 pl-6">
          <p className="font-display text-2xl md:text-3xl leading-snug text-stone-800 dark:text-stone-100">
            {data.pullQuote}
          </p>
        </ScrollReveal>
      </div>

      {/* Scrolling visual column */}
      <div className="order-2 space-y-6">
        <ImageReveal className="rounded-2xl shadow-[var(--shadow-premium)]">
          <ImageSlot
            label="About — facility or team"
            imageUrl={data.imageUrl}
            aspect="portrait"
          />
        </ImageReveal>

        <ParallaxLayer speed={0.25}>
          <ScrollReveal stagger={0.1} className="grid grid-cols-2 gap-4">
            {data.stats.map((stat, i) => (
              <RevealItem key={stat.label}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  accent={i % 3 === 0 ? "gold" : i % 3 === 1 ? "emerald" : "gold"}
                />
              </RevealItem>
            ))}
          </ScrollReveal>
        </ParallaxLayer>
      </div>
      </div>

      {showFullPageLink && (
        <div className="mt-8 sm:hidden">
          <Link href="/about">
            <Button variant="outline" className="w-full">
              Read our full story
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
