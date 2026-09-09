import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-5",
        className
      )}
    >
      <span className="h-px w-8 bg-accent/60" />
      {children}
    </p>
  );
}
