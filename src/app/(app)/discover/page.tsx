import { Suspense } from "react";

import { DiscoverContent } from "@/components/discover/DiscoverContent";
import { TokenTableSkeleton } from "@/components/discover/TokenTableSkeleton";

export default function DiscoverPage() {
  return (
    <Suspense fallback={<TokenTableSkeleton rows={6} /> }>
      <DiscoverContent />
    </Suspense>
  );
}

