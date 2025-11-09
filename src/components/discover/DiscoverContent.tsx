"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TokenTable } from "@/components/discover/TokenTable";
import { FilterPopover } from "@/components/popovers/FilterPopover";
import { useTokensQuery } from "@/features/tokens/api/tokenQueries";
import { useMockWebSocket } from "@/features/tokens/hooks/useMockWebSocket";
import { formatNumber } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSortedTokens,
  selectSortConfig,
} from "@/store/selectors";
import { selectToken, setActiveTab, setModalOpen, setSortConfig } from "@/store/uiSlice";
import type { SortKey, SortOrder } from "@/types/token";
import { useResponsive } from "@/hooks/useResponsive";
import { MobileTokenCard } from "@/components/discover/MobileTokenCard";

const sortableKeys: SortKey[] = ["marketCap", "liquidity", "volume", "txns"];

export function DiscoverContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortConfig = useAppSelector(selectSortConfig);
  const tokens = useAppSelector(selectSortedTokens);

  const query = useTokensQuery({});
  useMockWebSocket({ interval: 3_200, intervalVariance: 1_400, batchSize: 4 });

  const isInitialLoading = query.isPending && tokens.length === 0;
  const isError = query.isError;
  const responsive = useResponsive();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- necessary for hydration safety
    setMounted(true);
  }, []);

  // Ensure active tab reflects discover view
  useEffect(() => {
    dispatch(setActiveTab("discover"));
  }, [dispatch]);

  // Set default sort params if missing from URL
  useEffect(() => {
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");

    if (!sort || !order) {
      const params = new URLSearchParams();
      params.set("sort", "marketCap");
      params.set("order", "desc");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      // Also set in Redux immediately
      dispatch(setSortConfig({ key: "marketCap", order: "desc" }));
    }
  }, [pathname, router, searchParams, dispatch]);

  // Sync sort config from URL params on mount / navigation changes
  useEffect(() => {
    const sortParam = searchParams.get("sort") as SortKey | null;
    const orderParam = searchParams.get("order") as SortOrder | null;

    const isValidSort = sortParam ? sortableKeys.includes(sortParam) : false;
    const isValidOrder = orderParam === "asc" || orderParam === "desc";

    if (isValidSort && isValidOrder && sortParam && orderParam) {
      if (sortConfig.key !== sortParam || sortConfig.order !== orderParam) {
        dispatch(setSortConfig({ key: sortParam, order: orderParam }));
      }
    }
  }, [dispatch, searchParams, sortConfig.key, sortConfig.order]);

  // Reflect sort config back to URL for persistence
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");

    if (currentSort === sortConfig.key && currentOrder === sortConfig.order) {
      return;
    }

    params.set("sort", sortConfig.key);
    params.set("order", sortConfig.order);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, sortConfig.key, sortConfig.order]);

  const handleSort = useCallback(
    (key: SortKey) => {
      dispatch(
        setSortConfig({
          key,
          order:
            sortConfig.key === key
              ? sortConfig.order === "asc"
                ? "desc"
                : "asc"
              : key === "name"
                ? "asc"
                : "desc",
        }),
      );
    },
    [dispatch, sortConfig.key, sortConfig.order],
  );

  const handleQuickBuy = useCallback(
    (tokenId: string) => {
      dispatch(selectToken(tokenId));
      dispatch(setModalOpen({ modal: "quickBuy", value: true }));
    },
    [dispatch],
  );

  const handleInspect = useCallback(
    (tokenId: string) => {
      dispatch(selectToken(tokenId));
      dispatch(setModalOpen({ modal: "tokenDetails", value: true }));
    },
    [dispatch],
  );

  const summary = useMemo(() => {
    const totalMarketCap = tokens.reduce((acc, token) => acc + token.marketCap, 0);
    const totalVolume = tokens.reduce((acc, token) => acc + token.volume24h, 0);
    return {
      totalMarketCap,
      totalVolume,
      totalTokens: tokens.length,
    };
  }, [tokens]);

  return (
    <div className="flex flex-col gap-6">
      {/* Mobile: render cards; Desktop/Tablet: table */}
      {/* Only render mobile cards after mount to prevent hydration mismatch */}
      {mounted && responsive.isMobile ? (
        <div className="flex flex-col gap-3">
          {tokens.map((t) => (
            <MobileTokenCard key={t.id} token={t} />
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Discovery Analytics</span>
          <FilterPopover />
        </div>

        <section className="grid gap-3 rounded-2xl border border-border/40 bg-surface/60 p-6 text-xs uppercase tracking-[0.3em] text-muted-foreground shadow-[0_10px_40px_rgba(8,12,32,0.35)] sm:grid-cols-3">
          <div>
            <span className="text-muted-foreground">Tracked Tokens</span>
            <p className="mt-2 text-lg font-semibold tracking-normal text-foreground">
              {summary.totalTokens} assets
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Aggregate Market Cap</span>
            <p className="mt-2 text-lg font-semibold tracking-normal text-foreground">
              {formatNumber(summary.totalMarketCap)}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">24h Volume</span>
            <p className="mt-2 text-lg font-semibold tracking-normal text-foreground">
              {formatNumber(summary.totalVolume)}
            </p>
          </div>
        </section>
      </div>

      {/* Only hide table on mobile after mount to prevent hydration mismatch */}
      {!mounted || !responsive.isMobile ? (
        <TokenTable
          tokenIds={tokens.map((token) => token.id)}
          isLoading={isInitialLoading}
          isError={isError}
          onRetry={() => query.refetch()}
          onQuickBuy={handleQuickBuy}
          onInspect={handleInspect}
          sortConfig={sortConfig || { key: "marketCap", order: "desc" }}
          onSort={handleSort}
        />
      ) : null}
    </div>
  );
}

