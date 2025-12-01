"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// -------------------------------
// Variants (Themeable)
// -------------------------------
const variantColors = {
  normal: "text-neutral-50",
  fill: "text-primary-100",
  success: "text-success-60",
  error: "text-error-60",
} as const;

const inputVariants = cva(
  "flex w-full rounded-16 border bg-white px-4 text-body-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-neutral-20",
  {
    variants: {
      size: {
        sm: "h-10 py-2",
        md: "h-12 py-3",
        lg: "h-14 py-4",
      },
      variant: {
        normal: "text-neutral-50 border-neutral-20 hover:border-neutral-40 focus:border-neutral-50 focus:ring-neutral-60",
        fill: "text-primary-100 border-neutral-20 hover:border-neutral-40 focus:border-neutral-50 focus:ring-neutral-60",
        success: "text-success-60 border-success-60 hover:border-success-70 focus:border-success-70 focus:ring-success-90",
        error: "text-error-60 order-error-60 hover:border-error-60 focus:border-error-60 focus:ring-error-90",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:border-neutral-20",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      variant: "normal",
      disabled: false,
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    variant?: "normal" | "fill" | "success" | "error";
    helperText?: string;
    disabled?: boolean
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      size,
      variant = "normal",
      iconLeft,
      iconRight,
      helperText,
      disabled = false,
      ...props
    },
    ref
  ) => {

    const colors = variantColors[variant];

    return (
      <div className="w-full space-y-2">
        {label && <label aria-disabled={disabled} className={cn("text-label-sm font-medium", colors , disabled && "opacity-50")}>{label}</label>}

        <div className={cn(inputVariants({ size, variant , disabled}), className)}>
          {iconLeft && <span className={cn("flex items-center", colors , disabled && "opacity-50")}>{iconLeft}</span>}
          <input
            ref={ref}
            disabled={disabled}
            className="flex-1 bg-transparent outline-none mx-1 placeholder:text-neutral-50"
            {...props}
          />
          {iconRight && <span className={cn("flex items-center", colors , disabled && "opacity-50")}>{iconRight}</span>}
        </div>
        {helperText && <p aria-disabled={disabled} className={cn("text-body-xs" , colors , disabled && "opacity-50")}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };