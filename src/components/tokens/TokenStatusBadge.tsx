import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { TokenPlatform, TokenStatus } from "@/types/token";

interface TokenStatusBadgeProps {
  status: TokenStatus;
  platform: TokenPlatform;
}

const platformLabels: Record<TokenPlatform, string> = {
  raydium: "Raydium",
  "pump.fun": "Pump.fun",
  meteora: "Meteora",
};

const statusDescriptions: Record<TokenStatus, string> = {
  paid: "Paid: Verified liquidity, tokens locked.",
  unpaid: "Unpaid: Liquidity checks pending.",
};

export function TokenStatusBadge({ status, platform }: TokenStatusBadgeProps) {
  const tone = status === "paid" ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative";

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="bg-muted/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {platformLabels[platform]}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{platformLabels[platform]}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${tone} px-2 py-1 text-[10px] font-medium uppercase tracking-wide`}>{status}</Badge>
        </TooltipTrigger>
        <TooltipContent>{statusDescriptions[status]}</TooltipContent>
      </Tooltip>
    </div>
  );
}

