"use client";

import dynamic from "next/dynamic";
import { PackagingIntro } from "@/components/layout/PackagingIntro";
import { Section } from "@/components/design-system/Container";
import { ScrollSpy } from "@/components/layout/ScrollSpy";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileQuoteBar } from "@/components/layout/MobileQuoteBar";
import { HeroSection } from "@/components/sections/Hero";
import { MaterialFilm } from "@/components/sections/MaterialFilm";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProductRange } from "@/components/sections/ProductRange";
import { LabEntry } from "@/components/sections/LabEntry";
import { Applications } from "@/components/sections/Applications";
import { SustainabilitySection } from "@/components/sections/Sustainability";
import type { SiteContentData } from "@/shared/types/content-types";

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.ContactSection),
  { ssr: false }
);

/**
 * The scroll story — "how a box gets made". Client-only: every scene is
 * scroll-driven, so there is nothing meaningful to server-render, and keeping
 * it out of the initial HTML keeps first paint light.
 */

/**
 * Home page order.
 *
 * The story runs first: hero, capability metrics, then the four scroll scenes
 * that show how a box gets made — raw material, corrugation, the fold, print
 * and ship. The CMS process steps are the captions for those scenes, so the
 * narrative and the manufacturing process are one thing, edited in one place,
 * rather than a story section and a process section saying the same words.
 *
 * From About downward the page returns to normal scroll. That is the buyer
 * path — products, the Lab, the quote form — and it stays fast to reach and
 * fast to read. The cinema is front-loaded; the specifications are not behind
 * it, because a procurement buyer who already knows what they want can scroll
 * straight past.
 *
 * The interactive box tools live on /lab; the contact section is the only
 * closing ask.
 */
export function HomeExperience({ content }: { content: SiteContentData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content.company.name,
    description: content.hero.subtitle,
    email: content.contact.email,
    telephone: content.contact.phone,
    address: content.contact.address,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollSpy />
      <PackagingIntro name={content.company.name} tagline={content.company.tagline} />
      <SmoothScroll enabled />

      {/* 01 — Navigation */}
      <SiteHeader company={content.company} siteSettings={content.siteSettings} />

      {/*
        overflow-x must be `clip`, not `hidden`: per spec `overflow-x: hidden`
        computes overflow-y to `auto`, turning this into a scroll container and
        silently breaking every sticky element and ScrollTrigger pin inside it.
        `clip` clips overflow without creating one.
      */}
      <main id="main-content" className="relative w-full overflow-x-clip bg-white">
        {/* 02 — Hero */}
        <HeroSection data={content.hero} />

        {/* 03 — Brand statement */}
        <section className="bg-[#f5f1e8] py-20 md:py-28 lg:py-36">
          <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:px-8 lg:grid-cols-12 lg:px-16">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-[#8f5a32] lg:col-span-2">{content.homepage.belief.eyebrow}</p>
            <h2 className="max-w-4xl font-body text-[clamp(3rem,6vw,7rem)] font-normal leading-[0.91] tracking-[-0.07em] text-[#191817] lg:col-span-7">{content.homepage.belief.title}</h2>
            <p className="self-end text-[1rem] leading-[1.75] text-[#5e5954] lg:col-span-3">{content.homepage.belief.description}</p>
          </div>
        </section>

        {/* 04 — Material story */}
        <MaterialFilm data={content.homepage} />

        {/* 05 — Capability metrics */}
        <TrustBar stats={content.about.stats} />

        {/* 06 — Who we are */}
        <Section id="about" className="border-t border-charcoal/10 bg-alabaster">
          <AboutSection data={content.about} showFullPageLink />
        </Section>

        {/* 07 — Why Sri Vigneshwara */}
        <WhyChooseUs data={content.homepage.why} />

        {/* 08 — Products */}
        <Section id="products" className="border-t border-charcoal/10">
          <ProductRange data={content.products} />
        </Section>

        {/* 09 — The Lab (tools live on /lab) */}
        <LabEntry data={content.homepage.lab} />

        {/* 10 — Applications / industries */}
        <Applications trustBar={content.trustBar} data={content.homepage.applications} />

        {/* 11 — Sustainability */}
        <Section id="sustainability" className="border-t border-charcoal/10">
          <SustainabilitySection data={content.sustainability} principles={content.homepage.principles} />
        </Section>

        {/* 12 — One closing invitation and enquiry surface */}
        <Section id="contact" className="scroll-mt-20 border-t border-charcoal/10 bg-[#f5f1e8]">
          <ContactSection data={content.contact} />
        </Section>
      </main>

      {/* 13 — Footer */}
      <SiteFooter
        company={content.company}
        contact={content.contact}
        siteSettings={content.siteSettings}
        trustBar={content.trustBar}
        products={content.products}
      />

      <MobileQuoteBar
        phone={content.contact.phone}
        whatsappMessage={content.contact.whatsappMessage}
      />
    </>
  );
}
