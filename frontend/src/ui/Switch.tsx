"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-8",
        md: "h-5 w-10",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        className:
          "bg-neutral-disabled data-[state=checked]:bg-neutral-100 data-[state=unchecked]:bg-disabled",
      },
      {
        size: "md",
        className:
          "bg-neutral-disabled data-[state=checked]:bg-neutral-100 data-[state=unchecked]:bg-disabled",
      },
    ],
    defaultVariants: {
      size: "sm",
    },
  }
);

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> &
    VariantProps<typeof switchVariants>
>(({ className, size: sizeProp, ...props }, ref) => {
  const size = sizeProp ?? "sm";

  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-neutral-5 shadow-lg data-[state=checked]:translate-x-0 transition-transform duration-300",
          size === "sm" && "data-[state=checked]:-translate-x-4 data-[state=unchecked]:translate-x-0 size-3",
          size === "md" && "data-[state=checked]:-translate-x-5 data-[state=unchecked]:translate-x-0 size-4"
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };