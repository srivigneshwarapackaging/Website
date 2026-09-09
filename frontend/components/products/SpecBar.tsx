"use client";

import { motion } from "framer-motion";
import { EASE } from "./shared";

export function SpecBar({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2 text-kraft-light">
        <Icon size={14} />
        <span className="text-[9px] font-black uppercase tracking-[0.25em]">{label}</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="font-display text-2xl font-bold text-white">{value}%</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-kraft to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: EASE }}
          />
        </div>
      </div>
    </div>
  );
}
