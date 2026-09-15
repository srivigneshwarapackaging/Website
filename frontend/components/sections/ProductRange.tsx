"use client";

import Link from "next/link";
import type { ProductsContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";

/**
 * Products — §16
 * Plain section header, catalogue grid below. No background wash, no gradient,
 * no glow behind the heading.
 */
export function ProductRange({ data }: { data: ProductsContent }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {data.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
            {data.description}
          </p>
        </div>

        <Link
          href="/products"
          className="group hidden min-h-[44px] items-center gap-2 text-[0.85rem] font-semibold text-copper transition-colors hover:text-copper-dark sm:inline-flex"
        >
          Full catalogue
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          >
            →
          </span>
        </Link>
      </div>

      <ProductCatalogue data={data} variant="home" limit={4} />

      <div className="mt-10 sm:hidden">
        <Link
          href="/products"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] border border-charcoal/15 text-[0.85rem] font-semibold text-text-primary transition-colors hover:border-copper hover:text-copper"
        >
          View full catalogue
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
