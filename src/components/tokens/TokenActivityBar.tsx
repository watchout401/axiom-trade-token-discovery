import { cn } from "@/lib/utils";
import type { Token } from "@/types/token";

interface TokenActivityBarProps {
  token: Token;
  className?: string;
}

export function TokenActivityBar({ token, className }: TokenActivityBarProps) {
  const total = token.buyCount + token.sellCount || 1;
  const buyPct = Math.round((token.buyCount / total) * 100);
  const sellPct = 100 - buyPct;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>Buys {token.buyCount.toLocaleString()}</span>
        <span>Sells {token.sellCount.toLocaleString()}</span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
        <span className="block h-full bg-positive" style={{ width: `${buyPct}%` }} />
        <span className="block h-full bg-negative" style={{ width: `${sellPct}%` }} />
      </div>
    </div>
  );
}

