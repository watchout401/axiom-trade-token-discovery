"use client";

import { AnimatePresence, motion } from "framer-motion";

import { QueryErrorFallback } from "@/components/system/QueryErrorFallback";
import { TokenCard } from "@/components/tokens/TokenCard";
import { TokenCardSkeleton } from "@/components/tokens/TokenCardSkeleton";

interface TokenColumnProps {
  title: string;
  subtitle?: string;
  tokenIds: string[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onTokenClick?: (tokenId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export function TokenColumn({
  title,
  subtitle,
  tokenIds,
  isLoading,
  isError,
  onRetry,
  onTokenClick,
}: TokenColumnProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl bg-surface/60 p-6 shadow-[0_10px_40px_rgba(8,12,32,0.35)] backdrop-blur">
      <header className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      </header>

      {isError ? (
        <QueryErrorFallback onRetry={onRetry} />
      ) : (
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <TokenCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {tokenIds.map((id, index) => (
                <motion.div
                  key={id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={containerVariants}
                >
                  <TokenCard tokenId={id} onClick={() => onTokenClick?.(id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      )}
    </section>
  );
}

