import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { SiteContentData } from "@/shared/types/content-types";

type Section = { id: string; label: string };

export function LegalPageFrame({
  content,
  eyebrow,
  title,
  introduction,
  updated,
  sections,
  children,
}: {
  content: SiteContentData;
  eyebrow: string;
  title: string;
  introduction: ReactNode;
  updated?: string;
  sections: Section[];
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-charcoal/10 bg-white">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1400px] items-center justify-between gap-5 px-6 md:px-8 lg:px-16">
          <Link href="/" aria-label="Sri Vigneshwara Packaging — home" className="inline-flex shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper">
            <BrandLogo logoUrl={content.company.logoUrl} variant="header" />
          </Link>
          <nav aria-label="Site" className="flex items-center gap-5 text-xs font-semibold text-text-secondary sm:gap-8 sm:text-sm">
            <Link href="/products" className="hidden transition-colors hover:text-copper focus-visible:text-copper sm:inline">Products</Link>
            <Link href="/contact" className="whitespace-nowrap transition-colors hover:text-copper focus-visible:text-copper">Get a quote <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="bg-alabaster text-text-primary">
        <div className="border-b border-charcoal/10 bg-pearl/60">
          <div className="mx-auto w-full max-w-[1160px] px-6 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
            <Link href="/" className="inline-flex min-h-11 items-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper-dark transition-colors hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper">
              <span aria-hidden="true">←</span><span className="ml-2">Back to home</span>
            </Link>
            <p className="mt-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper-dark sm:mt-10">
              <span aria-hidden="true" className="h-px w-7 bg-copper" />{eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.4rem,7vw,6rem)] leading-[0.98] tracking-tight text-charcoal">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">{introduction}</p>
            {updated && <p className="mt-7 text-xs font-medium text-text-muted">Last updated: {updated}</p>}
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[1160px] gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-20 lg:px-10 lg:py-24">
          <nav aria-label="On this page" className="self-start border-b border-charcoal/10 pb-8 lg:sticky lg:top-8 lg:border-b-0 lg:pb-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-muted">On this page</p>
            <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.82rem] leading-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="group inline-flex min-h-7 items-baseline gap-2 text-text-secondary transition-colors hover:text-copper-dark focus-visible:text-copper-dark">
                    <span className="text-[0.68rem] tabular-nums text-copper-dark/80" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0 max-w-[760px] text-[0.94rem] leading-[1.85] text-text-secondary sm:text-base [&_a]:break-words [&_a]:font-medium [&_a]:text-copper-dark [&_a]:underline [&_a]:decoration-copper/50 [&_a]:underline-offset-4 hover:[&_a]:text-charcoal [&_h2]:font-display [&_h2]:text-[clamp(1.8rem,3vw,2.35rem)] [&_h2]:leading-tight [&_h2]:text-charcoal [&_li]:pl-1 [&_p]:mt-4 [&_section]:scroll-mt-8 [&_section]:border-b [&_section]:border-charcoal/10 [&_section]:py-9 first:[&_section]:pt-0 last:[&_section]:border-b-0">
            {children}
          </article>
        </div>

        <div className="border-t border-charcoal/10 bg-pearl/60">
          <div className="mx-auto flex w-full max-w-[1160px] flex-wrap items-center justify-between gap-5 px-6 py-9 text-sm text-text-secondary lg:px-10">
            <p>Need help with something on this page?</p>
            <Link href="/contact#help" className="font-semibold text-copper-dark underline underline-offset-4 transition-colors hover:text-charcoal">Get help <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>

      <SiteFooter
        company={content.company}
        contact={content.contact}
        siteSettings={content.siteSettings}
        trustBar={content.trustBar}
        products={content.products}
      />
    </>
  );
}
