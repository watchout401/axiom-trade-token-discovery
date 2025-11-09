const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const formatCompactCurrency = (value: number) =>
  compactNumberFormatter.format(value);

export const formatPercent = (value: number, fractionDigits = 1) =>
  `${value > 0 ? "+" : ""}${value.toFixed(fractionDigits)}%`;

export const formatAge = (seconds: number) => {
  if (seconds < 60) {
    return `${Math.max(1, Math.floor(seconds))}s`;
  }
  if (seconds < 3_600) {
    return `${Math.floor(seconds / 60)}m`;
  }
  if (seconds < 86_400) {
    return `${Math.floor(seconds / 3_600)}h`;
  }
  return `${Math.floor(seconds / 86_400)}d`;
};

export const formatNumber = (value: number) => compactNumberFormatter.format(value);

