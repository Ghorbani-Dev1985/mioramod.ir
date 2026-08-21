"use client";

import * as React from "react";
import { cn } from "@/core/utils/shadcn.utils";

type InfiniteScrollProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "ltr" | "rtl";
  pauseOnHover?: boolean;
};

function InfiniteScroll({
  children,
  className,
  speed = 30,
  direction = "rtl",
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const items = React.Children.toArray(children);
  const duplicated = [...items, ...items];

  return (
    <div className={cn("group/scroll w-full overflow-hidden", className)}>
      <div
        className="flex w-max gap-4 infinite-scroll-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "rtl" ? "normal" : "reverse",
        }}>
        {duplicated.map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
      <style>{`
        .infinite-scroll-track {
          animation-name: infinite-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .group\\/scroll:hover .infinite-scroll-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

function InfiniteScrollItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export { InfiniteScroll, InfiniteScrollItem };
