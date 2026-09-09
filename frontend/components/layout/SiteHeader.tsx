"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/ThemeContext";
import { useJourneyStore } from "@/store/useJourneyStore";
import { Button } from "@/components/design-system/Button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { scrollToSection } from "@/lib/scroll-to";
import { BrandLogo } from "@/components/brand/BrandLogo";
import type { CompanyContent, SiteSettings } from "@/shared/types/content-types";

export function SiteHeader({
  company,
  siteSettings,
}: {
  company?: CompanyContent;
  siteSettings?: SiteSettings;
}) {
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useJourneyStore((s) => s.activeSection);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = siteSettings?.nav?.length ? siteSettings.nav : [];
  const headerCta = siteSettings?.headerCta || "Get quote";

  const scrollTo = (id: string) => scrollToSection(id);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500 lg:px-10",
          scrolled &&
            "rounded-full border border-stone-200/70 bg-white/85 py-3 shadow-[var(--shadow-panel)] backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-950/85"
        )}
      >
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className="group text-left transition-opacity hover:opacity-90"
          aria-label={company?.name || "Sri Vigneshwara Packaging"}
        >
          <span className="hidden sm:inline-flex">
            <BrandLogo logoUrl={company?.logoUrl} variant="header" />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandLogo logoUrl={company?.logoUrl} variant="mark" />
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1 rounded-full bg-stone-100/80 p-1 dark:bg-zinc-900/80">
          {nav.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] transition-colors",
                  isActive
                    ? "text-accent"
                    : "text-stone-500 hover:text-stone-900 dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-800"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-stone-600 ring-1 ring-stone-200/60 hover:bg-stone-100 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Magnetic className="hidden md:block" strength={0.5}>
            <Button
              variant="primary"
              className="!px-5 !py-2.5 !text-[10px] !tracking-[0.15em] !uppercase"
              onClick={() => scrollTo("contact")}
            >
              {headerCta}
            </Button>
          </Magnetic>
          <button
            type="button"
            className="md:hidden rounded-full p-2 ring-1 ring-stone-200 dark:ring-zinc-700"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mx-6 mt-2 rounded-2xl border border-stone-200 bg-white/95 px-6 py-4 shadow-xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                scrollTo(item.id);
                setOpen(false);
              }}
              className="block w-full py-3 text-left text-sm font-bold border-b border-stone-100 last:border-0 dark:border-zinc-800"
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="primary"
            className="w-full mt-4"
            onClick={() => {
              scrollTo("contact");
              setOpen(false);
            }}
          >
            {headerCta}
          </Button>
        </div>
      )}
    </header>
  );
}
