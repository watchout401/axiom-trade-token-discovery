import { cn } from "@/lib/utils";
import type { TokenMetric } from "@/types/token";

interface MetricIndicatorProps {
  metric: TokenMetric;
}

export function MetricIndicator({ metric }: MetricIndicatorProps) {
  const color =
    metric.direction === "up"
      ? "text-positive"
      : metric.direction === "down"
        ? "text-negative"
        : "text-muted-foreground";

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/30 px-3 py-2">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{metric.label}</span>
      <span className={cn("text-xs font-semibold", color)}>{metric.value}</span>
    </div>
  );
}

