import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/store/store";
import type { SortKey, Token, TokenTab } from "@/types/token";

const selectTokensState = (state: RootState) => state.tokens;

export const selectTokenIds = createSelector(selectTokensState, (tokens) => tokens.ids);

export const selectTokenEntities = createSelector(
  selectTokensState,
  (tokens) => tokens.entities,
);

export const selectTokens = createSelector(
  [selectTokenIds, selectTokenEntities],
  (ids, entities): Token[] => ids.map((id) => entities[id]).filter(Boolean) as Token[],
);

const sortKeyResolver: Record<SortKey, (token: Token) => string | number> = {
  name: (token) => token.name.toLowerCase(),
  marketCap: (token) => token.marketCap,
  liquidity: (token) => token.liquidity,
  volume: (token) => token.volume24h,
  txns: (token) => token.transactionCount,
};

export const selectUIState = (state: RootState) => state.ui;

export const selectActiveTab = createSelector(selectUIState, (ui) => ui.activeTab);

export const selectSortConfig = createSelector(selectUIState, (ui) => ui.sortConfig);

export const selectSelectedTokenId = createSelector(
  selectUIState,
  (ui) => ui.selectedTokenId,
);

export const selectModalsState = createSelector(selectUIState, (ui) => ui.modals);

export const selectFilters = createSelector(selectUIState, (ui) => ui.filters);

export const selectFilteredTokens = createSelector([selectTokens, selectFilters], (tokens, filters) => {
  return tokens.filter((token) => {
    const meetsMarketCap = token.marketCap >= filters.minMarketCap;
    const meetsPlatform = filters.platforms[token.platform];
    const meetsStatus = filters.status === "all" ? true : token.status === filters.status;
    return meetsMarketCap && meetsPlatform && meetsStatus;
  });
});

export const selectSortedTokens = createSelector(
  [selectFilteredTokens, selectSortConfig],
  (tokens, sortConfig) => {
    const resolver = sortKeyResolver[sortConfig.key];
    const direction = sortConfig.order === "asc" ? 1 : -1;

    return [...tokens].sort((a, b) => {
      const aValue = resolver(a);
      const bValue = resolver(b);

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction * aValue.localeCompare(bValue, "en", { sensitivity: "base" });
      }

      return direction * (Number(aValue) - Number(bValue));
    });
  },
);

export const selectTokensByTab = (tab: TokenTab) =>
  createSelector(selectTokens, (tokens) => tokens.filter((token) => token.tab === tab));

export const selectTokenById = (id: string) =>
  createSelector(selectTokenEntities, (entities) => entities[id]);

export const selectTokensStatus = createSelector(
  selectTokensState,
  (tokens) => tokens.status,
);

export const selectTokensError = createSelector(
  selectTokensState,
  (tokens) => tokens.error,
);

export const selectLastUpdatedAt = createSelector(
  selectTokensState,
  (tokens) => tokens.lastUpdatedAt,
);

export const selectRealtimeById = (id: string) =>
  createSelector(selectTokensState, (tokens) => tokens.realtime[id]);

export const selectQuickBuyModalState = createSelector(selectModalsState, (modals) => modals.quickBuy);

export const selectTokenDetailsModalState = createSelector(
  selectModalsState,
  (modals) => modals.tokenDetails,
);

export const selectFilterModalState = createSelector(selectModalsState, (modals) => modals.filter);
