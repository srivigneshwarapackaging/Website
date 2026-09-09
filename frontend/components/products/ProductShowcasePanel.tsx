"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProductItem } from "@/shared/types/content-types";
import { Button } from "@/components/design-system/Button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { scrollToSection } from "@/lib/scroll-to";
import { ACCENTS, EASE, plyLabel, specsFor } from "./shared";
import { SpecBar } from "./SpecBar";
import { ProductVisual } from "./ProductVisual";

type ShowcaseVariant = "home" | "catalogue";

export function ProductShowcasePanel({
  product,
  index,
  variant = "home",
}: {
  product: ProductItem;
  index: number;
  variant?: ShowcaseVariant;
}) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      key={product.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative overflow-hidden rounded-[var(--radius-panel)] bg-charcoal text-white shadow-[var(--shadow-premium)]"
    >
      <div
        className="bg-mesh-drift pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, ${accent}33 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,165,116,0.2) 0%, transparent 45%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(196,165,116,0.5) 11px, rgba(196,165,116,0.5) 12px)",
        }}
      />

      <div className="relative grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10 lg:p-12">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit rounded-full border border-kraft/30 bg-kraft/10 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.35em] text-kraft-light">
            {plyLabel(product.ply)} · flagship
          </p>
          <h3 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.92] tracking-[-0.03em]">
            {product.name}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-stone-400">
            {product.use}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[9px] font-black uppercase tracking-widest text-stone-500">
                Strength
              </dt>
              <dd className="mt-1 font-semibold text-white">{product.strength}</dd>
            </div>
            <div>
              <dt className="text-[9px] font-black uppercase tracking-widest text-stone-500">
                Flute
              </dt>
              <dd className="mt-1 font-semibold text-white">{product.flute}</dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {specsFor(product.ply).map((s) => (
              <SpecBar key={s.label} {...s} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {variant === "home" ? (
              <>
                <Magnetic>
                  <Button onClick={() => scrollToSection("contact")}>Request quote</Button>
                </Magnetic>
                <Link href="/products" data-cursor="link">
                  <Button
                    variant="outline"
                    className="!border-white/25 !bg-white/5 !text-white hover:!border-kraft"
                  >
                    Full catalogue
                    <ArrowUpRight size={16} className="shrink-0" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Magnetic>
                  <Link href="/#contact" data-cursor="link">
                    <Button>Request quote</Button>
                  </Link>
                </Magnetic>
                <Link href="/" data-cursor="link">
                  <Button
                    variant="outline"
                    className="!border-white/25 !bg-white/5 !text-white hover:!border-kraft"
                  >
                    Back to home
                    <ArrowUpRight size={16} className="shrink-0" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="group relative flex items-center justify-center">
          <ProductVisual product={product} accent={accent} large />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-4 font-display text-[8rem] font-bold leading-none text-white/[0.04] md:text-[10rem]"
          >
            {plyLabel(product.ply)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
