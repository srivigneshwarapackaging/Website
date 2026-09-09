import { z } from "zod";

const statItemSchema = z.object({
  value: z.string().min(1).max(50),
  label: z.string().min(1).max(100),
});

const sustainabilityStatSchema = z.object({
  stat: z.string().min(1).max(50),
  label: z.string().min(1).max(100),
});

const processStepSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  icon: z.enum(["package", "factory", "print", "check"]).optional(),
});

const productItemSchema = z.object({
  slug: z.string().min(1).max(100),
  name: z.string().min(1).max(200),
  strength: z.string().max(200),
  flute: z.string().max(200),
  use: z.string().max(500),
  imageUrl: z.string().max(2000).optional(),
  ply: z.enum(["3", "5", "7", "diecut"]),
});

const certificationSchema = z.object({
  name: z.string().min(1).max(200),
  imageUrl: z.string().max(2000).optional(),
});

const officeHourSchema = z.object({
  label: z.string().min(1).max(100),
  value: z.string().min(1).max(200),
});

const navLinkSchema = z.object({
  label: z.string().min(1).max(50),
  id: z.string().min(1).max(50),
});

const socialLinkSchema = z.object({
  label: z.string().min(1).max(50),
  url: z.string().max(2000),
});

export const siteContentSchema = z.object({
  seo: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(500),
    ogImage: z.string().max(2000).optional(),
  }),
  siteSettings: z.object({
    headerCta: z.string().min(1).max(100),
    footerHeadline: z.string().min(1).max(300),
    nav: z.array(navLinkSchema).min(1).max(10),
    socialLinks: z.array(socialLinkSchema).max(8).default([]),
  }),
  hero: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    subtitle: z.string().min(1).max(1000),
    ctaPrimary: z.string().min(1).max(100),
    ctaSecondary: z.string().min(1).max(100),
    imageUrl: z.string().max(2000).optional(),
    videoUrl: z.string().max(2000).optional(),
    stats: z.array(statItemSchema).max(8),
  }),
  trustBar: z.object({
    industries: z.array(z.string().min(1).max(100)).max(20),
  }),
  about: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(5000),
    pullQuote: z.string().max(500),
    stats: z.array(statItemSchema).max(8),
    imageUrl: z.string().max(2000).optional(),
  }),
  process: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    intro: z.string().max(2000),
    steps: z.array(processStepSchema).min(1).max(12),
  }),
  products: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    description: z.string().max(2000),
    applications: z.array(z.string().min(1).max(100)).max(20),
    items: z.array(productItemSchema).min(1).max(20),
  }),
  sustainability: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(5000),
    stats: z.array(sustainabilityStatSchema).max(8),
  }),
  marqueeCta: z.object({
    label: z.string().min(1).max(300),
  }),
  contact: z.object({
    eyebrow: z.string().max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(2000),
    phone: z.string().min(1).max(50),
    email: z.string().email().max(200),
    address: z.string().min(1).max(500),
    mapUrl: z.string().max(2000).optional(),
    mapLabel: z.string().max(200),
    coordinates: z.string().max(100),
    infoHeadline: z.string().max(300),
    infoSubtext: z.string().max(1000),
    trustPoints: z.array(z.string().min(1).max(100)).max(10),
    officeHours: z.array(officeHourSchema).max(10),
    formSubmitLabel: z.string().min(1).max(100),
    whatsappMessage: z.string().max(500),
  }),
  company: z.object({
    name: z.string().min(1).max(200),
    tagline: z.string().min(1).max(300),
    logoUrl: z.string().max(2000).optional(),
    gstin: z.string().max(50).optional(),
    certifications: z.array(certificationSchema).max(20),
  }),
});

export type SiteContentInput = z.infer<typeof siteContentSchema>;
