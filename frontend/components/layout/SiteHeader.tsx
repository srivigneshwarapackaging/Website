"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJourneyStore } from "@/store/useJourneyStore";
import { scrollToSection } from "@/lib/scroll-to";
import { navTarget } from "@/lib/nav-target";
import { BrandLogo } from "@/components/brand/BrandLogo";
import type { CompanyContent, SiteSettings } from "@/shared/types/content-types";

/**
 * Site header — §10
 * 76px tall, white, logo left / nav right / one copper CTA. On scroll it goes
 * slightly translucent with a backdrop blur and a hairline bottom border —
 * no shape change, no pill, no dramatic animation.
 */
export function SiteHeader({
  company,
  siteSettings,
}: {
  company?: CompanyContent;
  siteSettings?: SiteSettings;
}) {
  const activeSection = useJourneyStore((s) => s.activeSection);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const nav = siteSettings?.nav?.length
    ? siteSettings.nav
    : [
        { label: "About", id: "about" },
        { label: "Products", id: "products" },
        { label: "Lab", id: "/lab" },
        { label: "Sustainability", id: "sustainability" },
        { label: "Contact", id: "contact" },
      ];

  const headerCta = siteSettings?.headerCta || "Get a quote";

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  // Page-load entrance: logo, then nav items, then CTA (§10).
  const entrance = (index: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
            delay: 0.05 + index * 0.055,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-charcoal/[0.07] bg-white/92 backdrop-blur-md"
          : "border-b border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between px-6 md:h-[76px] md:px-8 lg:px-16">
        <motion.button
          {...entrance(0)}
          type="button"
          onClick={() => go("hero")}
          className="-ml-1 flex items-center rounded-[6px] px-1 py-1 transition-opacity hover:opacity-80"
          aria-label={`${company?.name || "Sri Vigneshwara Packaging"} — back to top`}
        >
          <span className="hidden sm:inline-flex">
            <BrandLogo logoUrl={company?.logoUrl} variant="header" />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandLogo logoUrl={company?.logoUrl} variant="mark" />
          </span>
        </motion.button>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item, index) => {
            const target = navTarget(item);
            const isActive =
              target.kind === "section" && activeSection === target.id;
            const itemClass = cn(
              "relative flex items-center py-1 text-[0.8rem] font-semibold tracking-[0.02em] transition-colors duration-200",
              isActive ? "text-copper" : "text-text-secondary hover:text-copper"
            );
            const underline = (
              <span
                aria-hidden
                className={cn(
                  "absolute -bottom-0.5 left-0 h-px bg-copper transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isActive ? "w-full" : "w-0"
                )}
              />
            );

            return (
              <motion.div key={item.id} {...entrance(index + 1)}>
                {target.kind === "route" ? (
                  <Link href={target.href} className={itemClass}>
                    {item.label}
                    {underline}
                  </Link>
                ) : (
                  <a
                    href={`/#${target.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={itemClass}
                  >
                    {item.label}
                    {underline}
                  </a>
                )}
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            {...entrance(nav.length + 1)}
            type="button"
            onClick={() => go("contact")}
            className="group hidden min-h-[44px] items-center gap-2 rounded-[10px] bg-copper px-6 text-[0.8rem] font-semibold tracking-[0.02em] text-white shadow-sm transition-colors duration-[250ms] hover:bg-copper-dark focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-copper sm:inline-flex"
          >
            {headerCta}
            <span aria-hidden className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              →
            </span>
          </motion.button>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[10px] text-charcoal transition-colors hover:text-copper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-charcoal/[0.07] bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-[1400px] px-6 py-2">
            {nav.map((item) => {
              const target = navTarget(item);
              const rowClass =
                "flex min-h-[52px] w-full items-center border-b border-charcoal/[0.07] text-left text-base font-semibold text-charcoal last:border-0 hover:text-copper";

              return target.kind === "route" ? (
                <Link
                  key={item.id}
                  href={target.href}
                  onClick={() => setOpen(false)}
                  className={rowClass}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={`/#${target.id}`}
                  onClick={() => setOpen(false)}
                  className={rowClass}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => go("contact")}
              className="mt-4 mb-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-copper px-6 text-sm font-semibold text-white transition-colors hover:bg-copper-dark"
            >
              {headerCta}
              <span aria-hidden>→</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
