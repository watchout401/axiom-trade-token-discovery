"use client";

import { memo } from "react";
import { AnimatePresence } from "framer-motion";

import { QueryErrorFallback } from "@/components/system/QueryErrorFallback";
import { TokenTableHeader } from "@/components/discover/TokenTableHeader";
import { TokenTableRow } from "@/components/discover/TokenTableRow";
import { TokenTableSkeleton } from "@/components/discover/TokenTableSkeleton";
import { Table, TableBody } from "@/components/ui/table";
import type { SortConfig, SortKey } from "@/types/token";

interface TokenTableProps {
  tokenIds: string[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onInspect?: (tokenId: string) => void;
  onQuickBuy?: (tokenId: string) => void;
  sortConfig?: SortConfig;
  onSort?: (key: SortKey) => void;
}

function TokenTableComponent({
  tokenIds,
  isLoading,
  isError,
  onRetry,
  onInspect,
  onQuickBuy,
  sortConfig,
  onSort,
}: TokenTableProps) {
  if (isError) {
    return <QueryErrorFallback onRetry={onRetry} />;
  }

  if (isLoading && tokenIds.length === 0) {
    return <TokenTableSkeleton rows={6} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/30 bg-surface/70 shadow-[0_10px_40px_rgba(8,12,32,0.45)]">
      <Table className="min-w-full table-fixed border-collapse">
        <TokenTableHeader sortConfig={sortConfig} onSort={onSort} />
        <TableBody>
          <AnimatePresence initial={false}>
            {tokenIds.map((tokenId, index) => (
              <TokenTableRow
                key={tokenId}
                tokenId={tokenId}
                index={index}
                onInspect={onInspect}
                onQuickBuy={onQuickBuy}
              />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}

export const TokenTable = memo(TokenTableComponent);

