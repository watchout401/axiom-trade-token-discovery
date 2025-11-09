"use client";

import { useEffect, useState } from "react";
import { TokenColumn } from "@/components/tokens/TokenColumn";
import { useTokensQuery } from "@/features/tokens/api/tokenQueries";
import { useMockWebSocket } from "@/features/tokens/hooks/useMockWebSocket";
import { useAppSelector } from "@/store/hooks";
import { selectTokensByTab } from "@/store/selectors";
import { useResponsive } from "@/hooks/useResponsive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch } from "react-redux";
import { setActiveTab } from "@/store/uiSlice";

const columns = [
  {
    tab: "new" as const,
    title: "New Pairs",
    subtitle: "Freshly launched tokens with accelerating momentum",
  },
  {
    tab: "final" as const,
    title: "Final Stretch",
    subtitle: "Top performers approaching critical milestones",
  },
  {
    tab: "migrated" as const,
    title: "Migrated",
    subtitle: "Recently migrated ecosystems stabilizing liquidity",
  },
];

const selectNewTokens = selectTokensByTab("new");
const selectFinalTokens = selectTokensByTab("final");
const selectMigratedTokens = selectTokensByTab("migrated");

export function PulseContent() {
  const query = useTokensQuery({});
  useMockWebSocket({ interval: 3_000, intervalVariance: 1_800 });

  const newTokens = useAppSelector(selectNewTokens);
  const finalTokens = useAppSelector(selectFinalTokens);
  const migratedTokens = useAppSelector(selectMigratedTokens);
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- necessary for hydration safety
    setMounted(true);
  }, []);

  const tokensMap: Record<string, string[]> = {
    new: newTokens.map((token) => token.id),
    final: finalTokens.map((token) => token.id),
    migrated: migratedTokens.map((token) => token.id),
  };

  // Only render mobile tabs after mount to prevent hydration mismatch
  // Server always renders desktop grid, client matches initially then updates
  if (mounted && isMobile) {
    return (
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          {columns.map((c) => (
            <TabsTrigger key={c.tab} value={c.tab} onClick={() => dispatch(setActiveTab(c.tab))}>
              {c.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {columns.map((c) => (
          <TabsContent key={c.tab} value={c.tab}>
            <TokenColumn
              title={c.title}
              subtitle={c.subtitle}
              tokenIds={tokensMap[c.tab]}
              isLoading={query.isPending || query.isFetching}
              isError={query.isError}
              onRetry={() => query.refetch()}
            />
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {columns.map((column) => (
        <TokenColumn
          key={column.tab}
          title={column.title}
          subtitle={column.subtitle}
          tokenIds={tokensMap[column.tab]}
          isLoading={query.isPending || query.isFetching}
          isError={query.isError}
          onRetry={() => query.refetch()}
        />
      ))}
    </div>
  );
}

