"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Package,
  ArrowUpRight,
  MessageCircle,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";
import type { ContactContent } from "@/shared/types/content-types";
import { Eyebrow } from "@/components/design-system/Eyebrow";
import { DisplayHeading } from "@/components/design-system/Heading";
import { Confetti } from "@/components/motion/Confetti";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactMap } from "@/components/sections/ContactMap";
import { ContactFormWizard } from "@/components/sections/ContactFormWizard";
import { whatsappUrl } from "@/lib/whatsapp";

const TRUST_ICONS: LucideIcon[] = [Clock, Package, CheckCircle2];

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false }
);

export function ContactSection({ data }: { data: ContactContent }) {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const waLink = whatsappUrl(data.phone, data.whatsappMessage);

  return (
    <div className="relative">
      <ScrollReveal kind="fade" className="mb-10 max-w-2xl">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <DisplayHeading as="h2" className="mb-4">
          {data.title}
        </DisplayHeading>
        <p className="text-base leading-relaxed text-stone-500 dark:text-stone-400">
          {data.description}
        </p>
      </ScrollReveal>

      <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-stone-200/80 bg-white shadow-[var(--shadow-float)] dark:border-zinc-800 dark:bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
          style={{
            background:
              "repeating-linear-gradient(90deg, #c4a574, #c4a574 11px, #9a7b4f 11px, #9a7b4f 12px)",
          }}
        />

        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative overflow-hidden bg-charcoal p-8 text-white md:p-10 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(196,165,116,0.55) 11px, rgba(196,165,116,0.55) 12px)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40"
              style={{
                background:
                  "radial-gradient(circle, rgba(196,165,116,0.25) 0%, transparent 70%)",
              }}
            />

            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-kraft-light">
                Direct line
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {data.infoHeadline}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
                {data.infoSubtext}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  data-cursor="link"
                >
                  <MessageCircle size={16} />
                  WhatsApp us
                </a>
                <Link
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-stone-200 transition-colors hover:border-kraft/40"
                  data-cursor="link"
                >
                  <Phone size={14} />
                  Call now
                </Link>
              </div>

              <ul className="mt-8 space-y-4">
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={data.phone}
                  href={`tel:${data.phone.replace(/\s/g, "")}`}
                />
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={data.email}
                  href={`mailto:${data.email}`}
                />
                <ContactRow icon={MapPin} label="Address" value={data.address} />
              </ul>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-4 flex items-center gap-2 text-kraft-light">
                  <CalendarDays size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.28em]">
                    Hours & turnaround
                  </span>
                </div>
                <dl className="space-y-3">
                  {data.officeHours.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-stone-500">{row.label}</dt>
                      <dd className="font-medium text-stone-200">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {data.trustPoints.map((label, i) => {
                  const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                  return (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-300"
                    >
                      <Icon size={12} className="text-kraft" />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative bg-stone-50/80 p-8 dark:bg-zinc-900/50 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="wizard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ContactFormWizard
                    submitLabel={data.formSubmitLabel}
                    onSent={(email) => {
                      setSentEmail(email);
                      setSent(true);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  className="relative flex min-h-[380px] flex-col items-center justify-center text-center"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Confetti />
                  <div className="relative rounded-3xl border border-kraft/20 bg-kraft/5 px-8 py-10">
                    <DotLottieReact
                      src="/animations/correct.json"
                      loop={false}
                      autoplay
                      className="mx-auto h-28 w-28"
                    />
                    <div className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-emerald-600">
                      <CheckCircle2 size={16} /> Request received
                    </div>
                    <p className="mt-2 text-sm text-stone-500">
                      We&apos;ll reach you at{" "}
                      <span className="font-semibold text-stone-700 dark:text-stone-300">
                        {sentEmail}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-kraft-dark hover:underline dark:text-kraft"
                    >
                      Send another inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ContactMap
          address={data.address}
          label={data.mapLabel}
          mapUrl={data.mapUrl}
          coordinates={data.coordinates}
          className="border-t border-stone-200/80 dark:border-zinc-800"
        />
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-kraft/15 text-kraft ring-1 ring-kraft/20">
        <Icon size={16} />
      </span>
      <span>
        <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-stone-500">
          {label}
        </span>
        <span className="mt-0.5 block text-sm font-medium text-stone-200">{value}</span>
      </span>
      {href && <ArrowUpRight size={14} className="ml-auto shrink-0 text-kraft opacity-60" />}
    </>
  );

  if (href) {
    return (
      <li>
        <Link
          href={href}
          className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:border-kraft/30 hover:bg-white/[0.06]"
          data-cursor="link"
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      {inner}
    </li>
  );
}
