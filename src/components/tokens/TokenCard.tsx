"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { TokenActivityBar } from "@/components/tokens/TokenActivityBar";
import { TokenAvatar } from "@/components/tokens/TokenAvatar";
import { TokenMetricsList } from "@/components/tokens/TokenMetricsList";
import { TokenQuickStats } from "@/components/tokens/TokenQuickStats";
import { TokenStatusBadge } from "@/components/tokens/TokenStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { selectRealtimeById, selectTokenById } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import { formatAge } from "@/lib/format";
import { cn } from "@/lib/utils";

interface TokenCardProps {
  tokenId: string;
  onClick?: () => void;
}

export function TokenCard({ tokenId, onClick }: TokenCardProps) {
  const token = useAppSelector((state) => selectTokenById(tokenId)(state));
  const realtime = useAppSelector((state) => selectRealtimeById(tokenId)(state));

  const highlightClass = useMemo(() => {
    if (!realtime) return "";
    if (realtime.direction === "up") return "after:bg-positive/10";
    if (realtime.direction === "down") return "after:bg-negative/10";
    return "";
  }, [realtime]);

  if (!token) return null;

  const detailedAge = (() => {
    if (!token) return "";
    const minutes = Math.floor(token.ageInSeconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  })();

  return (
    <motion.button
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={cn(
        "group relative flex w-full flex-col gap-4 overflow-hidden rounded-xl border border-border/60 bg-card/80 p-4 text-left transition-all hover:border-accent hover:bg-card",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:transition-opacity",
        highlightClass,
        realtime ? "after:opacity-100" : "",
      )}
    >
      <div className="flex items-start gap-3">
        <TokenAvatar name={token.name} src={token.logo} size={48} className="shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{token.name}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {token.ticker}
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="cursor-help bg-muted/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Age {formatAge(token.ageInSeconds)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{`Listed ${detailedAge}`}</TooltipContent>
            </Tooltip>
          </div>
          <TokenStatusBadge status={token.status} platform={token.platform} />
        </div>
      </div>

      <TokenQuickStats token={token} />

      <TokenActivityBar token={token} />

      <div className="flex items-center justify-between">
        <TokenMetricsList token={token} />
      </div>

      {realtime ? (
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Realtime update</span>
          <span
            className={cn(
              realtime.percentChange >= 0 ? "text-positive" : "text-negative",
              "rounded-md bg-muted/30 px-2 py-0.5",
            )}
          >
            {realtime.percentChange > 0 ? "+" : ""}
            {realtime.percentChange.toFixed(2)}%
          </span>
        </div>
      ) : null}
    </motion.button>
  );
}

