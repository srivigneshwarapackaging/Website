import type { ProductItem } from "@/shared/types/content-types";

export function plyLabel(ply: ProductItem["ply"]) {
  if (ply === "diecut") return "Custom";
  return `${ply}-ply`;
}
