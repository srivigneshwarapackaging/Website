import Link from "next/link";
import { getSiteContent } from "@/backend/services/content/get-site-content";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactSection } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata(
  "Contact us",
  "Contact Sri Vigneshwara Packaging in Bengaluru for corrugated boxes, trays and custom packaging. Send your requirements or call our team for a quote.",
  "/contact"
);

export default async function ContactPage() {
  const content = await getSiteContent();
  const { company, contact, products, siteSettings, trustBar } = content;
  const orderHelpWhatsApp = whatsappUrl(
    contact.phone,
    "Hello, I need help with a packaging product or order."
  );
  const websiteHelpEmail = `mailto:${contact.email}?subject=${encodeURIComponent("Website help")}`;

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

        <section id="help" className="scroll-mt-8 border-t border-charcoal/10 bg-alabaster">
          <div className="mx-auto w-full max-w-[1160px] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
            <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-copper-dark">
              <span aria-hidden="true" className="h-px w-7 bg-copper" />Support
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,5vw,4.5rem)] leading-[1.02] tracking-tight text-charcoal">
              How can we help?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
              For a new packaging quote, use the form above. For other issues, choose the right way to reach us below.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <article id="packaging-help" className="scroll-mt-8 border border-charcoal/10 bg-white p-6 sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-copper-dark">01 / Packaging &amp; orders</p>
                <h3 className="mt-5 font-display text-3xl leading-tight text-charcoal">Product or order issue?</h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Call or WhatsApp us. Please include your company name, order reference and a photo if it helps explain the issue.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-copper-dark underline underline-offset-4 hover:text-charcoal">Call our team ↗</a>
                  <a href={orderHelpWhatsApp} target="_blank" rel="noopener noreferrer" className="text-copper-dark underline underline-offset-4 hover:text-charcoal">WhatsApp us ↗</a>
                </div>
              </article>

              <article id="website-help" className="scroll-mt-8 border border-charcoal/10 bg-white p-6 sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-copper-dark">02 / Website help</p>
                <h3 className="mt-5 font-display text-3xl leading-tight text-charcoal">Form not working?</h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Email us the page link, a short description of what happened and a screenshot if possible. Please do not send payment details.
                </p>
                <a href={websiteHelpEmail} className="mt-7 inline-block text-sm font-semibold text-copper-dark underline underline-offset-4 hover:text-charcoal">Email website help ↗</a>
              </article>

              <article id="privacy-help" className="scroll-mt-8 border border-charcoal/10 bg-white p-6 sm:p-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-copper-dark">03 / Privacy &amp; email</p>
                <h3 className="mt-5 font-display text-3xl leading-tight text-charcoal">Privacy request?</h3>
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  Ask about your information or request that business emails stop. We may need to verify the email address involved.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                  <a href="mailto:svcartons2015@gmail.com?subject=Privacy%20request" className="text-copper-dark underline underline-offset-4 hover:text-charcoal">Email privacy request ↗</a>
                  <Link href="/privacy" className="text-copper-dark underline underline-offset-4 hover:text-charcoal">Read privacy policy ↗</Link>
                </div>
              </article>
            </div>
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
