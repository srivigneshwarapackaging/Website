"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductsContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { DisplayHeading } from "@/components/design-system/Heading";
import { Button } from "@/components/design-system/Button";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { ProductCatalogue } from "@/components/products/ProductCatalogue";

export function ProductRange({ data }: { data: ProductsContent }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -top-12 bottom-0 -z-10 rounded-[var(--radius-panel)] opacity-40 dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196,165,116,0.12), transparent 70%)",
        }}
      />

      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <DisplayHeading>
            <SplitHeadline text={data.title} />
          </DisplayHeading>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
        <Link href="/products" className="hidden sm:inline-block" data-cursor="link">
          <Button variant="outline" className="group">
            Full catalogue
            <ArrowUpRight
              size={16}
              className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Button>
        </Link>
      </div>

      <ProductCatalogue data={data} variant="home" limit={4} layoutId="ply-pill" />

      <div className="mt-8 sm:hidden">
        <Link href="/products">
          <Button variant="outline" className="w-full">
            View full catalogue
          </Button>
        </Link>
      </div>
    </div>
  );
}
