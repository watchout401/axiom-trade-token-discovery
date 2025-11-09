"use client";

import { ButtonHTMLAttributes } from "react";
import { AlertTriangle } from "lucide-react";

interface QueryErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
  actionLabel?: string;
}

export function QueryErrorFallback({
  message = "Failed to load tokens. Refresh?",
  onRetry,
  actionLabel = "Retry",
}: QueryErrorFallbackProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-surface/60 px-8 py-12 text-center shadow-[0_10px_40px_rgba(8,12,32,0.35)]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-negative/20 text-negative">
        <AlertTriangle className="h-6 w-6" aria-hidden />
      </span>
      <span className="text-sm text-muted-foreground">{message}</span>
      {onRetry ? (
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-button-hover"
          onClick={onRetry}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export type FallbackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

