"use client";

import type { ProductItem } from "@/shared/types/content-types";
import { CorrugatedBox } from "@/components/visual/CorrugatedBox";

export function ProductVisual({
  product,
  accent,
  large,
}: {
  product: ProductItem;
  accent: string;
  large?: boolean;
}) {
  if (product.imageUrl) {
    return (
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-charcoal-soft ring-1 ring-white/10">
      <CorrugatedBox size={large ? 220 : 200} accent={accent} />
    </div>
  );
}
