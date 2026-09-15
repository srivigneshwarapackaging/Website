import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  arrow?: boolean;
}

/**
 * Premium minimal button system
 * Primary: Solid copper with subtle hover darkening
 * Secondary/Outline: Transparent with charcoal text
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, icon, arrow, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2",
        "rounded-[10px] px-7 py-3.5 text-sm font-semibold tracking-wide",
        "transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-3",
        // Primary: Solid copper
        variant === "primary" && [
          "bg-copper text-white",
          "hover:bg-copper-dark",
          "shadow-sm hover:shadow-md",
        ],
        // Secondary: Copper border, copper text
        variant === "secondary" && [
          "bg-transparent text-copper",
          "border border-copper/40",
          "hover:bg-copper/5 hover:border-copper",
        ],
        // Outline: Neutral border, charcoal text
        variant === "outline" && [
          "bg-transparent text-charcoal",
          "border border-charcoal/15",
          "hover:border-copper hover:text-copper",
        ],
        // Ghost: No border, minimal
        variant === "ghost" && [
          "bg-transparent text-charcoal",
          "hover:text-copper hover:bg-copper/5",
        ],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {arrow && (
        <span className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  )
);
Button.displayName = "Button";

// Link-style button for less prominent CTAs
export const LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "group inline-flex items-center gap-2",
        "text-sm font-semibold text-charcoal",
        "hover:text-copper",
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </button>
  )
);
LinkButton.displayName = "LinkButton";
