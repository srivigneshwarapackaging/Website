import type { ProductItem } from "@/shared/types/content-types";
import { Layers, Shield, Package } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const ACCENTS = ["#c4a574", "#b45309", "#e8d5b7", "#065f46"];
export const APPLICATIONS = [
  "E-commerce",
  "FMCG",
  "Pharma cold chain",
  "Export",
  "Retail display",
];

export function plyLabel(ply: ProductItem["ply"]) {
  if (ply === "diecut") return "Custom";
  return `${ply}-ply`;
}

export function specsFor(ply: ProductItem["ply"]) {
  const n = ply === "diecut" ? 5 : Number(ply) || 3;
  const t = Math.min(1, Math.max(0, (n - 2) / 5));
  return [
    { icon: Shield, label: "Stack strength", value: Math.round(45 + t * 50) },
    { icon: Layers, label: "Burst resist", value: Math.round(40 + t * 55) },
    { icon: Package, label: "Cushioning", value: Math.round(55 + t * 40) },
  ];
}
