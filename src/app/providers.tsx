"use client";

import { type PropsWithChildren, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";

import { store } from "@/store/store";
import { QueryErrorFallback } from "@/components/system/QueryErrorFallback";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
        refetchOnReconnect: true,
      },
    },
  });
}

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient);

  return (
    <ReduxProvider store={store}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <QueryErrorFallback onRetry={resetErrorBoundary} />
            )}
          >
            <QueryClientProvider client={queryClient}>
              {children}
              <Toaster position="top-right" richColors expand={false} duration={3800} />
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </ReduxProvider>
  );
}

