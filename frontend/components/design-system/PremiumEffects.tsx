import { cn } from "@/lib/utils";

export function GrainOverlay() {
  return <div className="grain pointer-events-none fixed inset-0 z-[100]" aria-hidden />;
}

export function AmbientGlow({
  className,
  color = "accent",
}: {
  className?: string;
  color?: "accent" | "kraft" | "eco";
}) {
  const colors = {
    accent: "from-kraft/20 via-transparent to-transparent",
    kraft: "from-kraft/25 via-transparent to-transparent",
    eco: "from-emerald-500/15 via-transparent to-transparent",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl bg-gradient-radial",
        colors[color],
        className
      )}
      style={{
        background:
          color === "accent"
            ? "radial-gradient(circle, rgba(196,165,116,0.18) 0%, transparent 70%)"
            : color === "kraft"
              ? "radial-gradient(circle, rgba(196,165,116,0.2) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
      }}
    />
  );
}

export function SectionDivider() {
  return (
    <div className="section-line mx-auto max-w-[42rem] px-6 lg:px-12 my-4" aria-hidden />
  );
}

export function ScrollCue() {
  return (
    <div className="hidden md:flex items-center gap-3 mt-16 animate-float">
      <div className="flex flex-col items-center gap-2">
        <span className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400 [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
      </div>
    </div>
  );
}

export function JourneyProgressRail() {
  return null; // rendered in JourneyExperience
}
