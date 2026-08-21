"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, error, disabled, id, checked, onCheckedChange, ...props }, ref) => {
  const handleLabelClick = React.useCallback(() => {
    if (disabled) return;
    const el = id ? document.getElementById(id) : null;
    if (el) el.click();
  }, [id, disabled]);
  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          [
            "peer",
            "flex-center size-4 shrink-0",
            "rounded-sm",
            "border",
            "border-primary-600",
            "bg-white",
            "transition-all duration-200",
            "outline-none",
            "hover:border-primary-600",
            "focus-visible:border-2",
            "focus-visible:border-primary-300",
            "focus:border-2",
            "focus:border-primary-300",
            "data-[state=checked]:bg-primary-500",
            "data-[state=checked]:text-white",
            "data-[state=checked]:border-primary-600",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
            error && "border-error-500 focus-visible:ring-error-200",
          ],
          className,
        )}
        {...props}>
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className="size-3.5 stroke-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {(label || description || error) && (
        <div className="space-y-1">
          {label && (
            <label
              htmlFor={id}
              onClick={handleLabelClick}
              className={cn(
                "text-xs font-medium leading-none text-neutral-800 cursor-pointer select-none",
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

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
