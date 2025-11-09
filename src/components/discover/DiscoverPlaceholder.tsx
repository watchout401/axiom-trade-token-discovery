import { Skeleton } from "@/components/ui/skeleton";

interface DiscoverPlaceholderProps {
  loading?: boolean;
}

export function DiscoverPlaceholder({ loading }: DiscoverPlaceholderProps) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-surface/60 p-6 shadow-[0_10px_40px_rgba(8,12,32,0.35)]">
        <Skeleton className="mb-6 h-7 w-64" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={`row-${index}`} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/40 bg-surface/50 py-24 text-center">
      <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Discover</span>
      <p className="max-w-md text-base text-muted-foreground">
        Sorting table is under construction. The full Discover experience will be available after finishing
        the shared component architecture.
      </p>
    </div>
  );
}

