import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const alertVariants = cva(
  "relative w-full flex items-center gap-3 rounded-16 p-3 transition-all duration-200",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        xs: "h-10",
        sm: "h-12",
        lg: "h-14",
        xl: "h-16",
      },
    },
    compoundVariants: [
      // PRIMARY
      {
        variant: "solid",
        color: "primary",
        className: "bg-neutral-20 text-neutral-70",
      },
      {
        variant: "outline",
        color: "primary",
        className: "border border-neutral-30 text-neutral-70",
      },

      // SUCCESS
      {
        variant: "solid",
        color: "success",
        className: "bg-success-10 text-success-70",
      },
      {
        variant: "outline",
        color: "success",
        className: "border border-success-30 text-success-70",
      },

      // WARNING
      {
        variant: "solid",
        color: "warning",
        className: "bg-warning-10 text-warning-70",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border border-warning-30 text-warning-70",
      },

      // ERROR
      {
        variant: "solid",
        color: "error",
        className: "bg-error-10 text-error-70",
      },
      {
        variant: "outline",
        color: "error",
        className: "border border-error-30 text-error-70",
      },

      // INFO
      { variant: "solid", color: "info", className: "bg-info-10 text-info-70" },
      {
        variant: "outline",
        color: "info",
        className: "border border-info-30 text-info-70",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "xs",
    },
  }
);

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "title">,
    VariantProps<typeof alertVariants> {
  asChild?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightText?: React.ReactNode;
  action?: React.ReactNode;
}

const titleSizeMap = {
  xs: "text-body-2xs",
  sm: "text-body-sm",
  lg: "text-body-lg",
  xl: "text-body-xl",
};

const descriptionSizeMap = {
  xs: "text-body-3xs",
  sm: "text-body-xs",
  lg: "text-body-base",
  xl: "text-body-lg",
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      title,
      description,
      leftIcon,
      rightIcon,
      rightText,
      action,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, color, size }), className)}
        {...props}
      >
        {leftIcon && (
          <div className="shrink-0 text-current size-5">{leftIcon}</div>
        )}

        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {title && (
            <div
              className={cn("font-medium truncate", titleSizeMap[size ?? "xs"])}
            >
              {title}
            </div>
          )}

          {description && (
            <div
              className={cn(
                "opacity-90 truncate",
                descriptionSizeMap[size ?? "xs"]
              )}
            >
              {description}
            </div>
          )}
        </div>

        {(rightText || rightIcon || action) && (
          <div className="flex items-center gap-2 shrink-0">
            {rightText && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-current/10 text-current">
                {rightText}
              </span>
            )}
            {rightIcon && (
              <div className="shrink-0 text-current size-5">{rightIcon}</div>
            )}
            {action}
          </div>
        )}
      </Comp>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
