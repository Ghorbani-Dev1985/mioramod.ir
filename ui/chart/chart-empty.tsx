"use client";

import {
  BarChart3,
} from "lucide-react";

interface ChartEmptyProps {
  title?: string;
}

export function ChartEmpty({
  title = "داده‌ای برای نمایش وجود ندارد",
}: ChartEmptyProps) {
  return (
    <div
      className="
      flex
      h-80
      flex-col
      items-center
      justify-center
      gap-y-4
      rounded-xl
      border
      border-dashed
      border-neutral-200
      "
    >
      <BarChart3
        className="
        size-12
        text-neutral-300
        "
      />

      <p
        className="
        text-sm
        text-neutral-500
        "
      >
        {title}
      </p>
    </div>
  );
}