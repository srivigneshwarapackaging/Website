import Link from "next/link";
import type {
  CompanyContent,
  ContactContent,
  ProductsContent,
  SiteSettings,
  TrustBarContent,
} from "@/shared/types/content-types";
import { mapsUrl, whatsappUrl } from "@/lib/whatsapp";
import { navHref } from "@/lib/nav-target";
import { BackToTop } from "@/components/layout/BackToTop";
import { BrandLogo } from "@/components/brand/BrandLogo";

/**
 * Footer — §9 (13) / §2.2
 * Light, typographic, hairline-ruled. Four columns of plain links, one quiet
 * legal bar. No watermark, no gradient button, no chips, no pulsing dot.
 */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
      {children}
    </h2>
  );
}

const linkClass =
  "text-[0.875rem] leading-relaxed text-text-secondary transition-colors duration-200 hover:text-copper";

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {children}
      </a>
    );
  }
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
}

export function SiteFooter({
  company,
  contact,
  siteSettings,
  trustBar,
  products,
}: {
  company: CompanyContent;
  contact: ContactContent;
  siteSettings?: SiteSettings;
  trustBar?: TrustBarContent;
  products?: ProductsContent;
}) {
  const nav = siteSettings?.nav?.length ? siteSettings.nav : [];
  const socialLinks = (siteSettings?.socialLinks || []).filter((s) =>
    s.url?.trim()
  );
  const industries = trustBar?.industries?.slice(0, 6) || [];
  const productItems = products?.items?.slice(0, 4) || [];
  const certifications = (company.certifications || []).filter((c) =>
    c.name?.trim()
  );
  const waLink = whatsappUrl(contact.phone, contact.whatsappMessage);
  const directionsLink = mapsUrl(contact.address, contact.mapUrl);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-alabaster">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-8 md:py-20 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <BrandLogo logoUrl={company.logoUrl} variant="footer" />
            <p className="mt-5 max-w-xs text-[0.875rem] leading-relaxed text-text-secondary">
              {company.tagline}
            </p>

            {certifications.length > 0 && (
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                {certifications.map((cert) => (
                  <li
                    key={cert.name}
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-text-muted"
                  >
                    {cert.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <FooterHeading>Navigate</FooterHeading>
            <ul className="space-y-2.5">
              {nav.map((link) => (
                <li key={link.id}>
                  <FooterLink href={navHref(link)}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <FooterHeading>Products</FooterHeading>
            <ul className="space-y-2.5">
              {productItems.map((item) => (
                <li key={item.slug}>
                  <FooterLink href="/products">{item.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/lab#configure">Build your box</FooterLink>
              </li>
            </ul>

            {industries.length > 0 && (
              <>
                <h2 className="mb-3 mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Industries served
                </h2>
                <p className="text-[0.8rem] leading-relaxed text-text-secondary">
                  {industries.join(" · ")}
                </p>
              </>
            )}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <address className="space-y-2.5 not-italic">
              <p className="text-[0.875rem] leading-relaxed text-text-secondary">
                {contact.address}
              </p>
              <p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-[0.875rem] font-semibold text-text-primary transition-colors hover:text-copper"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </p>
            </address>

            <div className="mt-4 flex flex-col items-start gap-2">
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.875rem] font-semibold text-copper transition-colors hover:text-copper-dark"
              >
                {contact.mapLabel || "Get directions"} ↗
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.875rem] font-semibold text-copper transition-colors hover:text-copper-dark"
              >
                WhatsApp ↗
              </a>
            </div>

            {contact.officeHours?.length > 0 && (
              <dl className="mt-6 space-y-1.5 border-t border-charcoal/10 pt-4">
                {contact.officeHours.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-3 text-[0.8rem]"
                  >
                    <dt className="text-text-muted">{row.label}</dt>
                    <dd className="font-medium text-text-secondary">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-charcoal/10 pt-6">
          <p className="text-[0.75rem] text-text-muted">
            © {year} {company.name}
            {company.gstin?.trim() ? ` · GSTIN ${company.gstin}` : ""}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.75rem] text-text-muted transition-colors hover:text-copper"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/privacy"
              className="text-[0.75rem] text-text-muted transition-colors hover:text-copper"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[0.75rem] text-text-muted transition-colors hover:text-copper"
            >
              Terms
            </Link>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
