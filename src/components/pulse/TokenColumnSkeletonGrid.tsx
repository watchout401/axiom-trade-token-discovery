import { TokenCardSkeleton } from "@/components/tokens/TokenCardSkeleton";

export function TokenColumnSkeletonGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, columnIndex) => (
        <div
          key={`column-skeleton-${columnIndex}`}
          className="flex flex-col gap-4 rounded-2xl bg-surface/60 p-6 shadow-[0_10px_40px_rgba(8,12,32,0.35)]"
        >
          <div className="flex flex-col gap-2">
            <div className="h-6 w-32 rounded bg-muted/40" />
            <div className="h-4 w-44 rounded bg-muted/30" />
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <TokenCardSkeleton key={`card-skeleton-${columnIndex}-${index}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

