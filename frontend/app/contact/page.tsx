import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactSection } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact us",
  "Contact Sri Vigneshwara Packaging in Bengaluru for corrugated boxes, trays and custom packaging. Send your requirements or call our team for a quote.",
  "/contact"
);

export default async function ContactPage() {
  const content = await getSiteContent();
  const { company, contact, products, siteSettings, trustBar } = content;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <header className="border-b border-charcoal/10 bg-white">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1400px] items-center justify-between gap-5 px-6 md:px-8 lg:px-16">
          <Link href="/" aria-label="Sri Vigneshwara Packaging — home" className="inline-flex shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper">
            <BrandLogo logoUrl={company.logoUrl} variant="header" />
          </Link>
          <nav aria-label="Site" className="flex items-center gap-5 text-xs font-semibold text-text-secondary sm:gap-8 sm:text-sm">
            <Link href="/products" className="transition-colors hover:text-copper focus-visible:text-copper">Products</Link>
            <Link href="/about" className="transition-colors hover:text-copper focus-visible:text-copper">About</Link>
          </nav>
        </div>
      </header>

      <main id="main-content" className="bg-alabaster text-text-primary">
        <section className="border-b border-charcoal/10 bg-pearl/60">
          <div className="mx-auto w-full max-w-[1160px] px-6 pb-14 pt-12 sm:pb-20 sm:pt-16 lg:px-10 lg:pb-24 lg:pt-20">
            <Link href="/" className="inline-flex min-h-11 items-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-copper-dark transition-colors hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper">
              <span aria-hidden="true">←</span><span className="ml-2">Back to home</span>
            </Link>
            <p className="mt-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper-dark sm:mt-10">
              <span aria-hidden="true" className="h-px w-7 bg-copper" />{contact.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(3.4rem,7vw,6rem)] leading-[0.98] tracking-tight text-charcoal">
              {contact.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">
              {contact.description}
            </p>
            <a href="#contact" className="mt-8 inline-flex min-h-11 items-center gap-3 bg-copper px-6 text-sm font-semibold text-white transition-colors hover:bg-copper-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper">
              Start your enquiry <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section id="contact" className="scroll-mt-8 bg-[#f5f1e8]">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-14 md:px-8 md:py-20 lg:px-16 lg:py-24">
            <h2 className="sr-only">Contact details and quote form</h2>
            <ContactSection data={contact} showIntro={false} />
          </div>
        </section>
      </main>

      <SiteFooter
        company={company}
        contact={contact}
        siteSettings={siteSettings}
        trustBar={trustBar}
        products={products}
      />
    </>
  );
}
