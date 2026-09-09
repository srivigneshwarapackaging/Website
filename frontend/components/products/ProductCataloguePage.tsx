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
import { ProductCatalogue } from "./ProductCatalogue";
import { plyLabel } from "./shared";

function SpecComparisonTable({
  items,
}: {
  items: SiteContentData["products"]["items"];
}) {
  return (
    <ScrollReveal kind="fade" className="mt-20 overflow-x-auto">
      <div className="min-w-[640px] overflow-hidden rounded-[var(--radius-panel)] border border-stone-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-stone-200/80 px-6 py-4 dark:border-zinc-800">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
            Spec comparison
          </p>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:border-zinc-800">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Ply</th>
              <th className="px-6 py-4">Strength</th>
              <th className="px-6 py-4">Flute</th>
              <th className="px-6 py-4">Use case</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product, i) => (
              <tr
                key={product.slug}
                className={`border-b border-stone-50 transition-colors last:border-0 hover:bg-stone-50/80 dark:border-zinc-800/50 dark:hover:bg-zinc-800/30 ${
                  i % 2 === 0 ? "bg-stone-50/40 dark:bg-zinc-950/40" : ""
                }`}
              >
                <td className="px-6 py-4 font-display font-semibold text-stone-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-charcoal px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-kraft-light">
                    {plyLabel(product.ply)}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                  {product.strength}
                </td>
                <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                  {product.flute}
                </td>
                <td className="max-w-xs px-6 py-4 text-xs leading-relaxed text-stone-500">
                  {product.use}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  );
}

export function ProductCataloguePage({ content }: { content: SiteContentData }) {
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
          <span className="font-display text-sm font-bold">{content.company.name}</span>
          <Magnetic>
            <Link href="/#contact" data-cursor="link">
              <Button className="!px-5 !py-2.5 !text-xs">Get quote</Button>
            </Link>
          </Magnetic>
        </Container>
      </div>

      <main className="relative z-10 bg-surface dark:bg-surface-dark">
        {/* Hero */}
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
            <Eyebrow>Full catalogue</Eyebrow>
            <DisplayHeading className="max-w-3xl">
              <SplitHeadline text={content.products.title} />
            </DisplayHeading>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-500 dark:text-stone-400">
              {content.company.tagline} Explore every ply configuration, compare specs side by side,
              and find the right carton for your load.
            </p>
          </Container>
        </section>

        {/* Interactive catalogue */}
        <section className="pb-20 md:pb-28">
          <Container>
            <ProductCatalogue
              data={content.products}
              variant="full"
              layoutId="ply-pill-catalogue"
            />
            <SpecComparisonTable items={content.products.items} />
          </Container>
        </section>

        {/* CTA band */}
        <section className="border-y border-stone-200/80 bg-charcoal py-16 text-white dark:border-zinc-800">
          <Container className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-kraft-light">
                Ready to order?
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Custom specs, bulk pricing, fast turnaround
              </h2>
            </div>
            <Magnetic>
              <Link href="/#contact" data-cursor="link">
                <Button className="group">
                  Request a quote
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
