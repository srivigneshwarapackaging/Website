import { DEFAULT_HOMEPAGE, type HomepageContent } from "./homepage";
export type PlyType = "3" | "5" | "7" | "diecut";

export type ProcessIcon = "package" | "factory" | "print" | "check";

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageUrl?: string;
  videoUrl?: string;
  stats: StatItem[];
}

export interface TrustBarContent {
  industries: string[];
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  pullQuote: string;
  stats: StatItem[];
  imageUrl?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  icon?: ProcessIcon | string;
}

export interface ProcessContent {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ProcessStep[];
}

export interface ProductItem {
  slug: string;
  name: string;
  strength: string;
  flute: string;
  use: string;
  imageUrl?: string;
  ply: PlyType;
}

export interface ProductsContent {
  eyebrow: string;
  title: string;
  description: string;
  applications: string[];
  items: ProductItem[];
}

export interface SustainabilityStat {
  stat: string;
  label: string;
}

export interface SustainabilityContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: SustainabilityStat[];
}

export interface OfficeHour {
  label: string;
  value: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  mapUrl?: string;
  mapLabel: string;
  coordinates: string;
  infoHeadline: string;
  infoSubtext: string;
  trustPoints: string[];
  officeHours: OfficeHour[];
  formSubmitLabel: string;
  whatsappMessage: string;
}

export interface MarqueeCtaContent {
  label: string;
}

export interface NavLink {
  label: string;
  id: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  headerCta: string;
  footerHeadline: string;
  nav: NavLink[];
  socialLinks: SocialLink[];
}

export interface SeoContent {
  title: string;
  description: string;
  ogImage?: string;
}

export interface Certification {
  name: string;
  imageUrl?: string;
}

export interface CompanyContent {
  name: string;
  tagline: string;
  logoUrl?: string;
  gstin?: string;
  certifications: Certification[];
}

export interface SiteContentData {
  homepage: HomepageContent;
  seo: SeoContent;
  siteSettings: SiteSettings;
  hero: HeroContent;
  trustBar: TrustBarContent;
  about: AboutContent;
  process: ProcessContent;
  products: ProductsContent;
  sustainability: SustainabilityContent;
  marqueeCta: MarqueeCtaContent;
  contact: ContactContent;
  company: CompanyContent;
}

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  homepage: DEFAULT_HOMEPAGE,
  seo: {
    title: "Corrugated Boxes in Bengaluru | Sri Vigneshwara Packaging",
    description:
      "Sri Vigneshwara Packaging manufactures 3, 5 and 7-ply corrugated boxes, printed cartons and custom die-cut packaging in Bengaluru. Request a quote.",
    ogImage: "",
  },
  siteSettings: {
    headerCta: "Get a quote",
    footerHeadline: "Let's build something durable.",
    nav: [
      { label: "About", id: "about" },
      { label: "Products", id: "products" },
      { label: "Lab", id: "/lab" },
      { label: "Sustainability", id: "sustainability" },
      { label: "Contact", id: "contact" },
    ],
    socialLinks: [
      { label: "LinkedIn", url: "" },
      { label: "Instagram", url: "" },
    ],
  },
  hero: {
    eyebrow: "Corrugated packaging · Bengaluru",
    title: "Packaging made to perform.",
    subtitle:
      "Corrugated packaging engineered for strength, protection and reliable supply — backed by more than 30 years of manufacturing experience.",
    ctaPrimary: "Get a quote",
    ctaSecondary: "Explore products",
    imageUrl: "",
    videoUrl: "",
    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "200T", label: "Monthly capacity" },
      { value: "3–7", label: "Ply options" },
    ],
  },
  trustBar: {
    industries: [
      "Automotive",
      "Electronics",
      "FMCG",
      "Engineering",
      "E-commerce",
      "Furniture",
      "Industrial components",
      "Pharmaceutical",
    ],
  },
  about: {
    eyebrow: "About us",
    title: "Three decades of making packaging better.",
    description:
      "Sri Vigneshwara Packaging manufactures corrugated packaging in Bengaluru for businesses with recurring, specification-driven requirements. Construction is selected around your product, load and application — not pulled from a catalogue.",
    pullQuote: "Precision-engineered packaging, built to protect what matters.",
    stats: [
      { value: "30+", label: "Years of experience" },
      { value: "200T", label: "Monthly capacity" },
      { value: "3–7", label: "Ply options" },
      { value: "Custom", label: "Manufacturing" },
      { value: "Bengaluru", label: "Based" },
    ],
    imageUrl: "",
  },
  process: {
    eyebrow: "How we work",
    title: "From requirement to ready-to-ship.",
    intro:
      "Every order moves through the same five controlled stages, so repeat requirements arrive to the same specification each time.",
    steps: [
      {
        title: "Understand",
        description: "Your product and packaging requirement.",
        icon: "package",
      },
      {
        title: "Engineer",
        description: "Dimensions, ply and flute selection.",
        icon: "print",
      },
      {
        title: "Manufacture",
        description: "Corrugation and conversion.",
        icon: "factory",
      },
      {
        title: "Inspect",
        description: "Quality and consistency.",
        icon: "check",
      },
      {
        title: "Deliver",
        description: "Ready for your operation.",
        icon: "package",
      },
    ],
  },
  products: {
    eyebrow: "Product range",
    title: "Packaging for every requirement.",
    description:
      "Engineered ply configurations for every load — from e-commerce cartons to industrial export crates.",
    applications: [
      "E-commerce",
      "FMCG",
      "Pharma cold chain",
      "Export",
      "Retail display",
    ],
    items: [
      {
        slug: "3-ply",
        name: "3 Ply Corrugated Box",
        strength: "Up to 50 lbs",
        flute: "E, B, C flutes",
        use: "Standard shipping",
        ply: "3",
        imageUrl: "/box1.jpg",
      },
      {
        slug: "5-ply",
        name: "5 Ply Corrugated Box",
        strength: "Up to 120 lbs",
        flute: "BC, EB combinations",
        use: "Heavy-duty protection",
        ply: "5",
        imageUrl: "/box2.jpeg",
      },
      {
        slug: "7-ply",
        name: "7 Ply Corrugated Box",
        strength: "200+ lbs",
        flute: "AAA, BBC combinations",
        use: "Industrial shipping",
        ply: "7",
        imageUrl: "",
      },
      {
        slug: "die-cut",
        name: "Custom Die-Cut",
        strength: "Variable",
        flute: "Any specification",
        use: "Specialized packaging",
        ply: "diecut",
        imageUrl: "",
      },
    ],
  },
  sustainability: {
    eyebrow: "Sustainability",
    title: "Better packaging. Less waste.",
    description:
      "Corrugated board is paper-based and recyclable by default. The bigger gain is specifying it correctly — right-sized boxes with the right construction use less material and fail less often in transit.",
    stats: [
      { stat: "95%", label: "Recycled content" },
      { stat: "Zero", label: "Waste to landfill" },
      { stat: "Carbon", label: "Neutral operations" },
    ],
  },
  marqueeCta: {
    label: "Let's build your packaging",
  },
  contact: {
    eyebrow: "Request a quote",
    title: "Get a packaging solution.",
    description:
      "Tell us what you're shipping. We'll help you determine the right packaging.",
    phone: "+91 9945019279",
    email: "svcartons2015@gmail.com",
    address: "Industrial Area, Bengaluru, India",
    mapUrl: "",
    mapLabel: "Bengaluru, India",
    coordinates: "12.97°N 77.59°E",
    infoHeadline: "Tell us about your packaging job",
    infoSubtext:
      "Share ply requirements, dimensions, print needs, or monthly volume — we'll respond with specs and pricing.",
    trustPoints: ["24h response", "Get a quote", "Bulk quotes"],
    officeHours: [
      { label: "Mon – Sat", value: "9:00 AM – 6:00 PM IST" },
      { label: "Quote turnaround", value: "Within 24 hours" },
      { label: "Production lead", value: "5–7 business days" },
    ],
    formSubmitLabel: "Get a packaging solution",
    whatsappMessage: "Hi, I'd like a quote for corrugated packaging.",
  },
  company: {
    name: "Sri Vigneshwara Packaging",
    tagline: "Industrial corrugated packaging",
    logoUrl: "",
    gstin: "",
    certifications: [
      { name: "ISO certified", imageUrl: "" },
      { name: "GST registered", imageUrl: "" },
      { name: "FSC available", imageUrl: "" },
    ],
  },
};
