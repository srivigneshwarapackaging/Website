import {
  DEFAULT_SITE_CONTENT,
  SiteContentData,
  PlyType,
  ProductItem,
  StatItem,
  SustainabilityStat,
  ProcessStep,
  OfficeHour,
  NavLink,
} from "@/shared/types/content-types";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeStats(raw: unknown, fallback: StatItem[]): StatItem[] {
  if (Array.isArray(raw) && raw.length) {
    return (raw as StatItem[]).slice(0, 8).map((s) => ({
      value: String(s.value ?? ""),
      label: String(s.label ?? ""),
    }));
  }
  return fallback;
}

function normalizeAbout(raw: Record<string, unknown> | undefined) {
  const base = DEFAULT_SITE_CONTENT.about;
  if (!raw) return base;

  if (Array.isArray(raw.stats)) {
    return {
      ...base,
      eyebrow: (raw.eyebrow as string) || base.eyebrow,
      title: (raw.title as string) || base.title,
      description: (raw.description as string) || base.description,
      pullQuote: (raw.pullQuote as string) || base.pullQuote,
      stats: normalizeStats(raw.stats, base.stats),
      imageUrl: (raw.imageUrl as string) || "",
    };
  }

  const stats: StatItem[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = raw[`stat${i}Value`] as string;
    const label = raw[`stat${i}Label`] as string;
    if (value || label) stats.push({ value: value || "", label: label || "" });
  }

  return {
    ...base,
    eyebrow: (raw.eyebrow as string) || base.eyebrow,
    title: (raw.title as string) || base.title,
    description: (raw.description as string) || base.description,
    pullQuote: (raw.pullQuote as string) || base.pullQuote,
    stats: stats.length ? stats : base.stats,
    imageUrl: (raw.imageUrl as string) || "",
  };
}

function normalizeProcess(raw: unknown) {
  const base = DEFAULT_SITE_CONTENT.process;
  if (!raw) return base;

  if (typeof raw === "object" && raw !== null && "steps" in raw) {
    const obj = raw as {
      eyebrow?: string;
      title?: string;
      intro?: string;
      steps?: ProcessStep[];
    };
    return {
      eyebrow: obj.eyebrow || base.eyebrow,
      title: obj.title || base.title,
      intro: obj.intro || base.intro,
      steps:
        Array.isArray(obj.steps) && obj.steps.length
          ? obj.steps.map((s, i) => ({
              title: s.title || base.steps[i]?.title || `Step ${i + 1}`,
              description: s.description || "",
              icon: s.icon || base.steps[i]?.icon,
            }))
          : base.steps,
    };
  }

  if (Array.isArray(raw)) {
    return {
      ...base,
      steps: raw.map((step: Record<string, string>, i) => ({
        title: step.title || base.steps[i]?.title || `Step ${i + 1}`,
        description: step.description || step.desc || "",
        icon: step.icon,
      })),
    };
  }

  return base;
}

function normalizeProducts(raw: unknown) {
  const base = DEFAULT_SITE_CONTENT.products;
  if (!raw) return base;

  if (typeof raw === "object" && raw !== null && "items" in raw) {
    const obj = raw as {
      eyebrow?: string;
      title?: string;
      description?: string;
      applications?: string[];
      items?: ProductItem[];
    };
    return {
      eyebrow: obj.eyebrow || base.eyebrow,
      title: obj.title || base.title,
      description: obj.description || base.description,
      applications:
        Array.isArray(obj.applications) && obj.applications.length
          ? obj.applications
          : base.applications,
      items:
        Array.isArray(obj.items) && obj.items.length
          ? obj.items.map((item, i) => ({
              ...item,
              slug: item.slug || slugify(item.name || `product-${i}`),
            }))
          : base.items,
    };
  }

  if (Array.isArray(raw)) {
    const plyOrder: PlyType[] = ["3", "5", "7", "diecut"];
    return {
      ...base,
      items: raw.map((item: Record<string, unknown>, i) => ({
        slug: slugify(String(item.name || `product-${i}`)),
        name: String(item.name || base.items[i]?.name || "Product"),
        strength: String(item.strength || base.items[i]?.strength || ""),
        flute: String(item.flute || base.items[i]?.flute || ""),
        use: String(item.use || base.items[i]?.use || ""),
        imageUrl: String(item.imageUrl || item.image || ""),
        ply: (item.ply as PlyType) || plyOrder[i] || "3",
      })),
    };
  }

  return base;
}

function normalizeSustainability(raw: Record<string, unknown> | undefined) {
  const base = DEFAULT_SITE_CONTENT.sustainability;
  if (!raw) return base;

  return {
    eyebrow: (raw.eyebrow as string) || base.eyebrow,
    title: (raw.title as string) || base.title,
    description: (raw.description as string) || base.description,
    stats:
      Array.isArray(raw.stats) && raw.stats.length
        ? (raw.stats as SustainabilityStat[]).slice(0, 8)
        : base.stats,
  };
}

function normalizeContact(raw: Record<string, unknown> | undefined) {
  const base = DEFAULT_SITE_CONTENT.contact;
  if (!raw) return base;

  return {
    eyebrow: (raw.eyebrow as string) || base.eyebrow,
    title: (raw.title as string) || base.title,
    description: (raw.description as string) || base.description,
    phone: (raw.phone as string) || base.phone,
    email: (raw.email as string) || base.email,
    address: (raw.address as string) || base.address,
    mapUrl: (raw.mapUrl as string) || base.mapUrl,
    mapLabel: (raw.mapLabel as string) || base.mapLabel,
    coordinates: (raw.coordinates as string) || base.coordinates,
    infoHeadline: (raw.infoHeadline as string) || base.infoHeadline,
    infoSubtext: (raw.infoSubtext as string) || base.infoSubtext,
    formSubmitLabel: (raw.formSubmitLabel as string) || base.formSubmitLabel,
    whatsappMessage: (raw.whatsappMessage as string) || base.whatsappMessage,
    trustPoints:
      Array.isArray(raw.trustPoints) && raw.trustPoints.length
        ? (raw.trustPoints as string[])
        : base.trustPoints,
    officeHours:
      Array.isArray(raw.officeHours) && raw.officeHours.length
        ? (raw.officeHours as OfficeHour[])
        : base.officeHours,
  };
}

function normalizeSiteSettings(raw: Record<string, unknown> | undefined) {
  const base = DEFAULT_SITE_CONTENT.siteSettings;
  if (!raw) return base;
  return {
    headerCta: (raw.headerCta as string) || base.headerCta,
    footerHeadline: (raw.footerHeadline as string) || base.footerHeadline,
    nav:
      Array.isArray(raw.nav) && raw.nav.length
        ? (raw.nav as NavLink[])
        : base.nav,
    socialLinks:
      Array.isArray(raw.socialLinks)
        ? (raw.socialLinks as { label: string; url: string }[])
            .filter((s) => s.label && s.url)
            .slice(0, 8)
        : [],
  };
}

export function normalizeSiteContent(raw: Record<string, unknown> | null): SiteContentData {
  if (!raw || Object.keys(raw).length === 0) {
    return DEFAULT_SITE_CONTENT;
  }

  const heroRaw = raw.hero as Record<string, unknown> | undefined;
  const heroBase = DEFAULT_SITE_CONTENT.hero;

  return {
    seo: {
      ...DEFAULT_SITE_CONTENT.seo,
      ...((raw.seo as object) || {}),
    },
    siteSettings: normalizeSiteSettings(raw.siteSettings as Record<string, unknown>),
    hero: {
      ...heroBase,
      ...(heroRaw as object),
      stats: normalizeStats(heroRaw?.stats, heroBase.stats),
    },
    trustBar: {
      industries:
        Array.isArray((raw.trustBar as { industries?: string[] })?.industries) &&
        (raw.trustBar as { industries: string[] }).industries.length
          ? (raw.trustBar as { industries: string[] }).industries
          : DEFAULT_SITE_CONTENT.trustBar.industries,
    },
    about: normalizeAbout(raw.about as Record<string, unknown>),
    process: normalizeProcess(raw.process),
    products: normalizeProducts(raw.products),
    sustainability: normalizeSustainability(raw.sustainability as Record<string, unknown>),
    marqueeCta: {
      ...DEFAULT_SITE_CONTENT.marqueeCta,
      ...((raw.marqueeCta as object) || {}),
    },
    contact: normalizeContact(raw.contact as Record<string, unknown>),
    company: {
      ...DEFAULT_SITE_CONTENT.company,
      ...(raw.company as object),
      gstin: (raw.company as { gstin?: string })?.gstin || "",
      certifications:
        (raw.company as { certifications?: { name: string; imageUrl?: string }[] })
          ?.certifications || DEFAULT_SITE_CONTENT.company.certifications,
    },
  };
}
