"use client";

import { TokenStatusBadge } from "@/components/tokens/TokenStatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TokenAvatar } from "@/components/tokens/TokenAvatar";
import { formatAge, formatCompactCurrency, formatPercent } from "@/lib/format";
import { useAppDispatch } from "@/store/hooks";
import { selectToken, setModalOpen } from "@/store/uiSlice";
import type { Token } from "@/types/token";

interface MobileTokenCardProps {
  token: Token;
}

export function MobileTokenCard({ token }: MobileTokenCardProps) {
  const dispatch = useAppDispatch();

  const onBuy = () => {
    dispatch(selectToken(token.id));
    dispatch(setModalOpen({ modal: "quickBuy", value: true }));
  };

  return (
    <div className="w-full rounded-lg border border-border/50 bg-surface/90 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TokenAvatar src={token.logo} name={token.name} size={40} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{token.name}</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {token.ticker}
            </span>
          </div>
        </div>
        <Button size="sm" className="h-10 px-4 text-xs font-semibold" onClick={onBuy}>
          Buy
        </Button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge className="bg-muted/40 px-2 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          {token.platform}
        </Badge>
        <Badge className="bg-muted/30 px-2 py-1 text-[10px] uppercase tracking-wide text-muted-foreground">
          Age {formatAge(token.ageInSeconds)}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">MC</span>
            <span
              className={`text-[11px] ${
                token.marketCapChange24h >= 0 ? "text-positive" : "text-negative"
              }`}
            >
              {formatPercent(token.marketCapChange24h, 2)}
            </span>
          </div>
          <div className="mt-1 font-semibold">{formatCompactCurrency(token.marketCap)}</div>
        </div>
        <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Volume</div>
          <div className="mt-1 font-semibold">{formatCompactCurrency(token.volume24h)}</div>
        </div>
        <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Liquidity</div>
          <div className="mt-1 font-semibold">{formatCompactCurrency(token.liquidity)}</div>
        </div>
        <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Txns</div>
          <div className="mt-1 font-semibold">{token.transactionCount.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground">
            {token.buyCount.toLocaleString()} buys · {token.sellCount.toLocaleString()} sells
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <TokenStatusBadge status={token.status} platform={token.platform} />
      </div>

      <div className="mt-3 flex items-center gap-2">
        {token.socialLinks.website ? (
          <a
            href={token.socialLinks.website}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-xs text-foreground"
          >
            Website
          </a>
        ) : null}
        {token.socialLinks.twitter ? (
          <a
            href={token.socialLinks.twitter}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-xs text-foreground"
          >
            X
          </a>
        ) : null}
        {token.socialLinks.contract ? (
          <a
            href={token.socialLinks.contract}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-xs text-foreground"
          >
            Contract
          </a>
        ) : null}
      </div>
    </div>
  );
}


