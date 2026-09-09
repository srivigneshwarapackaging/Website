"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/** Premium kraft gold — primary admin actions */
export const adminPrimaryClass =
  "bg-gradient-to-r from-kraft to-kraft-dark text-charcoal shadow-lg shadow-kraft/25 hover:from-kraft-light hover:to-kraft";

export function CorrugatedStripes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-[0.05]", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent, transparent 11px, rgba(196,165,116,0.55) 11px, rgba(196,165,116,0.55) 12px)",
      }}
    />
  );
}

export function AdminPanel({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "kraft" | "accent" | "none";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-panel)] border border-white/10 bg-charcoal-soft/80 shadow-[var(--shadow-float)] backdrop-blur-xl",
        glow === "kraft" && "ring-1 ring-kraft/10",
        glow === "accent" && "ring-1 ring-accent/10",
        className
      )}
    >
      <CorrugatedStripes />
      <div className="relative">{children}</div>
    </div>
  );
}

export function AdminStatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <AdminPanel className={cn("p-5", accent && "bg-charcoal text-white")} glow={accent ? "kraft" : "none"}>
      {icon && <div className="mb-3 text-kraft-light">{icon}</div>}
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold tracking-tight text-white">{value}</p>
    </AdminPanel>
  );
}

export function AdminChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-all",
        active
          ? cn(adminPrimaryClass, "shadow-kraft/30")
          : "border border-white/10 bg-white/5 text-stone-400 hover:border-kraft/30 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

export function AdminButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "outline";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-[0.98] disabled:opacity-50",
        variant === "primary" && adminPrimaryClass,
        variant === "ghost" &&
          "border border-white/10 bg-white/5 text-stone-300 hover:border-kraft/30 hover:text-white",
        variant === "outline" &&
          "border border-white/15 text-stone-300 hover:border-kraft/40 hover:text-white",
        variant === "danger" &&
          "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "mt-1.5 w-full rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-sm text-white placeholder:text-stone-600 outline-none transition-colors focus:border-kraft/40 focus:ring-1 focus:ring-kraft/20",
        className
      )}
      {...props}
    />
  );
}

export function AdminTextarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "mt-1.5 w-full rounded-xl border border-white/10 bg-charcoal/60 px-4 py-3 text-sm text-white placeholder:text-stone-600 outline-none transition-colors focus:border-kraft/40 focus:ring-1 focus:ring-kraft/20",
        className
      )}
      {...props}
    />
  );
}

export function AdminField({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="mb-5">
      <label className="text-[10px] font-black uppercase tracking-[0.28em] text-stone-500">
        {label}
      </label>
      {textarea ? (
        <AdminTextarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      ) : (
        <AdminInput value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function AdminEditorSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <AdminPanel className="mb-5 p-5">
      {title && (
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-kraft-light">
          {title}
        </p>
      )}
      {children}
    </AdminPanel>
  );
}

export function AdminLoader({ label = "Loading portal…" }: { label?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-charcoal text-stone-400">
      <Loader2 className="mb-4 h-10 w-10 animate-spin text-kraft" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</p>
    </div>
  );
}

export function AdminBadge({
  children,
  tone = "kraft",
}: {
  children: React.ReactNode;
  tone?: "accent" | "kraft" | "neutral";
}) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest",
        (tone === "accent" || tone === "kraft") && "bg-kraft text-charcoal",
        tone === "neutral" && "bg-white/10 text-stone-400"
      )}
    >
      {children}
    </span>
  );
}

export function AdminStatusDot({ live }: { live?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
      <span className="relative flex h-2 w-2">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            live ? "bg-emerald-500" : "bg-stone-600"
          )}
        />
      </span>
      {live ? "Live" : "Idle"}
    </span>
  );
}
