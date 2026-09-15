import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  showLine?: boolean;
}

/**
 * Small eyebrow label with copper accent
 * Used for section categories, technical labels
 */
export function Eyebrow({ children, className, showLine = true }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3",
        "text-[11px] font-bold uppercase tracking-[0.15em] text-copper mb-5",
        className
      )}
    >
      {showLine && <span className="h-px w-6 bg-copper/60" />}
      {children}
    </p>
  );
}
