import { cn } from "@/lib/utils";

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
        "font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal tracking-[-0.03em] leading-[0.92] text-stone-900 dark:text-stone-50",
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
        "text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-[1.7] font-light",
        className
      )}
    >
      {children}
    </p>
  );
}
