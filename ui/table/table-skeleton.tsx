"use client";

import { Skeleton } from "../skeleton";

export function TableSkeleton({
  rows = 8,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="space-y-3">
      {Array.from({
        length: rows,
      }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({
            length: columns,
          }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className="h-10 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}