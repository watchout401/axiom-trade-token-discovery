"use client";

import { Info } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Token } from "@/types/token";
import { formatPercent } from "@/lib/format";

interface TokenInfoPopoverProps {
  token: Token;
}

export function TokenInfoPopover({ token }: TokenInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:border-border/70 hover:bg-muted/20 hover:text-foreground">
        <Info className="h-4 w-4" aria-hidden />
        <span className="sr-only">Open token metrics</span>
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl border-border/50 bg-surface/95 p-4 shadow-xl">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-foreground">Token Intel</span>
            <span className="text-xs text-muted-foreground">
              Real-time metrics sampled from the Axiom Trade signal engine.
            </span>
          </header>
          <div className="flex flex-col gap-3 text-sm">
            <MetricRow label="Market Cap Δ" value={formatPercent(token.marketCapChange24h, 2)} />
            {token.metrics.map((metric) => (
              <MetricRow
                key={metric.label}
                label={metric.label}
                value={`${metric.value}/100`}
                tone={metric.direction}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MetricRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "up" | "down" | "neutral";
}) {
  const toneClass =
    tone === "up" ? "text-positive" : tone === "down" ? "text-negative" : "text-muted-foreground";

  return (
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
      <span>{label}</span>
      <span className={`font-semibold tracking-tight ${toneClass}`}>{value}</span>
    </div>
  );
}

