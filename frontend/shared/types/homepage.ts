import { z } from "zod";

const section = z.object({
  eyebrow: z.string().max(200),
  title: z.string().max(300),
  description: z.string().max(3000),
  imageUrl: z.string().max(2000).default(""),
  cta: z.string().max(100).default(""),
  items: z.array(z.object({
    title: z.string().max(200),
    description: z.string().max(1000),
    imageUrl: z.string().max(2000).default(""),
  })).max(12).default([]),
});
export const homepageSchema = z.object({
  belief: section, materials: section, solutions: section, why: section,
  lab: section, applications: section,
  principles: z.array(z.string().max(500)).max(12),
});
export type HomepageContent = z.infer<typeof homepageSchema>;
const base = { imageUrl: "", cta: "", items: [] };
export const DEFAULT_HOMEPAGE: HomepageContent = {
  belief: { ...base, eyebrow: "Our belief", title: "Stronger businesses travel further.", description: "We craft corrugated packaging that protects what matters—and helps your business move forward with confidence." },
  materials: { ...base, eyebrow: "The material film", title: "It begins with a simpler material.", description: "Kraft paper is transformed into corrugated structure—engineered to protect what moves through your business.", items: [
    { title: "Kraft paper", description: "A strong foundation", imageUrl: "/materials/kraft-roll.png" },
    { title: "Flute", description: "Engineered for strength", imageUrl: "/materials/kraft-flute.png" },
    { title: "Corrugated board", description: "Ready for what’s next", imageUrl: "/materials/corrugated-board.png" },
  ] },
  solutions: { ...base, eyebrow: "Solutions", title: "Packaging for a wider tomorrow.", description: "From everyday essentials to complex supply chains, every construction is designed to perform wherever your business goes.", cta: "Explore our solutions", imageUrl: "/materials/open-diecut-box.png" },
  why: { ...base, eyebrow: "Why Sri Vigneshwara", title: "Packaging for businesses that demand more.", description: "Most packaging problems are specification problems. We start with what you ship, how it is handled and how often you reorder — then build to that.", items: [
    { title: "Consistent supply", description: "Production capability designed for recurring requirements.", imageUrl: "" },
    { title: "Engineered performance", description: "Packaging construction selected around product, load and application.", imageUrl: "" },
    { title: "Custom fit", description: "Dimensions, flute, ply and die-cut configurations tailored to requirements.", imageUrl: "" },
    { title: "30+ years", description: "Three decades of manufacturing experience and customer relationships.", imageUrl: "" },
  ] },
  lab: { ...base, eyebrow: "The Lab", title: "Not sure of the spec? Build it.", description: "A set of tools for working out the construction, the board and the dimensions before you ask for a price.", cta: "Open the Lab", items: [
    { title: "Ply construction", description: "Match the number of walls to the weight you ship.", imageUrl: "" },
    { title: "Board & flute", description: "Turn a box and see the cross-section of each flute profile.", imageUrl: "" },
    { title: "Configure your box", description: "Dimensions, print and run size — a spec you can send us.", imageUrl: "" },
  ] },
  applications: { ...base, eyebrow: "Applications", title: "Packaging for the way you ship.", description: "Construction is chosen around the load and the handling it will see — not the industry label. These are the sectors we supply most." },
  principles: ["Closed-loop industrial paper scrap recycling", "Zero plastic lining or hazardous solvent inks", "Compostable, biodegradable board matrix"],
};

export function normalizeHomepage(raw: unknown): HomepageContent {
  const input = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const result = { ...DEFAULT_HOMEPAGE };
  for (const key of ["belief", "materials", "solutions", "why", "lab", "applications"] as const) {
    const parsed = section.safeParse({ ...DEFAULT_HOMEPAGE[key], ...(input[key] as object || {}) });
    result[key] = parsed.success ? parsed.data : DEFAULT_HOMEPAGE[key];
  }
  const principles = homepageSchema.shape.principles.safeParse(input.principles);
  result.principles = principles.success ? principles.data : DEFAULT_HOMEPAGE.principles;
  return result;
}
