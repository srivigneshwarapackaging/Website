import mongoose from "mongoose";

const StatSchema = new mongoose.Schema(
  { value: String, label: String },
  { _id: false }
);

const SustainabilityStatSchema = new mongoose.Schema(
  { stat: String, label: String },
  { _id: false }
);

const ProcessStepSchema = new mongoose.Schema(
  { title: String, description: String, icon: String },
  { _id: false }
);

const ProductItemSchema = new mongoose.Schema(
  {
    slug: String,
    name: String,
    strength: String,
    flute: String,
    use: String,
    imageUrl: String,
    ply: { type: String, enum: ["3", "5", "7", "diecut"] },
  },
  { _id: false }
);

const CertificationSchema = new mongoose.Schema(
  { name: String, imageUrl: String },
  { _id: false }
);

const OfficeHourSchema = new mongoose.Schema(
  { label: String, value: String },
  { _id: false }
);

const NavLinkSchema = new mongoose.Schema(
  { label: String, id: String },
  { _id: false }
);

const SocialLinkSchema = new mongoose.Schema(
  { label: String, url: String },
  { _id: false }
);

const SiteContentSchema = new mongoose.Schema(
  {
    seo: {
      title: String,
      description: String,
      ogImage: String,
    },
    siteSettings: {
      headerCta: String,
      footerHeadline: String,
      nav: [NavLinkSchema],
      socialLinks: [SocialLinkSchema],
    },
    hero: {
      eyebrow: String,
      title: String,
      subtitle: String,
      ctaPrimary: String,
      ctaSecondary: String,
      imageUrl: String,
      videoUrl: String,
      stats: [StatSchema],
    },
    trustBar: {
      industries: [String],
    },
    about: {
      eyebrow: String,
      title: String,
      description: String,
      pullQuote: String,
      stats: [StatSchema],
      imageUrl: String,
      stat1Value: String,
      stat1Label: String,
      stat2Value: String,
      stat2Label: String,
      stat3Value: String,
      stat3Label: String,
      stat4Value: String,
      stat4Label: String,
    },
    process: {
      eyebrow: String,
      title: String,
      intro: String,
      steps: [ProcessStepSchema],
    },
    products: {
      eyebrow: String,
      title: String,
      description: String,
      applications: [String],
      items: [ProductItemSchema],
    },
    sustainability: {
      eyebrow: String,
      title: String,
      description: String,
      stats: [SustainabilityStatSchema],
    },
    marqueeCta: {
      label: String,
    },
    contact: {
      eyebrow: String,
      title: String,
      description: String,
      email: String,
      phone: String,
      address: String,
      mapUrl: String,
      mapLabel: String,
      coordinates: String,
      infoHeadline: String,
      infoSubtext: String,
      trustPoints: [String],
      officeHours: [OfficeHourSchema],
      formSubmitLabel: String,
      whatsappMessage: String,
    },
    company: {
      name: String,
      tagline: String,
      logoUrl: String,
      gstin: String,
      certifications: [CertificationSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent ||
  mongoose.model("SiteContent", SiteContentSchema);
