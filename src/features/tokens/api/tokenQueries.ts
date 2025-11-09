import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { tokenService, type TokenServiceResponse } from "@/services/tokenService";
import { useAppDispatch } from "@/store/hooks";
import { setTokens, setTokensError, setTokensStatus } from "@/store/tokensSlice";
import type { Token, TokenTab } from "@/types/token";

export const tokenQueryKeys = {
  all: ["tokens"] as const,
  tab: (tab: TokenTab) => ["tokens", tab] as const,
};

type AllQueryKey = typeof tokenQueryKeys.all;
type TabQueryKey = ReturnType<typeof tokenQueryKeys.tab>;
type TokensQueryKey = AllQueryKey | TabQueryKey;

type TokensQueryOptions = Omit<
  UseQueryOptions<TokenServiceResponse, Error, Token[], TokensQueryKey>,
  "queryKey" | "queryFn" | "select"
> & { tab?: TokenTab };

export function useTokensQuery(options: TokensQueryOptions = {}) {
  const { tab, ...rest } = options;
  const dispatch = useAppDispatch();

  const query = useQuery<TokenServiceResponse, Error, Token[], TokensQueryKey>({
    queryKey: tab ? tokenQueryKeys.tab(tab) : tokenQueryKeys.all,
    queryFn: () => tokenService.fetchTokens({ tab }),
    select: (response) => response.tokens,
    gcTime: 120_000,
    staleTime: 45_000,
    refetchOnReconnect: true,
    refetchInterval: 120_000,
    ...rest,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setTokens({ tokens: query.data, replace: !tab }));
    }
  }, [dispatch, query.data, tab]);

  useEffect(() => {
    if (query.isPending) {
      dispatch(setTokensStatus("loading"));
    }
    if (query.isSuccess) {
      dispatch(setTokensStatus("success"));
      dispatch(setTokensError(undefined));
    }
    if (query.isError) {
      dispatch(setTokensError(query.error?.message ?? "Unable to load tokens"));
    }
  }, [dispatch, query.error, query.isError, query.isPending, query.isSuccess]);

  return query;
}

