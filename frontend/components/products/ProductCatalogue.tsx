"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ProductsContent } from "@/shared/types/content-types";
import { ProductPickerCard } from "./ProductPickerCard";

/**
 * Product catalogue — §16
 * One representation of the range, not three. Previously this stacked a tab
 * strip, a dark hero panel and a card grid over the same four products, which
 * made the reader work out which one to read. Now: a single comparison grid
 * where every card answers the same questions in the same order, plus one
 * escape hatch for anyone who still isn't sure.
 */
type ProductCatalogueProps = {
  data: ProductsContent;
  variant?: "home" | "full";
  limit?: number;
};

export function ProductCatalogue({
  data,
  variant = "home",
  limit,
}: ProductCatalogueProps) {
  const reduced = useReducedMotion();
  const items = limit ? data.items.slice(0, limit) : data.items;

  if (!items.length) return null;

  const gridCols =
    variant === "full"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="mt-14">
      <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
        Product families
      </h2>

      <div className={`mt-6 ${gridCols}`}>
        {items.map((product, i) => (
          <motion.div
            key={product.slug}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              delay: reduced ? 0 : i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full"
          >
            <ProductPickerCard product={product} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Escape hatch for anyone who can't pick from the four */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-charcoal/10 pt-6">
        <p className="text-[0.95rem] text-text-secondary">
          Not sure which one fits? Work it out in the Lab, or send us the
          dimensions and load and we&rsquo;ll confirm the specification.
        </p>
        <Link
          href="/lab#configure"
          className="group flex min-h-[44px] shrink-0 items-center gap-2 text-[0.85rem] font-semibold text-copper transition-colors hover:text-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper"
        >
          Build your box
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          >
            →
          </span>
        </Link>
      </div>

      {/* Where these boxes are used — plain type, no chips */}
      {data.applications?.length > 0 && (
        <p className="mt-6 text-[0.8rem] leading-relaxed text-text-muted">
          <span className="font-semibold uppercase tracking-[0.14em]">
            Used for
          </span>
          {"  "}
          {data.applications.join(" · ")}
        </p>
      )}
    </div>
  );
}
