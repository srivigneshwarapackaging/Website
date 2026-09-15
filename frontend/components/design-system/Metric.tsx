import { cn } from "@/lib/utils";

interface MetricProps {
  value: string | number;
  label: string;
  className?: string;
  variant?: "default" | "copper" | "muted";
}

/**
 * Metric component for trust metrics
 * Large value + small label
 * Used for: 30+ Years, 240T Capacity, etc.
 */
export function Metric({ value, label, className, variant = "default" }: MetricProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "font-hero font-bold text-[clamp(2rem,4vw,3rem)] leading-none tabular-nums",
          variant === "default" && "text-text-primary",
          variant === "copper" && "text-copper-dark",
          variant === "muted" && "text-text-secondary",
        )}
      >
        {value}
      </div>
      <p className="text-sm font-medium text-text-muted uppercase tracking-wide">{label}</p>
    </div>
  );
}

/**
 * Trust metrics row - horizontal on desktop, grid on mobile
 */
interface TrustMetricsProps {
  metrics: Array<{ value: string | number; label: string }>;
  className?: string;
}

export function TrustMetrics({ metrics, className }: TrustMetricsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-4",
        "md:flex-row md:justify-center",
        className
      )}
    >
      {metrics.map((metric, index) => (
        <Metric
          key={index}
          value={metric.value}
          label={metric.label}
          className="min-w-[80px]"
        />
      ))}
    </div>
  );
}