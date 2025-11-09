import { Suspense } from "react";

import { PulseContent } from "@/components/pulse/PulseContent";
import { TokenColumnSkeletonGrid } from "@/components/pulse/TokenColumnSkeletonGrid";

export default function PulsePage() {
  return (
    <Suspense fallback={<TokenColumnSkeletonGrid />}>
      <PulseContent />
    </Suspense>
  );
}

