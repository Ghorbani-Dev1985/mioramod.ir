"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div
      className="
      space-y-4
      rounded-xl
      border
      p-4
      "
    >
      <Skeleton className="h-5 w-40" />

      <Skeleton className="h-75 w-full" />
    </div>
  );
}