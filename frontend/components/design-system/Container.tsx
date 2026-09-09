import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "wide",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-10",
        size === "wide" ? "max-w-6xl" : "max-w-3xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 md:py-32", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
