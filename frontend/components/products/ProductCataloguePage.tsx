"use client";

import Link from "next/link";
import type { SiteContentData } from "@/shared/types/content-types";
import { Container } from "@/components/design-system/Container";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ProductCatalogue } from "./ProductCatalogue";
import { plyLabel } from "./shared";

/**
 * Full catalogue page.
 * The grid answers "which one do I need"; the table answers "how do they
 * compare". Same content, two different jobs — kept apart rather than stacked.
 */
function SpecComparisonTable({
  items,
}: {
  items: SiteContentData["products"]["items"];
}) {
  return (
    <div className="mt-20">
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
        Compare all specifications
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-charcoal/14">
              {["Product", "Construction", "Load", "Flute", "Typical use"].map(
                (h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-3 pr-6 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr
                key={product.slug}
                className="border-b border-charcoal/8 transition-colors hover:bg-alabaster"
              >
                <th
                  scope="row"
                  className="py-4 pr-6 text-left text-[0.95rem] font-semibold text-text-primary"
                >
                  {product.name}
                </th>
                <td className="py-4 pr-6 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-copper">
                  {plyLabel(product.ply)}
                </td>
                <td className="py-4 pr-6 text-[0.875rem] tabular-nums text-text-secondary">
                  {product.strength}
                </td>
                <td className="py-4 pr-6 text-[0.875rem] text-text-secondary">
                  {product.flute}
                </td>
                <td className="max-w-xs py-4 pr-6 text-[0.875rem] leading-relaxed text-text-secondary">
                  {product.use}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProductCataloguePage({ content }: { content: SiteContentData }) {
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
        {/* Page heading */}
        <section className="py-20 md:py-24 lg:py-28">
          <Container>
            <Eyebrow>Full catalogue</Eyebrow>
            <h1 className="max-w-3xl font-hero text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[1.03] tracking-[-0.035em] text-text-primary">
              {content.products.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Every ply configuration we manufacture, with the load and flute
              specification for each.
            </p>
          </Container>
        </section>

        <section className="border-t border-charcoal/10 pb-24 md:pb-28">
          <Container>
            <ProductCatalogue data={content.products} variant="full" />
            <SpecComparisonTable items={content.products.items} />
          </Container>
        </section>

        {/* CTA */}
        <section className="border-t border-charcoal/10 bg-alabaster py-20 md:py-24">
          <Container className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper">
                Ready to order
              </p>
              <h2 className="mt-4 font-hero text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary">
                Send us the spec and we&rsquo;ll quote it.
              </h2>
            </div>
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
