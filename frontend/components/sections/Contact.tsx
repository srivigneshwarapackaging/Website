"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, Clock, Package, ArrowUpRight, MessageCircle, type LucideIcon } from "lucide-react";
import type { ContactContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactMap } from "@/components/sections/ContactMap";
import { ContactFormWizard } from "@/components/sections/ContactFormWizard";
import { whatsappUrl } from "@/lib/whatsapp";

const TRUST_ICONS: LucideIcon[] = [Clock, Package, CheckCircle2];

/** A practical split contact surface: information first, quote form second. */
export function ContactSection({ data }: { data: ContactContent }) {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const waLink = whatsappUrl(data.phone, data.whatsappMessage);

  return (
    <div className="relative">
      <ScrollReveal kind="fade" className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 className="max-w-2xl font-body text-[clamp(2.75rem,5.5vw,6rem)] font-normal leading-[0.98] tracking-[-0.055em] text-[#191817]">
            {data.title}
          </h2>
        </div>
        <p className="max-w-md text-base leading-[1.75] text-text-secondary lg:pb-1">{data.description}</p>
      </ScrollReveal>

      <div className="border border-charcoal/10 bg-white">
        <div className="grid lg:grid-cols-[minmax(19rem,.82fr)_minmax(0,1.18fr)]">
          <aside className="bg-charcoal px-6 py-10 text-white md:px-10 md:py-12 lg:px-12">
            <p className="font-technical text-copper-light">Direct line</p>
            <h3 className="mt-4 max-w-sm font-body text-2xl font-normal leading-[1.2] tracking-[-0.025em]">{data.infoHeadline}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{data.infoSubtext}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-copper px-5 text-sm font-semibold transition-colors hover:bg-copper-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-light"><MessageCircle size={16} /> WhatsApp us</a>
              <a href={`tel:${data.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-copper-light hover:text-copper-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-light"><Phone size={15} /> Call now</a>
            </div>
            <ul className="mt-10 border-t border-white/15">
              <ContactRow icon={Phone} label="Phone" value={data.phone} href={`tel:${data.phone.replace(/\s/g, "")}`} />
              <ContactRow icon={Mail} label="Email" value={data.email} href={`mailto:${data.email}`} />
              <ContactRow icon={MapPin} label="Address" value={data.address} />
            </ul>
            <dl className="mt-10 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3 lg:grid-cols-1">
              {data.officeHours.map((row) => <div key={row.label}><dt className="font-technical !text-[0.62rem] !tracking-[0.12em] text-white/45">{row.label}</dt><dd className="mt-1 text-sm font-medium text-white/85">{row.value}</dd></div>)}
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/15 pt-6">
              {data.trustPoints.map((label, i) => { const Icon = TRUST_ICONS[i % TRUST_ICONS.length]; return <span key={label} className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/70"><Icon size={14} className="text-copper-light" />{label}</span>; })}
            </div>
          </aside>
          <div className="bg-alabaster px-6 py-10 md:px-10 md:py-12 lg:px-12">
            <AnimatePresence mode="wait">
              {!sent ? <motion.div key="wizard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ContactFormWizard submitLabel={data.formSubmitLabel} onSent={(email) => { setSentEmail(email); setSent(true); }} /></motion.div> :
                <motion.div key="done" className="flex min-h-[380px] max-w-md flex-col justify-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><CheckCircle2 size={36} className="text-eco" /><p className="mt-6 font-technical text-copper">Request received</p><h3 className="mt-3 font-hero text-3xl font-bold leading-tight tracking-[-0.03em] text-charcoal">We’ll be in touch.</h3><p className="mt-4 text-base leading-relaxed text-text-secondary">We’ll send your packaging recommendation and quote to <span className="font-semibold text-charcoal">{sentEmail}</span> within 24 hours.</p><button type="button" onClick={() => setSent(false)} className="mt-8 w-fit border-b border-copper pb-1 text-sm font-semibold text-charcoal transition-colors hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper">Send another inquiry</button></motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <ContactMap address={data.address} label={data.mapLabel} mapUrl={data.mapUrl} coordinates={data.coordinates} className="border-t border-charcoal/10" />
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href?: string }) {
  const content = <><span className="font-technical !text-[0.62rem] !tracking-[0.12em] text-white/45">{label}</span><span className="mt-1 block break-words text-sm font-medium text-white/90">{value}</span></>;
  return <li className="border-b border-white/15 py-4">{href ? <Link href={href} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-light"><span className="flex items-center gap-2 text-copper-light"><Icon size={14} /><ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>{content}</Link> : <><span className="flex items-center gap-2 text-copper-light"><Icon size={14} /></span>{content}</>}</li>;
}
