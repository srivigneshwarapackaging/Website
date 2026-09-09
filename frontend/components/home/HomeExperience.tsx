"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Section } from "@/components/design-system/Container";
import { ScrollSpy } from "@/components/layout/ScrollSpy";
import { IntroLoader } from "@/components/layout/IntroLoader";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/About";
import { ProductRange } from "@/components/sections/ProductRange";
import { SustainabilitySection } from "@/components/sections/Sustainability";
import { MarqueeCTA } from "@/components/sections/MarqueeCTA";
import type { SiteContentData } from "@/shared/types/content-types";

const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false }
);
const Cursor = dynamic(
  () => import("@/components/motion/Cursor").then((m) => m.Cursor),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("@/components/motion/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false }
);
const ProcessTimeline = dynamic(
  () => import("@/components/sections/ProcessTimeline").then((m) => m.ProcessTimeline),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.ContactSection),
  { ssr: false }
);

export function HomeExperience({ content }: { content: SiteContentData }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [introInstant, setIntroInstant] = useState(false);

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
      <IntroLoader
        name={content.company.name}
        tagline={content.company.tagline}
        onComplete={({ instant }) => {
          if (instant) setIntroInstant(true);
          setIntroComplete(true);
        }}
      />
      <ScrollSpy />
      {introComplete && (
        <>
          <ScrollProgress />
          <Cursor />
          <SmoothScroll enabled />
        </>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{
          duration: introInstant ? 0 : 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: introComplete && !introInstant ? 0.15 : 0,
        }}
      >
        <SiteHeader company={content.company} siteSettings={content.siteSettings} />
      </motion.div>

      <main
        id="main-content"
        className="relative z-10 w-full overflow-x-hidden bg-surface dark:bg-surface-dark"
      >
        <HeroSection
          data={content.hero}
          company={content.company}
          introComplete={introComplete}
          introInstant={introInstant}
        />
        <TrustBar stats={content.about.stats} trustBar={content.trustBar} />
        <Section id="about">
          <AboutSection data={content.about} showFullPageLink />
        </Section>
        <ProcessTimeline data={content.process} />
        <Section id="products">
          <ProductRange data={content.products} />
        </Section>
        <Section id="sustainability" className="!py-24">
          <SustainabilitySection data={content.sustainability} />
        </Section>
        <MarqueeCTA label={content.marqueeCta.label} />
        <Section id="contact" className="bg-stone-50 dark:bg-zinc-950/40 !py-20 md:!py-24">
          <ContactSection data={content.contact} />
        </Section>
      </main>

      {/* Curtain reveal: footer sits behind the scrolling content and is
          unveiled as the page bottom slides up over it. */}
      <div className="sticky bottom-0 z-0">
        <SiteFooter
          company={content.company}
          contact={content.contact}
          siteSettings={content.siteSettings}
          trustBar={content.trustBar}
          products={content.products}
        />
      </div>
    </>
  );
}
