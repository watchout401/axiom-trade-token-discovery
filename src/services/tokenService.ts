import { mockTokens } from "@/data/mockTokens";
import type { Token, TokenTab } from "@/types/token";

interface FetchTokensOptions {
  tab?: TokenTab;
  simulateError?: boolean;
}

export interface TokenServiceResponse {
  tokens: Token[];
  lastUpdatedAt: number;
}

const MIN_DELAY = 420;
const MAX_DELAY = 960;

const resolveTokens = (tab?: TokenTab): Token[] => {
  if (!tab) return [...mockTokens];
  return mockTokens.filter((token) => token.tab === tab);
};

export const tokenService = {
  async fetchTokens(options: FetchTokensOptions = {}): Promise<TokenServiceResponse> {
    const { tab, simulateError } = options;

    return new Promise((resolve, reject) => {
      const timeout = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

      setTimeout(() => {
        if (simulateError && Math.random() > 0.7) {
          reject(new Error("Failed to load token data."));
          return;
        }

        resolve({
          tokens: resolveTokens(tab),
          lastUpdatedAt: Date.now(),
        });
      }, timeout);
    });
  },
};

