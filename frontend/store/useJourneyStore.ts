import { create } from "zustand";

export type JourneySectionId =
  | "hero"
  | "about"
  | "process"
  | "products"
  | "sustainability"
  | "contact";

export type ProductVariant = "ply3" | "ply5" | "ply7" | "diecut";

export const JOURNEY_SECTIONS: JourneySectionId[] = [
  "hero",
  "about",
  "process",
  "products",
  "sustainability",
  "contact",
];

export const PRODUCT_VARIANTS: ProductVariant[] = [
  "ply3",
  "ply5",
  "ply7",
  "diecut",
];

interface JourneyState {
  progress: number;
  sectionProgress: number;
  activeSection: JourneySectionId;
  processStation: number;
  productVariant: ProductVariant;
  productVariantLocked: boolean;
  is3DEnabled: boolean;
  reducedMotion: boolean;
  setIs3DEnabled: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  syncFromScroll: (payload: {
    globalProgress: number;
    activeSection: JourneySectionId;
    sectionProgress: number;
  }) => void;
  setProductVariant: (variant: ProductVariant) => void;
  setProductVariantLocked: (locked: boolean) => void;
}

export function sectionFromProgress(progress: number): JourneySectionId {
  const index = Math.min(
    JOURNEY_SECTIONS.length - 1,
    Math.floor(progress * JOURNEY_SECTIONS.length)
  );
  return JOURNEY_SECTIONS[index];
}

export function processStationFromProgress(sectionProgress: number): number {
  return Math.min(3, Math.floor(sectionProgress * 4));
}

export function productVariantFromProgress(
  sectionProgress: number
): ProductVariant {
  return PRODUCT_VARIANTS[Math.min(3, Math.floor(sectionProgress * 4))];
}

/** Resolve active section from actual DOM positions (unequal section heights) */
export function computeSectionFromDOM(): {
  activeSection: JourneySectionId;
  sectionProgress: number;
} {
  if (typeof window === "undefined") {
    return { activeSection: "hero", sectionProgress: 0 };
  }

  const scrollY = window.scrollY;
  const viewport = window.innerHeight;
  const focus = scrollY + viewport * 0.42;

  for (const id of JOURNEY_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const top = scrollY + rect.top;
    const height = rect.height;
    const bottom = top + height;

    if (focus >= top && focus < bottom) {
      const scrollable = Math.max(1, height - viewport * 0.35);
      const sectionProgress = Math.min(
        1,
        Math.max(0, (focus - top) / scrollable)
      );
      return { activeSection: id, sectionProgress };
    }
  }

  // Gap fallback: pick nearest section center (avoids spurious "contact" jumps)
  let nearest: JourneySectionId = "hero";
  let nearestDist = Infinity;
  for (const id of JOURNEY_SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = scrollY + rect.top;
    const center = top + rect.height / 2;
    const dist = Math.abs(focus - center);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = id;
    }
  }

  if (scrollY <= 0) return { activeSection: "hero", sectionProgress: 0 };
  return { activeSection: nearest, sectionProgress: 0 };
}

export const useJourneyStore = create<JourneyState>((set) => ({
  progress: 0,
  sectionProgress: 0,
  activeSection: "hero",
  processStation: 0,
  productVariant: "ply3",
  productVariantLocked: false,
  is3DEnabled: true,
  reducedMotion: false,
  setIs3DEnabled: (is3DEnabled) => set({ is3DEnabled }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setProductVariant: (productVariant) => set({ productVariant }),
  setProductVariantLocked: (productVariantLocked) =>
    set({ productVariantLocked }),
  syncFromScroll: ({ globalProgress, activeSection, sectionProgress }) => {
    const locked = useJourneyStore.getState().productVariantLocked;
    set({
      progress: Math.min(1, Math.max(0, globalProgress)),
      activeSection,
      sectionProgress,
      processStation:
        activeSection === "process"
          ? processStationFromProgress(sectionProgress)
          : 0,
      productVariant:
        activeSection === "products" && !locked
          ? productVariantFromProgress(sectionProgress)
          : activeSection === "products"
            ? useJourneyStore.getState().productVariant
            : "ply3",
      productVariantLocked:
        activeSection === "products"
          ? locked
          : false,
    });
  },
}));
