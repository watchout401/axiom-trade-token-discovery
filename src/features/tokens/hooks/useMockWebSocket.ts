"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { applyTokenDeltas } from "@/store/tokensSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTokens } from "@/store/selectors";

type Direction = "up" | "down" | "neutral";

interface LatestPrice {
  percentChange: number;
  direction: Direction;
  updatedAt: number;
}

interface WebSocketOptions {
  interval?: number;
  intervalVariance?: number;
  batchSize?: number;
}

const clampPercent = (value: number) => Math.max(-99, Math.min(99, value));

export function useMockWebSocket({
  interval = 3_000,
  intervalVariance = 2_000,
  batchSize = 3,
}: WebSocketOptions = {}) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const [isConnected, setIsConnected] = useState(false);
  const [latestPrices, setLatestPrices] = useState<Record<string, LatestPrice>>({});

  const tokenPool = useMemo(() => tokens.filter(Boolean), [tokens]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!tokenPool.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- we need to reflect connection loss immediately for UI cues
      setIsConnected(false);
    }
  }, [tokenPool.length]);

  useEffect(() => {
    if (!tokenPool.length) {
      return undefined;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- establishing the mock connection is synchronous with the subscription lifecycle
    setIsConnected(true);

    const scheduleNext = () => {
      const variance = Math.random() * intervalVariance;
      const delay = interval + variance * (Math.random() > 0.5 ? 1 : -1);

      timerRef.current = setTimeout(() => {
        const sampleSize = Math.min(batchSize, tokenPool.length);
        const shuffled = [...tokenPool].sort(() => Math.random() - 0.5);
        const selection = shuffled.slice(0, sampleSize);

        const updates = selection.map((token) => {
          const pctChange = (Math.random() * 4.5 + 0.5) / 100;
          const direction: Direction = Math.random() > 0.5 ? "up" : "down";
          const factor = direction === "up" ? 1 + pctChange : 1 - pctChange;

          const updatedMarketCap = Math.max(0, token.marketCap * factor);
          const updatedLiquidity = Math.max(0, token.liquidity * (1 + (factor - 1) * 0.6));
          const updatedVolume = Math.max(0, token.volume24h * (1 + (factor - 1) * 1.2));
          const updatedTxns = Math.max(0, Math.round(token.transactionCount * (1 + (factor - 1) * 1.1)));
          const updatedBuys = Math.max(0, Math.round(token.buyCount * (1 + (factor - 1) * 1.15)));
          const updatedSells = Math.max(0, Math.round(token.sellCount * (1 + (factor - 1) * 0.95)));
          const updatedChange = clampPercent(
            token.marketCapChange24h + (direction === "up" ? pctChange * 100 : -pctChange * 100),
          );

          return {
            id: token.id,
            changes: {
              marketCap: Number(updatedMarketCap.toFixed(2)),
              liquidity: Number(updatedLiquidity.toFixed(2)),
              volume24h: Number(updatedVolume.toFixed(2)),
              transactionCount: updatedTxns,
              buyCount: updatedBuys,
              sellCount: updatedSells,
              marketCapChange24h: Number(updatedChange.toFixed(2)),
              metrics: token.metrics.map((metric, index) => {
                const wave = (Math.sin(Date.now() / 2_000 + index) + 1) / 2;
                const directionDelta = direction === "up" ? 6 : -6;
                const newValue = Math.max(0, Math.min(100, metric.value + directionDelta * wave));
                return {
                  ...metric,
                  value: Number(newValue.toFixed(0)),
                  direction: direction,
                };
              }),
            },
            priceDeltaPct: Number((pctChange * 100).toFixed(2)),
            priceDirection: direction,
          };
        });

        dispatch(applyTokenDeltas(updates));

        setLatestPrices((prev) => {
          const next = { ...prev };
          const timestamp = Date.now();
          for (const update of updates) {
            next[update.id] = {
              percentChange: update.priceDirection === "down" ? -update.priceDeltaPct : update.priceDeltaPct,
              direction: update.priceDirection ?? "neutral",
              updatedAt: timestamp,
            };
          }
          return next;
        });

        scheduleNext();
      }, Math.max(1_200, delay));
    };

    scheduleNext();

    return () => {
      setIsConnected(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [batchSize, dispatch, interval, intervalVariance, tokenPool]);

  return { latestPrices, isConnected };
}

