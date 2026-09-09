"use client";

import type { ProductItem } from "@/shared/types/content-types";
import { PeelCard } from "@/components/motion/PeelCard";
import { CorrugatedBox } from "@/components/visual/CorrugatedBox";
import { ACCENTS, plyLabel } from "./shared";

export function ProductPickerCard({
  product,
  index,
  active,
  onSelect,
}: {
  product: ProductItem;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <PeelCard>
      <button
        type="button"
        onClick={onSelect}
        data-cursor="link"
        className={`group relative h-full w-full overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 ${
          active
            ? "border-kraft bg-kraft/[0.06] shadow-[var(--shadow-glow)] ring-2 ring-kraft/30 dark:bg-kraft/10"
            : "border-stone-200/70 bg-white hover:-translate-y-1 hover:shadow-[var(--shadow-premium)] dark:border-zinc-800 dark:bg-zinc-900"
        }`}
      >
        <div className="relative mb-5 overflow-hidden rounded-2xl">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt=""
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-charcoal-soft">
              <CorrugatedBox size={120} accent={accent} />
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-charcoal/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-kraft-light backdrop-blur-sm">
            {plyLabel(product.ply)}
          </span>
        </div>

        <h3 className="font-display text-lg leading-tight text-stone-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
          {product.use}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:border-zinc-800">
          <span>{product.strength}</span>
          <span className="text-kraft-dark opacity-0 transition-opacity group-hover:opacity-100 dark:text-kraft-light">
            View spec →
          </span>
        </div>
      </button>
    </PeelCard>
  );
}
