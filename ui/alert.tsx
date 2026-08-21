"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/utils/shadcn.utils";

const variantTextColorMap: Record<NonNullable<AlertProps["variant"]>, string> = {
  default: "text-neutral-500",
  primary: "text-primary-700",
  primaryLight: "text-primary-500",
  secondary: "text-secondary-500",
  secondaryDark: "text-white",
  secondaryLight: "text-secondary-500",
  success: "text-success-700",
  warning: "text-warning-700",
  warningLight: "text-warning-600",
  error: "text-error-500",
  errorLight: "text-error-600",
  info: "text-info-700",
  purple: "text-purple-700",
  noBg: "text-neutral-800"
};

const alertVariants = cva(
  [
    "relative w-full rounded-2xl",
    "transition-all duration-300",
    "text-base p-4 border",
  ],
  {
    variants: {
      variant: {
        default: ["bg-neutral-100", "border-neutral-100", "text-neutral-700"],
        primary: ["bg-primary-100", "border-primary-100", "text-primary-700"],
        primaryLight: ["bg-primary-50", "border-primary-50", "text-primary-800"],
        secondary: ["bg-secondary-100", "border-secondary-100", "text-secondary-700"],
        secondaryDark: ["bg-secondary-500" , "border-0" , "text-white"],
        secondaryLight: ["bg-secondary-50", "border-secondary-50", "text-secondary-800"],
        success: ["bg-success-100", "border-success-100", "text-success-700"],
        warning: ["bg-warning-100", "border-warning-100", "text-warning-700"],
        warningLight: ["bg-warning-50", "border-warning-300", "text-warning-600"],
        error: ["bg-error-100", "border-error-100", "text-error-700"],
        errorLight: ["bg-error-50", "border-error-50", "text-error-600"],
        info: ["bg-info-100", "border-info-100", "text-info-700"],
        purple: ["bg-purple-100", "border-purple-100", "text-purple-700"],
        noBg: ["bg-white" , "border-neutral-200"]
      },
      size: {
        sm: "p-2.5 text-xs rounded-lg",
        md: "p-3 text-sm rounded-xl",
        base: "p-4 text-base rounded-2xl",
        xl: "p-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

interface AlertProps
  extends Omit<React.ComponentProps<"div">, "title">, 
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  action?: React.ReactNode;
  title?: React.ReactNode; 
  description?: React.ReactNode;
}



function Alert({
   className,
  variant,
  size,
  icon,
  action,
  title,
  description,
  children,
  ...props
}: AlertProps) {
  const textColor = variantTextColorMap[variant || "default"];

  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(
        alertVariants({ variant, size }),
        className,
      )}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className={cn(["mt-0.5", "*:size-6"])}>{icon}</div>
      )}

       
      <div className="w-full flex justify-between flex-col md:flex-row gap-2">
       
        <div className="flex-1 flex-col gap-y-2">
          {title && (
            <div className="flex items-center gap-x-2 leading-none tracking-tight text-neutral-800 [&>svg]:size-6">
              {title}
            </div>
          )}
          {description && (
            <div className={cn("flex flex-col gap-y-2 text-right leading-6", textColor)}>
              {description}
            </div>
          )}
          {children}
        </div>

        {action && (
          <div className={cn("shrink-0", textColor)}>
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        ["flex-center gap-x-2 mb-2", "leading-none", "tracking-tight"],
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "flex flex-col gap-y-2 text-right leading-6",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription};