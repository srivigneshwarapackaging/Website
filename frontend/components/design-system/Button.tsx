import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline";

/** Premium kraft gold — matches admin portal primary actions */
export const primaryButtonClass =
  "bg-gradient-to-r from-kraft to-kraft-dark text-charcoal shadow-lg shadow-kraft/25 hover:from-kraft-light hover:to-kraft hover:shadow-xl hover:shadow-kraft/30";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-bold tracking-tight transition-all duration-300 active:scale-[0.98] disabled:opacity-50",
        variant === "primary" && primaryButtonClass,
        variant === "ghost" &&
          "bg-charcoal text-white hover:bg-black dark:bg-zinc-100 dark:text-charcoal dark:hover:bg-white ring-1 ring-stone-200/20",
        variant === "outline" &&
          "border border-stone-300/80 bg-white/50 text-stone-800 backdrop-blur-sm hover:border-kraft hover:text-kraft-dark dark:border-zinc-600 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:border-kraft dark:hover:text-kraft-light",
        className
      )}
      {...props}
    >
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/30 to-white/0 transition-transform duration-700 group-hover:translate-x-[100%]" />
      )}
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  )
);
Button.displayName = "Button";
