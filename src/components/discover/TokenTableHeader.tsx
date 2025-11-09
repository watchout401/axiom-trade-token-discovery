import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SortConfig, SortKey } from "@/types/token";

const headers: Array<{
  key: SortKey | "pair" | "info" | "action";
  label: string;
  width: string;
  sticky?: "left" | "right";
  sortable?: boolean;
  tooltip?: string;
}> = [
  { key: "pair", label: "Pair", width: "w-[220px]", sticky: "left" },
  {
    key: "marketCap",
    label: "Market Cap",
    width: "w-[110px]",
    sortable: true,
    tooltip: "Total valuation with 24h change",
  },
  {
    key: "liquidity",
    label: "Liquidity",
    width: "w-[110px]",
    sortable: true,
    tooltip: "Available liquidity across pools",
  },
  {
    key: "volume",
    label: "Volume 24h",
    width: "w-[110px]",
    sortable: true,
    tooltip: "Trading volume over the last day",
  },
  {
    key: "txns",
    label: "Txns",
    width: "w-[100px]",
    sortable: true,
    tooltip: "Transaction count with buy/sell split",
  },
  { key: "info", label: "Token Info", width: "w-[160px]", tooltip: "Status, metrics, and actions" },
  { key: "action", label: "Action", width: "w-[100px]", sticky: "right" },
];

interface TokenTableHeaderProps {
  sortConfig?: SortConfig;
  onSort?: (key: SortKey) => void;
}

const defaultSortConfig: SortConfig = {
  key: "marketCap",
  order: "desc",
};

export function TokenTableHeader({ sortConfig = defaultSortConfig, onSort }: TokenTableHeaderProps) {
  const renderSortIcon = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-3.5 w-3.5" aria-hidden />;
    }
    return sortConfig.order === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" aria-hidden />
    );
  };

  return (
    <TableHeader className="sticky top-0 z-20 bg-surface/95 backdrop-blur-sm">
      <TableRow className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {headers.map((header) => {
          const isSortable = header.sortable && header.key !== "pair" && header.key !== "info" && header.key !== "action";

          return (
            <TableHead
              key={header.label}
              className={cn(
                "border-b border-border/40",
                header.width,
                header.sticky === "left" && "sticky left-0 z-20 bg-surface/95",
                header.sticky === "right" && "sticky right-0 z-20 bg-surface/95 text-right",
              )}
            >
              {isSortable ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onSort?.(header.key as SortKey)}
                      className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                    >
                      <span>{header.label}</span>
                      {renderSortIcon(header.key as SortKey)}
                    </button>
                  </TooltipTrigger>
                  {header.tooltip ? <TooltipContent>{header.tooltip}</TooltipContent> : null}
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="px-2 py-1 font-semibold text-muted-foreground">{header.label}</span>
                  </TooltipTrigger>
                  {header.tooltip ? <TooltipContent>{header.tooltip}</TooltipContent> : null}
                </Tooltip>
              )}
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}

