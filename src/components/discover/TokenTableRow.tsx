"use client";

import { motion } from "framer-motion";

import { TokenAvatar } from "@/components/tokens/TokenAvatar";
import { TokenStatusBadge } from "@/components/tokens/TokenStatusBadge";
import { TokenInfoPopover } from "@/components/popovers/TokenInfoPopover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatAge, formatCompactCurrency, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { selectRealtimeById, selectTokenById } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

interface TokenTableRowProps {
  tokenId: string;
  index: number;
  onInspect?: (tokenId: string) => void;
  onQuickBuy?: (tokenId: string) => void;
}

const MotionTableRow = motion(TableRow);

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + index * 0.06,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

export function TokenTableRow({ tokenId, index, onInspect, onQuickBuy }: TokenTableRowProps) {
  const token = useAppSelector((state) => selectTokenById(tokenId)(state));
  const realtime = useAppSelector((state) => selectRealtimeById(tokenId)(state));

  if (!token) return null;

  const highlightClass = realtime
    ? realtime.direction === "up"
      ? "bg-positive/5"
      : "bg-negative/5"
    : undefined;

  const detailedAge = (() => {
    const minutes = Math.floor(token.ageInSeconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  })();

  return (
    <MotionTableRow
      layout
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={rowVariants}
      custom={index}
      className={cn(
        "group relative cursor-pointer text-sm transition-colors hover:bg-hover/30",
        highlightClass,
      )}
      onClick={() => onInspect?.(token.id)}
    >
      <TableCell className="sticky left-0 z-20 w-[220px] bg-surface/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <TokenAvatar src={token.logo} name={token.name} size={40} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{token.name}</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {token.ticker}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[110px]">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">{formatCompactCurrency(token.marketCap)}</span>
          <span
            className={cn(
              "text-xs font-medium",
              token.marketCapChange24h >= 0 ? "text-positive" : "text-negative",
            )}
          >
            {formatPercent(token.marketCapChange24h, 2)}
          </span>
        </div>
      </TableCell>
      <TableCell className="w-[110px] text-sm font-medium">
        {formatCompactCurrency(token.liquidity)}
      </TableCell>
      <TableCell className="w-[110px] text-sm font-medium">
        {formatCompactCurrency(token.volume24h)}
      </TableCell>
      <TableCell className="w-[100px] text-sm font-medium">
        <div className="flex flex-col gap-1">
          <span>{token.transactionCount.toLocaleString()}</span>
          <span className="text-[11px] text-muted-foreground">
            {token.buyCount.toLocaleString()} buys · {token.sellCount.toLocaleString()} sells
          </span>
        </div>
      </TableCell>
      <TableCell className="w-[160px]">
        <div className="flex items-center justify-between gap-3">
          <TokenStatusBadge status={token.status} platform={token.platform} />
          <TokenInfoPopover token={token} />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Badge className="bg-muted/40 px-2 py-0.5 uppercase tracking-wide text-muted-foreground">{`Pro ${token.proTraders}`}</Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">Age {formatAge(token.ageInSeconds)}</span>
            </TooltipTrigger>
            <TooltipContent>{`Listed ${detailedAge}`}</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
      <TableCell className="sticky right-0 z-20 w-[100px] bg-surface/95 text-right">
        <div className="flex justify-end gap-2">
          {realtime ? (
            <Badge
              className={cn(
                "px-2 py-1 text-[11px] font-medium",
                realtime.percentChange >= 0 ? "bg-positive/20 text-positive" : "bg-negative/20 text-negative",
              )}
            >
              {realtime.percentChange > 0 ? "+" : ""}
              {realtime.percentChange.toFixed(2)}%
            </Badge>
          ) : null}
          <Button
            size="sm"
            variant="secondary"
            className="bg-primary/20 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/30"
            onClick={(event) => {
              event.stopPropagation();
              onQuickBuy?.(token.id);
            }}
          >
            Buy
          </Button>
        </div>
      </TableCell>
    </MotionTableRow>
  );
}

