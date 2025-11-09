import { MetricIndicator } from "@/components/tokens/MetricIndicator";
import type { Token } from "@/types/token";

interface TokenMetricsListProps {
  token: Token;
}

export function TokenMetricsList({ token }: TokenMetricsListProps) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto pb-1">
      {token.metrics.map((metric) => (
        <MetricIndicator key={metric.label} metric={metric} />
      ))}
    </div>
  );
}

