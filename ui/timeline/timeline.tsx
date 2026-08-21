"use client";

import {
  createContext,
  useContext,
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
} from "react";
import { VariantProps } from "class-variance-authority";
import {
  markerVariants,
  lineVariants,
  borderVariants,
} from "./timeline-variants";
import { cn } from "@/core/utils/shadcn.utils";

type Orientation = "vertical" | "horizontal";

interface TimelineContextType extends VariantProps<typeof markerVariants> {
  orientation: Orientation;
}

const TimelineContext = createContext<TimelineContextType>({
  orientation: "vertical",
  variant: "primary",
});

interface TimelineProps extends VariantProps<typeof markerVariants> {
  orientation?: Orientation;
  className?: string;
  children: ReactNode;
}

interface TimelineItemProps {
  icon?: ReactNode;
  date?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  action?: ReactNode;
  className?: string;
  last?: boolean;
}

export function Timeline({
  orientation = "vertical",
  variant = "primary",
  className,
  children,
}: TimelineProps) {
  const items = Children.toArray(children);

  return (
    <TimelineContext.Provider value={{ orientation, variant }}>
      <ol
        className={cn(
          orientation === "vertical"
            ? "relative border-s last:border-s-0"
            : "w-full border last:border-0 flex items-start justify-between",
          borderVariants({ variant }),
          className,
        )}>
        {items.map((child, index) =>
          isValidElement<TimelineItemProps>(child)
            ? cloneElement(child, {
                last: index === items.length - 1,
              })
            : child,
        )}
      </ol>
    </TimelineContext.Provider>
  );
}

export function TimelineItem({
  icon,
  date,
  title,
  description,
  badge,
  action,
  className,
  last,
}: TimelineItemProps) {
  const { orientation, variant } = useContext(TimelineContext);

  if (orientation === "vertical") {
    return (
      <li className={cn("relative ms-5 pb-10", className)}>
        {!last && (
          <span
            className={cn(
              "absolute right-0 h-full w-px -translate-x-1/2",
              lineVariants({ variant }),
            )}
          />
        )}
        <p
          className={cn(
            markerVariants({ variant }),
            "flex-center size-9 absolute -right-9.5 [&_svg]:size-6 p-1",
          )}>
          {icon}
        </p>
        <div className="flex flex-col gap-2 mr-2">
          <p className="heading-2">{title}</p>
          <p className="display-2">{description}</p>
          <p className="display-2">{date}</p>
        </div>
        {badge && badge}

        {action && action}
      </li>
    );
  }
  return (
  <li className={cn("relative flex-1", className)}>
    <div className="w-full flex items-center">
      <p
        className={cn(
          markerVariants({ variant }),
          "flex-center size-9 shrink-0 [&_svg]:size-6 p-1",
        )}
      >
        {icon}
      </p>

      {!last && (
        <span
          className={cn(
            "mx-2 h-px flex-1",
            lineVariants({ variant }),
          )}
        />
      )}
    </div>
    <div className="mt-4 pe-6">
      {title && <p className="heading-2">{title}</p>}

      {description && (
        <p className="display-2 mt-2">{description}</p>
      )}

      {date && (
        <p className="display-2 mt-2">{date}</p>
      )}

      {badge && <div className="mt-2">{badge}</div>}

      {action && <div className="mt-4">{action}</div>}
    </div>
  </li>
);
}
