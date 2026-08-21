"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { cn } from "@/core/utils/shadcn.utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "overflow-hidden rounded-xl",
      className
    )}
    {...props}
  />
));

AccordionItem.displayName = AccordionPrimitive.Item.displayName;

/* -------------------------------------------------------------------------- */
/*                             Default Trigger                                */
/* -------------------------------------------------------------------------- */

type AccordionTriggerProps =
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    index?: number;
    hideIcon?: boolean;
    custom?: boolean;
  };

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(
(
{
  className,
  children,
  index,
  hideIcon = false,
  custom = false,
  ...props
},
ref
) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex-between w-full bg-neutral-50 text-base md:text-lg font-semibold p-4 text-right transition-colors",
        "data-[state=open]:bg-primary-50",
        className
      )}
      {...props}
    >
      {custom ? (
        <>
          {children}

          {!hideIcon && (
            <ChevronDownIcon className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          )}
        </>
      ) : (
        <>
          <div className="flex flex-1 items-center gap-4">
            {index && (
              <div className="flex-center size-8 shrink-0 rounded-sm bg-primary-500 text-sm font-bold text-white">
                {index}
              </div>
            )}

            <div className="text-right">{children}</div>
          </div>

          {!hideIcon && (
            <ChevronDownIcon className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          )}
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/* -------------------------------------------------------------------------- */
/*                             BgNone Trigger                                 */
/* -------------------------------------------------------------------------- */

const AccordionBgNoneTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    hideIcon?: boolean;
  }
>(({ className, children, hideIcon = false, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
     className={cn(
  "group flex-between w-full border border-neutral-100 p-4",
  "rounded-xl transition-all duration-200",
  "data-[state=open]:rounded-b-none",
  className
)}
      {...props}
    >
      <div className="flex-1">{children}</div>

      {!hideIcon && (
        <ChevronDownIcon className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionBgNoneTrigger.displayName = "AccordionBgNoneTrigger";

/* -------------------------------------------------------------------------- */
/*                                 Content                                    */
/* -------------------------------------------------------------------------- */

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-accordion-up",
      "data-[state=open]:animate-accordion-down"
    )}
    {...props}
  >
    <div className={cn("p-4 text-sm md:text-base", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionBgNoneTrigger,
  AccordionContent,
};