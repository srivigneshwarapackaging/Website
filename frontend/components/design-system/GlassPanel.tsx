import { cn } from "@/lib/utils";
import { Counter } from "@/components/motion/Counter";

export function GlassPanel({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-panel)] border border-stone-200/60 bg-white/90 p-8 md:p-10 shadow-[var(--shadow-panel)] backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/90 overflow-hidden",
        glow && "shadow-[var(--shadow-glow)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-kraft/5 dark:from-white/5 dark:to-kraft/5" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function StatCard({
  value,
  label,
  className,
  accent = "emerald",
}: {
  value: string;
  label: string;
  className?: string;
  accent?: "emerald" | "gold" | "red";
}) {
  const valueColor = {
    emerald: "text-emerald-700 dark:text-emerald-400",
    gold: "text-gradient-gold",
    red: "text-gradient-gold",
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-stone-100/80 bg-gradient-to-br from-stone-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950",
        className
      )}
    >
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={cn("text-3xl md:text-4xl font-display font-bold mb-2", valueColor[accent])}>
        <Counter value={value} />
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
        {label}
      </div>
    </div>
  );
}

export function ImageSlot({
  label,
  imageUrl,
  className,
  aspect = "video",
}: {
  label: string;
  imageUrl?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait";
}) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[4/5]"
        : "aspect-video";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl ring-1 ring-stone-200/80 dark:ring-zinc-700/80",
        aspectClass,
        className
      )}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      ) : (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-charcoal-soft p-6 text-center">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(196,165,116,0.08) 8px, rgba(196,165,116,0.08) 9px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-kraft/10 via-transparent to-accent/5" />
          <span className="relative text-[10px] font-black uppercase tracking-[0.25em] text-kraft-light/80">
            {label}
          </span>
          <span className="relative mt-2 text-xs text-stone-500">
            Premium asset slot
          </span>
        </div>
      )}
    </div>
  );
}
