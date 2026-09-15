import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "wide" | "narrow" | "full";
}

/**
 * Premium container with responsive padding
 * Max width: 1400px (wide) | 800px (narrow)
 * Padding: 24px (mobile) | 32px (tablet) | 64px (desktop)
 */
export function Container({ children, className, size = "wide" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-6 md:px-8 lg:px-16",
        size === "wide" && "max-w-[1400px]",
        size === "narrow" && "max-w-3xl",
        size === "full" && "max-w-none",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  padding?: "default" | "lg" | "xl" | "none";
}

/**
 * Section component with consistent vertical spacing
 * Default: 80px (mobile) | 100px (tablet) | 140px (desktop)
 */
export function Section({ id, children, className, padding = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        padding === "default" && "py-20 md:py-24 lg:py-32",
        padding === "lg" && "py-24 md:py-32 lg:py-40",
        padding === "xl" && "py-32 md:py-40 lg:py-48",
        padding === "none" && "",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Section header with eyebrow, heading, and optional description
 */
interface SectionHeaderProps {
  eyebrow?: string;
  heading: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-hero text-[clamp(2.5rem,4vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
        {heading}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-text-secondary max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Small eyebrow label with copper accent
 */
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3",
        "text-[11px] font-bold uppercase tracking-[0.15em] text-copper mb-5",
        className
      )}
    >
      <span className="h-px w-6 bg-copper/60" />
      {children}
    </p>
  );
}
