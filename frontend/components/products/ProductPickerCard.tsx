"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProductItem } from "@/shared/types/content-types";
import { CorrugatedBox } from "@/components/visual/CorrugatedBox";
import { scrollToSection } from "@/lib/scroll-to";

/**
 * Product card — §16 / §17
 * Every card carries the same four rows in the same order, so four cards read
 * as one comparison rather than four unrelated adverts. The "choose this if"
 * line is the deciding information and sits above the specs.
 *
 * Hover: border warms to copper, image lifts 6px, arrow shifts 5px (280ms).
 */

/** Engineering guidance by construction — not a company claim. */
const CHOOSE_IF: Record<ProductItem["ply"], string> = {
  "3": "You're shipping light goods — parcels, apparel, retail cartons.",
  "5": "The load is heavy or the stack is tall — FMCG, electronics, appliances.",
  "7": "It travels far or carries weight — export crates, auto components.",
  diecut: "The box has to fit the product exactly — mailers, trays, inserts.",
};

function plyBadge(ply: ProductItem["ply"]) {
  return ply === "diecut" ? "Die-cut" : `${ply}-ply`;
}

export function ProductPickerCard({
  product,
  index = 0,
}: {
  product: ProductItem;
  index?: number;
}) {
  // The contact section only exists on the home page; from /products this has
  // to be a real navigation rather than a no-op scroll.
  const onHome = usePathname() === "/";

  const specs = [
    { term: "Load", value: product.strength },
    { term: "Flute", value: product.flute },
    { term: "Typical use", value: product.use },
  ];

  return (
    <article className="group flex h-full flex-col rounded-[10px] border border-charcoal/10 bg-white p-5 transition-colors duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-copper/45">
      {/* Index + construction */}
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.16em] text-copper">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
          {plyBadge(product.ply)}
        </span>
      </div>

      {/* Visual */}
      <div className="mt-4 overflow-hidden rounded-[6px] bg-pearl">
        <div className="flex aspect-[4/3] w-full items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div className="transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
              <CorrugatedBox size={104} accent="#B87333" />
            </div>
          )}
        </div>
      </div>

      <h3 className="mt-5 font-hero text-xl font-bold leading-[1.15] tracking-[-0.02em] text-text-primary">
        {product.name}
      </h3>

      {/* The deciding line */}
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-text-secondary">
        {CHOOSE_IF[product.ply] ?? product.use}
      </p>

      {/* Identical spec rows across every card, so columns line up */}
      <dl className="mt-5 border-t border-charcoal/8 pt-4 text-[0.75rem]">
        {specs.map((row) => (
          <div
            key={row.term}
            className="flex items-baseline justify-between gap-3 py-1.5"
          >
            <dt className="shrink-0 font-medium uppercase tracking-[0.12em] text-text-muted">
              {row.term}
            </dt>
            <dd className="text-right font-semibold text-text-primary">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {onHome ? (
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className={requestClass}
        >
          Request this spec
          <RequestArrow />
        </button>
      ) : (
        <Link href="/#contact" className={requestClass}>
          Request this spec
          <RequestArrow />
        </Link>
      )}
    </article>
  );
}

const requestClass =
  "mt-auto flex min-h-[44px] items-center gap-2 pt-5 text-[0.8rem] font-semibold text-copper transition-colors hover:text-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper";

function RequestArrow() {
  return (
    <span
      aria-hidden
      className="transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[5px] motion-reduce:transform-none motion-reduce:transition-none"
    >
      →
    </span>
  );
}
