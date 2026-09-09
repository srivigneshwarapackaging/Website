"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SiteContentData } from "@/shared/types/content-types";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { DisplayHeading } from "@/components/design-system/Heading";
import { Button } from "@/components/design-system/Button";
import { GrainOverlay } from "@/components/design-system/PremiumEffects";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Cursor } from "@/components/motion/Cursor";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Magnetic } from "@/components/motion/MagneticButton";
import { AboutSection } from "@/components/sections/About";

function Certifications({ company }: { company: SiteContentData["company"] }) {
  if (!company.certifications?.length) return null;

  return (
    <ScrollReveal kind="fade" className="mt-20">
      <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
        Certifications
      </p>
      <div className="flex flex-wrap gap-3">
        {company.certifications.map((cert) => (
          <span
            key={cert.name}
            className="rounded-xl border border-stone-200/80 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-stone-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-300"
          >
            {cert.name}
          </span>
        ))}
      </div>
    </ScrollReveal>
  );
}

export function AboutPage({ content }: { content: SiteContentData }) {
  const { about, company, trustBar } = content;

  return (
    <>
      <GrainOverlay />
      <ScrollProgress />
      <Cursor />
      <SmoothScroll />

      <div className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
        <Container className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-accent"
            data-cursor="link"
          >
            ← Home
          </Link>
          <span className="font-display text-sm font-bold">{company.name}</span>
          <Magnetic>
            <Link href="/#contact" data-cursor="link">
              <Button className="!px-5 !py-2.5 !text-xs">Get quote</Button>
            </Link>
          </Magnetic>
        </Container>
      </div>

      <main className="relative z-10 bg-surface dark:bg-surface-dark">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(196,165,116,0.18), transparent 65%)",
            }}
          />
          <Container className="relative">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <DisplayHeading className="max-w-3xl">
              <SplitHeadline text={about.title} />
            </DisplayHeading>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-500 dark:text-stone-400">
              {company.tagline} — engineering corrugated packaging with precision, sustainability,
              and decades of manufacturing expertise from Bengaluru.
            </p>
          </Container>
        </section>

        <section className="pb-16 md:pb-24">
          <Container>
            <AboutSection data={about} />
            <Certifications company={company} />
          </Container>
        </section>

        {trustBar.industries.length > 0 && (
          <section className="border-t border-stone-200/80 py-14 dark:border-zinc-800">
            <Container>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {trustBar.industries.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-stone-200/80 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-stone-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-stone-400"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="border-y border-stone-200/80 bg-charcoal py-16 text-white dark:border-zinc-800">
          <Container className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-kraft-light">
                Work with us
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Ready for a packaging partner you can trust?
              </h2>
            </div>
            <Magnetic>
              <Link href="/#contact" data-cursor="link">
                <Button className="group">
                  Get in touch
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Button>
              </Link>
            </Magnetic>
          </Container>
        </section>
      </main>

      <SiteFooter
        company={content.company}
        contact={content.contact}
        siteSettings={content.siteSettings}
        trustBar={content.trustBar}
        products={content.products}
      />
    </>
  );
}
