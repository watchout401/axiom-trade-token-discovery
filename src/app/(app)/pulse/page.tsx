import { Suspense } from "react";

import { PulseContent } from "@/components/pulse/PulseContent";
import { TokenColumnSkeletonGrid } from "@/components/pulse/TokenColumnSkeletonGrid";

export const dynamic = "force-dynamic";

export default function PulsePage() {
  return (
    <Suspense fallback={<TokenColumnSkeletonGrid />}>
      <PulseContent />
    </Suspense>
  );
}

