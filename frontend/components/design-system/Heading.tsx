import { cn } from "@/lib/utils";

/**
 * Section display heading — Syne (§4).
 * Instrument Serif is reserved for selective editorial emphasis via
 * <EditorialAccent>, never for whole headings.
 */
export function DisplayHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-hero text-[clamp(2.25rem,4vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function BodyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-lg leading-[1.7] text-text-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Editorial accent — Instrument Serif, italic, for emphasising a few words
 * inside an otherwise Syne headline. Use sparingly (§4).
 */
export function EditorialAccent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <em className={cn("font-display font-normal not-italic", className)}>
      {children}
    </em>
  );
}
