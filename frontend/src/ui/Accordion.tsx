"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

// -------------------------------
// Variants (Themeable)
// -------------------------------
const accordionItemVariants = cva(
  "w-full border transition-all disabled:opacity-50",
  {
    variants: {
      variant: {
        neutral: "border-neutral-20 bg-neutral-5 text-neutral-100",
        primary: "border-neutral-20 bg-neutral-10 text-primary-100",
        outline: "border-0 bg-transparent",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-12",
        md: "rounded-14",
        lg: "rounded-16",
      },
      shadow: {
        none: "",
        sm: "data-[state=open]:shadow-100",
        md: "data-[state=open]:shadow-200",
        lg: "data-[state=open]:shadow-300",
      },
    },
    defaultVariants: {
      variant: "neutral",
      rounded: "md",
      shadow: "lg",
    },
  }
);

const triggerVariants = cva(
  "w-full flex-between transition-all text-base-800",
  {
    variants: {
      size: {
        sm: "py-2 px-3 text-label-sm",
        md: "py-3 px-4 text-label-md",
        lg: "py-4 px-5 text-label-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const contentVariants = cva(
  "p-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp",
  {
    variants: {
      contentBg: {
        none: "",
        subtle: "bg-neutral-15 text-neutral-50",
        outline: "bg-transparent text-neutral-20",
      },
      rounded: {
        none: "",
        sm: "rounded-b-12 text-body-sm",
        md: "rounded-b-14 text-body-md",
        lg: "rounded-b-14 text-body-lg",
      },
      size: {
        sm: "text-body-sm",
        md: "text-body-md",
        lg: "text-body-lg",
      },
    },
    defaultVariants: {
      contentBg: "subtle",
      rounded: "md",
      size: "md",
    },
  }
);

// -------------------------------
// Accordion Root
// -------------------------------
export const Accordion = AccordionPrimitive.Root;

// -------------------------------
// Accordion Item
// -------------------------------
export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> &
  VariantProps<typeof accordionItemVariants>;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, rounded, shadow, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      accordionItemVariants({ variant, rounded, shadow }),
      className
    )}
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

// -------------------------------
// Accordion Trigger
// -------------------------------
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> &
  VariantProps<typeof triggerVariants> & {
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    icon?: React.ReactNode;
    rightText?: React.ReactNode;
  };

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, title, subTitle, icon, rightText, size, ...props }, ref) => (
  <AccordionPrimitive.Header className="w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(triggerVariants({ size }), "group", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && <span>{icon}</span>}
        <div className="flex flex-col items-start">
          {title && <span className="font-medium">{title}</span>}
          {subTitle && (
            <span className="text-neutral-50 font-normal">{subTitle}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {rightText && <span className="font-medium text-sm">{rightText}</span>}

        <ChevronDown
          size={20}
          className={cn(
            "transition-transform duration-300",
            "group-data-[state=open]:rotate-180"
          )}
        />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

// -------------------------------
// Accordion Content
// -------------------------------
export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> &
  VariantProps<typeof contentVariants>;

export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, contentBg, rounded, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(contentVariants({ contentBg, rounded }), className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = "AccordionContent";
