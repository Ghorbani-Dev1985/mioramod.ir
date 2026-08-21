"use client";

import { cn } from "@/core/utils/shadcn.utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  circle?: boolean;
  shimmer?: boolean;
};

export function Skeleton({
  className,
  circle = false,
  shimmer = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "flex-center relative overflow-hidden bg-neutral-100 animate-pulse",
        circle ? "rounded-full" : "rounded-2xl",

        shimmer && [
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-pulse",
          "before:bg-linear-to-r",
          "before:from-transparent",
          "before:via-neutral-50",
          "before:to-transparent",
        ],

        className,
      )}
      {...props}
    />
  );
}