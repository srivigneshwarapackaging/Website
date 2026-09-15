import { cn } from "@/lib/utils";

interface TechnicalLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "copper" | "muted";
}

/**
 * Technical label for engineering callouts
 * Uppercase, tracked, small font
 * Used for: ECT ratings, flute types, specifications
 */
export function TechnicalLabel({ children, className, variant = "default" }: TechnicalLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "text-[10px] font-semibold uppercase tracking-[0.1em]",
        "px-2 py-1 rounded-[6px]",
        "border",
        variant === "default" && [
          "bg-warm-50 text-text-muted",
          "border-charcoal/5",
        ],
        variant === "copper" && [
          "bg-copper/5 text-copper-dark",
          "border-copper/20",
        ],
        variant === "muted" && [
          "bg-transparent text-text-muted",
          "border-transparent",
        ],
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Technical specification row
 * Label + Value pair
 */
interface TechSpecProps {
  label: string;
  value: string;
  className?: string;
}

export function TechSpec({ label, value, className }: TechSpecProps) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-text-primary">{value}</span>
    </div>
  );
}

/**
 * Small section number indicator
 * Large display number for editorial sections
 */
interface SectionNumberProps {
  number: string | number;
  className?: string;
  size?: "sm" | "lg";
}

export function SectionNumber({ number, className, size = "lg" }: SectionNumberProps) {
  return (
    <span
      className={cn(
        "font-hero font-bold text-copper/30 tabular-nums",
        size === "lg" && "text-5xl md:text-6xl",
        size === "sm" && "text-2xl",
        className
      )}
    >
      {String(number).padStart(2, "0")}
    </span>
  );
}
