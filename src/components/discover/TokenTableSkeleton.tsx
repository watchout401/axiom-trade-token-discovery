import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { TokenTableHeader } from "@/components/discover/TokenTableHeader";

export function TokenTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-surface/60 shadow-[0_10px_40px_rgba(8,12,32,0.35)]">
      <Table className="min-w-full table-fixed">
        <TokenTableHeader />
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={`skeleton-row-${index}`} className="border-border/20">
              <TableCell className="sticky left-0 bg-surface/80">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </TableCell>
              {Array.from({ length: 6 }).map((__, cellIndex) => (
                <TableCell key={`cell-${cellIndex}`}>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

