export type TokenPlatform = "raydium" | "pump.fun" | "meteora";

export type TokenStatus = "paid" | "unpaid";

export type TokenTab = "new" | "final" | "migrated";

export type MetricDirection = "up" | "down" | "neutral";

export interface TokenMetric {
  label: string;
  value: number;
  direction: MetricDirection;
}

export interface TokenSocialLinks {
  twitter?: string;
  website?: string;
  contract?: string;
}

export interface Token {
  id: string;
  ticker: string;
  name: string;
  logo: string;
  marketCap: number;
  marketCapChange24h: number;
  liquidity: number;
  volume24h: number;
  transactionCount: number;
  buyCount: number;
  sellCount: number;
  metrics: TokenMetric[];
  status: TokenStatus;
  platform: TokenPlatform;
  ageInSeconds: number;
  socialLinks: TokenSocialLinks;
  tab: TokenTab;
  proTraders: number;
}

export type SortKey = "name" | "marketCap" | "liquidity" | "volume" | "txns";

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export type TokenStatusFilter = TokenStatus | "all";

export interface TokenFilters {
  minMarketCap: number;
  platforms: Record<TokenPlatform, boolean>;
  status: TokenStatusFilter;
}

export interface UIState {
  sortConfig: SortConfig;
  activeTab: TokenTab | "discover";
  selectedTokenId: string | null;
  modals: {
    tokenDetails: { isOpen: boolean };
    filter: { isOpen: boolean };
    quickBuy: { isOpen: boolean };
  };
  filters: TokenFilters;
}

