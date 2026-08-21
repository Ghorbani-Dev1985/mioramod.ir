import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/utils/shadcn.utils";

const buttonVariants = cva(
  [
    "flex-center gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "font-normal",
    "transition-all duration-200 ease-out",
    "outline-none",
    "select-none",
    "cursor-pointer",
    "disabled:opacity-70",
    "disabled:pointer-events-none",
    "focus-visible:border-2",
    "focus-visible:border-primary-300",
    "focus:border-2",
    "focus:border-primary-300",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg]:size-4.5",
    "[&_svg]:text-current",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-primary-500",
          "text-white",
          "hover:bg-primary-600",
          "active:bg-primary-500",
          "disabled:bg-primary-500",
        ],
         secondary: [
          "bg-secondary-500",
          "text-white",
          "hover:bg-secondary-600",
          "active:bg-secondary-500",
          "disabled:bg-secondary-500",
        ],
        filledNeutral: [
          "bg-neutral-100",
          "text-neutral-800",
          "hover:bg-neutral-200",
          "active:bg-neutral-200",
          "disabled:bg-neutral-100",
        ],
        success: [
          "bg-success-500",
          "text-white",
          "hover:bg-ssuccess-600",
          "active:bg-ssuccess-200",
          "disabled:bg-ssuccess-100",
        ],
          error: [
          "bg-error-500",
          "text-white",
          "hover:bg-error-600",
          "active:bg-error-200",
          "disabled:bg-error-100",
        ],
        pill: [
          "rounded-full",
          "bg-primary-500",
          "text-white",
          "hover:bg-primary-600",
          "active:bg-primary-700",
          "focus-visible:text-primary-500",
          "focus:text-white",
          "disabled:bg-primary-200",
        ],

        outline: [
          "border",
          "border-neutral-300",
          "bg-white",
          "text-neutral-700",
          "[&_svg]:text-neutral-500",
          "hover:bg-neutral-100",
          "active:bg-primary-100",
          "disabled:border-0",
          "disabled:bg-neutral-100",
          "disabled:text-neutral-400",
        ],
        errorOutline: [
          "bg-transparent",
          "border",
          "border-error-500",
          "text-error-500",
          "hover:bg-error-100",
          "active:bg-error-100",
          "disabled:border-0",
          "disabled:bg-error-100",
          "disabled:text-error-300",
        ],
          warningOutline: [
          "bg-transparent",
          "border",
          "border-warning-500",
          "text-warning-500",
          "hover:bg-warning-100",
          "active:bg-warning-100",
          "disabled:border-0",
          "disabled:bg-warning-100",
          "disabled:text-warning-300",
        ],

        link: [
          "bg-transparent",
          "text-primary-500",
          "font-normal",
          "hover:text-primary-700",
          "active:text-primary-700",
          "disabled:border-0",
          "disabled:text-primary-200",
        ],
      },

      size: {
        xs: "h-10 px-3 text-xs [&_svg]:size-4",
        sm: "h-10 px-4 text-sm [&_svg]:size-5",
        base: "h-10 px-5 text-base [&_svg]:size-6",
        lg: "h-12 px-5 text-lg [&_svg]:size-6",
        xl: "h-14 px-6 text-xl [&_svg]:size-6",
      },

      iconOnly: {
        true: "px-0 min-w-auto",
      },

      fullWidth: {
        true: "w-full",
      },

      loading: {
        true: "cursor-not-allowed",
      },
    },

    compoundVariants: [
      // icon only sizes
      {
        size: "xs",
        iconOnly: true,
        className: "size-8",
      },
      {
        size: "sm",
        iconOnly: true,
        className: "size-9",
      },
      {
        size: "base",
        iconOnly: true,
        className: "size-10",
      },
      {
        size: "lg",
        iconOnly: true,
        className: "size-12",
      },
      {
        size: "xl",
        iconOnly: true,
        className: "size-14",
      },

      // link variant no border radius
      {
        variant: "link",
        className: "rounded-md",
      },
    ],

    defaultVariants: {
      variant: "filled",
      size: "base",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;

  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      fullWidth,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant,
            size,
            iconOnly,
            fullWidth,
            loading,
          }),
          className,
        )}
        {...props}>
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {iconOnly ? (
              <span className="flex-center">{children}</span>
            ) : (
              <>
                {rightIcon && (
                  <span className="flex-center gap-x-2">{rightIcon}</span>
                )}

                {children && <span>{children}</span>}

                {leftIcon && (
                  <span className="flex-center gap-x-2">{leftIcon}</span>
                )}
              </>
            )}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
