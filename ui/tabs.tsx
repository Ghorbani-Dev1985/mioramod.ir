"use client";

import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/core/utils/shadcn.utils";

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

const Tabs = TabsPrimitive.Root;

/* -------------------------------------------------------------------------- */
/*                                    List                                    */
/* -------------------------------------------------------------------------- */

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      [
        "flex items-center w-full overflow-auto scrollbar-none",

        "rounded-xl",

        "bg-white",

        "p-1",

        "text-neutral-800",

        "gap-x-4 md:gap-x-6.5",

        "direction:rtl",
      ],
      className,
    )}
    dir="rtl"
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                  */
/* -------------------------------------------------------------------------- */

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> {
  activeBg?: boolean;
  borderB?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, activeBg , borderB, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      [
        "w-fit flex flex-col items-center gap-4 [&>svg]:size-6",

        "whitespace-nowrap cursor-pointer",

        "rounded-xl",

        "px-4 py-2",

        "text-xs md:text-sm font-medium",

        "transition-all duration-200",

        "outline-none",

        "ring-offset-white",

        "focus-visible:ring-2",
        "focus-visible:ring-primary-300",

        "disabled:pointer-events-none",
        "disabled:opacity-50",

        /* active */
        activeBg
          ? "data-[state=active]:bg-primary-50 data-[state=active]:text-primary-500 border-none data-[state=active]:rounded-lg"
          : "data-[state=active]:bg-white data-[state=active]:border-primary-500 data-[state=active]:ring-4 data-[state=active]:ring-primary-50",

        borderB
          ? "rounded-none data-[state=active]:border-t-0 data-[state=active]:border-r-0 data-[state=active]:border-l-0 data-[state=active]:rounded-none data-[state=active]:ring-0 data-[state=active]:border-b-2 data-[state=active]:border-b-primary-500"
          : "rounded-xl border border-neutral-100",


        /* inactive */

        "text-neutral-800",

        "hover:text-neutral-500",
      ],
      className,
    )}
    {...props}>
    {children}
  </TabsPrimitive.Trigger>
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    dir="rtl"
    className={cn(
      [
        "text-right p-2",

        "outline-none",

        "focus-visible:border-2",
        "focus-visible:border-primary-300",

        "data-[state=inactive]:hidden",

        "animate-in fade-in-50",

        "my-4",

      ],
      className,
    )}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
