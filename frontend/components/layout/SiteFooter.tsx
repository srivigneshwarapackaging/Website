import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  Leaf,
  MapPin,
  MessageCircle,
} from "lucide-react";
import type {
  CompanyContent,
  ContactContent,
  ProductsContent,
  SiteSettings,
  TrustBarContent,
} from "@/shared/types/content-types";
import { cn } from "@/lib/utils";
import { mapsUrl, whatsappUrl } from "@/lib/whatsapp";
import { primaryButtonClass } from "@/components/design-system/Button";
import { BackToTop } from "@/components/layout/BackToTop";
import { BrandLogo } from "@/components/brand/BrandLogo";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[9px] font-black uppercase tracking-[0.25em] text-stone-600">
      {children}
    </p>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "hover:text-white transition-colors";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
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
  splitLayout = false,
}: {
  company: CompanyContent;
  contact: ContactContent;
  siteSettings?: SiteSettings;
  trustBar?: TrustBarContent;
  products?: ProductsContent;
  splitLayout?: boolean;
}) {
  const nav = siteSettings?.nav?.length ? siteSettings.nav : [];
  const footerHeadline = siteSettings?.footerHeadline || "Let's build something durable.";
  const headerCta = siteSettings?.headerCta || "Get a quote";
  const socialLinks = (siteSettings?.socialLinks || []).filter((s) => s.url?.trim());
  const industries = trustBar?.industries?.slice(0, 6) || [];
  const productItems = products?.items?.slice(0, 4) || [];
  const waLink = whatsappUrl(contact.phone, contact.whatsappMessage);
  const directionsLink = mapsUrl(contact.address, contact.mapUrl);
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative z-10 overflow-hidden border-t border-stone-800 bg-charcoal text-stone-400",
        splitLayout && "md:mr-[min(52vw,920px)]"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 whitespace-nowrap text-center font-display font-bold leading-none tracking-tighter text-white/[0.03]"
        style={{ fontSize: "clamp(4rem, 16vw, 16rem)" }}
      >
        {company.name?.split(" ").slice(-1)[0] || "Packaging"}
      </span>

      <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-14">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-display text-2xl tracking-tight text-white md:text-3xl">
              {footerHeadline}
            </p>
            {contact.trustPoints?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {contact.trustPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400"
                  >
                    {point}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20"
            >
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a href="/#contact" className={cn("rounded-full px-6 py-2.5 text-xs font-bold", primaryButtonClass)}>
              {headerCta}
            </a>
            <BackToTop />
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <FooterHeading>Company</FooterHeading>
            <div className="mb-5">
              <BrandLogo logoUrl={company.logoUrl} variant="footer" onDark />
            </div>
            <p className="mb-4 max-w-xs text-xs text-stone-500">{company.tagline}</p>
            <div className="mb-4 flex items-start gap-2 text-xs text-stone-400">
              <Leaf size={14} className="mt-0.5 shrink-0 text-kraft-light" />
              <span>100% recyclable kraft packaging · Sustainable manufacturing</span>
            </div>
            {company.gstin?.trim() && (
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600">
                GSTIN {company.gstin}
              </p>
            )}
          </div>

          <div>
            <FooterHeading>Navigate</FooterHeading>
            <ul className="space-y-1.5 text-xs">
              {nav.map((link) => (
                <li key={link.id}>
                  <FooterLink href={`/#${link.id}`}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/products">Catalogue</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <FooterHeading>Capabilities</FooterHeading>
            {productItems.length > 0 && (
              <ul className="mb-4 space-y-1.5 text-xs">
                {productItems.map((item) => (
                  <li key={item.slug}>
                    <FooterLink href="/products">{item.name}</FooterLink>
                  </li>
                ))}
              </ul>
            )}
            {industries.length > 0 && (
              <>
                <p className="mb-2 text-[9px] font-black uppercase tracking-[0.2em] text-stone-700">
                  Industries
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((label) => (
                    <span
                      key={label}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-[10px] text-stone-500"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <FooterHeading>Contact</FooterHeading>
            <div className="space-y-2 text-xs">
              <p>{contact.address}</p>
              <p>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </p>
              <p>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MapPin size={13} className="text-kraft-light" />
                  {contact.mapLabel || "Get directions"}
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </p>
            </div>
            {contact.officeHours?.length > 0 && (
              <div className="mt-5 space-y-2 border-t border-stone-800/80 pt-4">
                <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-600">
                  <Clock size={12} />
                  Hours
                </p>
                {contact.officeHours.map((row) => (
                  <div key={row.label} className="flex justify-between gap-3 text-[11px]">
                    <span className="text-stone-500">{row.label}</span>
                    <span className="text-right text-stone-300">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {company.certifications.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-stone-800/80 pt-8">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-stone-600">
              Certified
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {company.certifications.map((cert) =>
                cert.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={cert.name}
                    src={cert.imageUrl}
                    alt={cert.name}
                    className="h-10 w-auto max-w-[88px] object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span
                    key={cert.name}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400"
                  >
                    {cert.name}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-800/80 pt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600">
          <span>
            © {year} {company.name}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link href="/privacy" className="hover:text-stone-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
