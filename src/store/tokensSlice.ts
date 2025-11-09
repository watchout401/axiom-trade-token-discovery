import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Token } from "@/types/token";

export interface TokensState {
  entities: Record<string, Token>;
  ids: string[];
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  lastUpdatedAt?: number;
  realtime: Record<
    string,
    {
      percentChange: number;
      direction: "up" | "down" | "neutral";
      updatedAt: number;
    }
  >;
}

const initialState: TokensState = {
  entities: {},
  ids: [],
  status: "idle",
  error: undefined,
  lastUpdatedAt: undefined,
  realtime: {},
};

type UpsertPayload = {
  tokens: Token[];
  replace?: boolean;
};

type TokenDelta = {
  id: string;
  changes: Partial<Pick<Token, "marketCap" | "liquidity" | "volume24h" | "transactionCount" | "buyCount" | "sellCount" | "metrics" | "marketCapChange24h">> & {
    priceDeltaPct?: number;
    priceDirection?: "up" | "down" | "neutral";
  };
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<UpsertPayload>) {
      const { tokens, replace } = action.payload;
      if (replace) {
        state.entities = {};
        state.ids = [];
        state.realtime = {};
      }
      for (const token of tokens) {
        const exists = Boolean(state.entities[token.id]);
        state.entities[token.id] = token;
        if (!exists) {
          state.ids.push(token.id);
        }
      }
      state.lastUpdatedAt = Date.now();
      state.status = "success";
      state.error = undefined;
    },
    applyTokenDeltas(state, action: PayloadAction<TokenDelta[]>) {
      for (const delta of action.payload) {
        const target = state.entities[delta.id];
        if (!target) continue;
        state.entities[delta.id] = {
          ...target,
          ...delta.changes,
        };
        if (delta.changes.priceDeltaPct !== undefined && delta.changes.priceDirection) {
          state.realtime[delta.id] = {
            percentChange:
              delta.changes.priceDirection === "down"
                ? -Math.abs(delta.changes.priceDeltaPct)
                : Math.abs(delta.changes.priceDeltaPct),
            direction: delta.changes.priceDirection,
            updatedAt: Date.now(),
          };
        }
      }
      state.lastUpdatedAt = Date.now();
    },
    setTokensStatus(state, action: PayloadAction<TokensState["status"]>) {
      state.status = action.payload;
    },
    setTokensError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
      if (action.payload) {
        state.status = "error";
      }
    },
    resetTokens(state) {
      state.entities = {};
      state.ids = [];
      state.status = "idle";
      state.error = undefined;
      state.lastUpdatedAt = undefined;
      state.realtime = {};
    },
  },
});

export const { setTokens, applyTokenDeltas, setTokensStatus, setTokensError, resetTokens } =
  tokensSlice.actions;

export default tokensSlice.reducer;

