"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/utils/shadcn.utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "data-[state=checked]:bg-primary-500 border border-primary-500 data-[state=unchecked]:bg-neutral-200",
        secondary:
          "data-[state=checked]:bg-secondary-500 border border-secondary-500 data-[state=unchecked]:bg-neutral-200",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-white shadow transition-transform duration-300",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=unchecked]:-translate-x-4 data-[state=checked]:translate-x-0",
        md: "h-5 w-5 data-[state=unchecked]:-translate-x-5 data-[state=checked]:translate-x-0",
        lg: "h-6 w-6 data-[state=unchecked]:-translate-x-5 data-[state=checked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SwitchProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: React.ReactNode | string;
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    { className, variant, size, label, labelPosition = "left", id, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
  const switchId = id || `switch-${generatedId}`;

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchVariants({ variant, size }), className)}
        {...props}>
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
      </SwitchPrimitive.Root>
    );

    if (!label) return switchElement;

    return (
      <div className="flex items-center gap-2">
        {labelPosition === "left" && switchElement}
        <label
          htmlFor={switchId}
          className={cn(
            "text-sm font-normal text-neutral-800 leading-none cursor-pointer select-none",
            props.disabled && "cursor-not-allowed opacity-50",
          )}>
          {label}
        </label>
        {labelPosition === "right" && switchElement}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
