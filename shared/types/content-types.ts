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
  seo: {
    title: "Sri Vigneshwara Packaging | Premium Corrugated Boxes",
    description:
      "Industrial corrugated packaging — custom ply boxes, export cartons, and sustainable solutions from Bengaluru.",
    ogImage: "",
  },
  siteSettings: {
    headerCta: "Get quote",
    footerHeadline: "Let's build something durable.",
    nav: [
      { label: "About", id: "about" },
      { label: "Process", id: "process" },
      { label: "Products", id: "products" },
      { label: "Eco", id: "sustainability" },
      { label: "Contact", id: "contact" },
    ],
    socialLinks: [
      { label: "LinkedIn", url: "" },
      { label: "Instagram", url: "" },
    ],
  },
  hero: {
    eyebrow: "Premium corrugated packaging",
    title: "Built to Last. Designed to Protect.",
    subtitle:
      "Premium corrugated packaging solutions that combine strength and sustainability.",
    ctaPrimary: "Get a Quote",
    ctaSecondary: "Our Products",
    imageUrl: "",
    videoUrl: "/videos/factory.mp4",
    stats: [
      { value: "25+", label: "Years" },
      { value: "10M+", label: "Boxes / yr" },
      { value: "ISO", label: "Certified" },
    ],
  },
  trustBar: {
    industries: [
      "FMCG",
      "E-Commerce",
      "Pharma",
      "Automotive",
      "Food & Beverage",
      "Electronics",
      "Export",
      "Retail",
    ],
  },
  about: {
    eyebrow: "About us",
    title: "30 Years of Excellence in Packaging",
    description:
      "We've been engineering corrugated solutions that protect what matters most. From small startups to Fortune 500 companies, our commitment to quality and innovation has made us a trusted partner across industries.",
    pullQuote: "Precision-engineered packaging, built to protect what matters.",
    stats: [
      { value: "30+", label: "Years Experience" },
      { value: "10M+", label: "Boxes Annually" },
      { value: "500+", label: "Happy Clients" },
      { value: "100%", label: "Recyclable" },
    ],
    imageUrl: "",
  },
  process: {
    eyebrow: "Manufacturing journey",
    title: "Our Process",
    intro:
      "From raw kraft paper to a delivery-ready carton — every box passes through a controlled, quality-checked process. Scroll to walk the line.",
    steps: [
      {
        title: "Material Selection",
        description: "Premium kraft paper and recycled fibers",
        icon: "package",
      },
      {
        title: "Corrugation",
        description: "Precise fluting for optimal strength",
        icon: "factory",
      },
      {
        title: "Printing & Coating",
        description: "Custom branding with eco-friendly inks",
        icon: "print",
      },
      {
        title: "Quality Control",
        description: "Rigorous testing at every stage",
        icon: "check",
      },
    ],
  },
  products: {
    eyebrow: "Product range",
    title: "Our Product Range",
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
    title: "Committed to Sustainability",
    description:
      "Every box we produce is 100% recyclable and made from renewable resources.",
    stats: [
      { stat: "95%", label: "Recycled Content" },
      { stat: "Zero", label: "Waste to Landfill" },
      { stat: "Carbon", label: "Neutral Operations" },
    ],
  },
  marqueeCta: {
    label: "Let's build your packaging",
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Let's build your packaging.",
    description:
      "Ready for a quote? Tell us your specs and we'll get back to you within 24 hours.",
    phone: "+91 9945019279",
    email: "svcatons2015@gmail.com",
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
    formSubmitLabel: "Get your quote",
    whatsappMessage: "Hi, I'd like a quote for corrugated packaging.",
  },
  company: {
    name: "Sri Vigneshwara Packaging",
    tagline: "Industrial corrugated packaging",
    logoUrl: "",
    gstin: "",
    certifications: [
      { name: "ISO 9001", imageUrl: "" },
      { name: "FSC Certified", imageUrl: "" },
    ],
  },
};
