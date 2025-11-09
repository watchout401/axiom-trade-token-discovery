import { formatCompactCurrency, formatPercent } from "@/lib/format";
import type { Token } from "@/types/token";

interface TokenQuickStatsProps {
  token: Token;
  layout?: "column" | "row";
}

const statDefinitions = [
  {
    key: "marketCap" as const,
    label: "Market Cap",
    formatter: formatCompactCurrency,
  },
  {
    key: "liquidity" as const,
    label: "Liquidity",
    formatter: formatCompactCurrency,
  },
  {
    key: "volume24h" as const,
    label: "Volume 24h",
    formatter: formatCompactCurrency,
  },
  {
    key: "transactionCount" as const,
    label: "TXNS",
    formatter: (value: number) => value.toLocaleString(),
  },
];

export function TokenQuickStats({ token, layout = "column" }: TokenQuickStatsProps) {
  return (
    <div
      className={
        layout === "column"
          ? "grid grid-cols-2 gap-x-3 gap-y-2"
          : "flex shrink-0 items-center gap-6"
      }
    >
      {statDefinitions.map((stat) => {
        const value = token[stat.key];
        return (
          <div key={stat.key} className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {stat.formatter(value)}
            </span>
            {stat.key === "marketCap" ? (
              <span
                className={`text-[11px] font-medium ${
                  token.marketCapChange24h >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                {formatPercent(token.marketCapChange24h, 1)}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

