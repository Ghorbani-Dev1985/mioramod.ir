"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/core/utils/shadcn.utils";

type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("flex flex-col md:flex-row md:items-center flex-nowrap gap-3", className)}
      dir="rtl"
      {...props}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  label?: string;

  description?: string;

  error?: string;
}

const RadioItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, description, error, disabled, id, ...props }, ref) => {
  return (
    <div className="flex items-start gap-3">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(
          [
            "peer",
            "relative",
            "flex-center size-4 shrink-0",
            "rounded-full",
            "cursor-pointer",
            "border",
            "border-primary-600",
            "bg-white",
            "transition-all duration-200",
            "outline-none",

            // hover
            "hover:border-primary-700",

            // focus
            "focus-visible:border-2",
            "focus-visible:border-primary-300",
            "focus:border-2",
            "focus:border-primary-300",

            // disabled
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",

            // error
            error && "border-error focus-visible:ring-error/20",
          ],
          className,
        )}
        {...props}>
        <RadioGroupPrimitive.Indicator className="flex-center">
          <span className="size-2.5 rounded-full bg-primary-600" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description || error) && (
        <div className="space-y-1">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-normal leading-none cursor-pointer text-neutral-800",
                disabled && "cursor-not-allowed opacity-50",
              )}>
              {label}
            </label>
          )}

          {error && <p className="text-xs text-error">{error}</p>}
        </div>
      )}
    </div>
  );
});

RadioItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioItem };
