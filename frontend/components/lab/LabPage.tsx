"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { SiteContentData } from "@/shared/types/content-types";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PlyShowcase } from "@/components/products/PlyShowcase";
import { PackagingCalculator } from "@/components/sections/PackagingCalculator";

/**
 * The Lab — the interactive tools, moved off the home page.
 *
 * One job: someone who does not know what specification they need arrives
 * here and leaves with one they can send us. Three steps in order —
 * how many walls, what the wall is made of, then the exact box — each a
 * plain section separated by a hairline. Anyone who already knows can jump
 * straight to step 03 from the index at the top.
 */

const BoxCustomizer3D = dynamic(
  () => import("@/components/visual/BoxCustomizer3D").then((m) => m.BoxCustomizer3D),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[380px] w-full rounded-[14px] border border-charcoal/10 bg-alabaster"
        aria-hidden
      />
    ),
  }
);

const STEPS = [
  {
    id: "ply",
    number: "01",
    label: "Ply construction",
    hint: "How many walls for the weight you ship",
  },
  {
    id: "board",
    number: "02",
    label: "Board & flute",
    hint: "What the wall is made of",
  },
  {
    id: "configure",
    number: "03",
    label: "Configure your box",
    hint: "Dimensions, print and run size",
  },
];

export function LabPage({ content }: { content: SiteContentData }) {
  return (
    <>
      <SmoothScroll enabled />

      <header className="sticky top-0 z-50 border-b border-charcoal/[0.07] bg-white/92 backdrop-blur-md">
        <Container className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="group flex min-h-[44px] items-center gap-2 text-[0.8rem] font-semibold text-text-secondary transition-colors hover:text-copper"
          >
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transform-none"
            >
              ←
            </span>
            Home
          </Link>

          <Link
            href="/#contact"
            className="flex min-h-[44px] items-center gap-2 rounded-[10px] bg-copper px-6 text-[0.8rem] font-semibold text-white transition-colors hover:bg-copper-dark"
          >
            Get a quote
            <span aria-hidden>→</span>
          </Link>
        </Container>
      </header>

      <main id="main-content" className="bg-white">
        {/* Page heading + step index */}
        <section className="py-20 md:py-24 lg:py-28">
          <Container>
            <Eyebrow>The Lab</Eyebrow>
            <h1 className="max-w-3xl font-hero text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.03] tracking-[-0.035em] text-text-primary">
              Work out the box you need.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Three steps, in order. Pick the construction, understand the board,
              then set the dimensions. You leave with a written specification our
              team can quote — nothing is sent until you press send.
            </p>

            <ol className="mt-14 grid gap-px overflow-hidden rounded-[10px] border border-charcoal/10 bg-charcoal/10 sm:grid-cols-3">
              {STEPS.map((step) => (
                <li key={step.id} className="bg-white">
                  <a
                    href={`#${step.id}`}
                    className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors hover:bg-alabaster focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-copper"
                  >
                    <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.16em] text-copper">
                      {step.number}
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-text-primary">
                        {step.label}
                        <span
                          aria-hidden
                          className="text-copper transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                        >
                          →
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.8rem] leading-snug text-text-muted">
                        {step.hint}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* 01 — Ply construction */}
        <section
          id="ply"
          className="scroll-mt-24 border-t border-charcoal/10 py-20 md:py-24"
        >
          <Container>
            <PlyShowcase />
          </Container>
        </section>

        {/* 02 — Board & flute */}
        <section
          id="board"
          className="scroll-mt-24 border-t border-charcoal/10 bg-alabaster py-20 md:py-24"
        >
          <Container>
            <BoxCustomizer3D />
          </Container>
        </section>

        {/* 03 — Configure */}
        <section
          id="configure"
          className="scroll-mt-24 border-t border-charcoal/10 py-20 md:py-24"
        >
          <Container>
            <PackagingCalculator
              phone={content.contact.phone}
              whatsappMessage={content.contact.whatsappMessage}
            />
          </Container>
        </section>

        {/* Hand-off */}
        <section className="border-t border-charcoal/10 bg-alabaster py-20 md:py-24">
          <Container className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper">
                Still deciding
              </p>
              <h2 className="mt-4 font-hero text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
                Send us what you&rsquo;re shipping and we&rsquo;ll specify it.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                Product, weight and how it travels is enough to start.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="group flex min-h-[48px] items-center gap-2 rounded-[10px] bg-copper px-8 text-[0.85rem] font-semibold text-white transition-colors hover:bg-copper-dark"
              >
                Request a quote
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  →
                </span>
              </Link>
              <Link
                href="/products"
                className="flex min-h-[48px] items-center gap-2 rounded-[10px] border border-charcoal/15 px-8 text-[0.85rem] font-semibold text-text-primary transition-colors hover:border-copper hover:text-copper"
              >
                Full catalogue
              </Link>
            </div>
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
