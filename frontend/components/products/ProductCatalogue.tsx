"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { ProductsContent } from "@/shared/types/content-types";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PlySelector } from "./PlySelector";
import { ProductShowcasePanel } from "./ProductShowcasePanel";
import { ProductPickerCard } from "./ProductPickerCard";

type ProductCatalogueProps = {
  data: ProductsContent;
  variant?: "home" | "full";
  limit?: number;
  layoutId?: string;
};

export function ProductCatalogue({
  data,
  variant = "home",
  limit,
  layoutId = "ply-pill",
}: ProductCatalogueProps) {
  const items = limit ? data.items.slice(0, limit) : data.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  if (!active) return null;

  const gridCols =
    variant === "full"
      ? "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <>
      <PlySelector
        items={items}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        layoutId={layoutId}
      />

      <AnimatePresence mode="wait">
        <ProductShowcasePanel
          key={active.slug}
          product={active}
          index={activeIndex}
          variant={variant === "full" ? "catalogue" : "home"}
        />
      </AnimatePresence>

      <div className={gridCols}>
        {items.map((product, i) => (
          <div
            key={product.slug}
            className={
              variant === "home" && i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined
            }
          >
            <ProductPickerCard
              product={product}
              index={i}
              active={activeIndex === i}
              onSelect={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>

      <ScrollReveal
        kind="blur"
        className="mt-12 overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50/80 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
            Typical applications
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(data.applications?.length ? data.applications : []).map((a) => (
              <span
                key={a}
                className="text-xs font-semibold text-stone-600 dark:text-stone-300"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
