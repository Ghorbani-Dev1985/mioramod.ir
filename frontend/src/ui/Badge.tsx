import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap select-none rounded-full",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
      },
      color: {
        primary: "",
        neutral: "",
        success: "",
        warning: "",
        error: "",
        info: "",
      },
      size: {
        xs: "w-10 h-5.5 text-xs font-semibold",
        sm: "w-16 h-10 text-sm font-semibold",
        md: "w-18 h-11 text-base font-semibold",
        iconXs: "size-8 rounded-full",
        iconSm: "size-10 rounded-full",
        iconMd: "size-12 rounded-full",
        iconLg: "size-14 rounded-full",
      },
    },
    compoundVariants: [
      // PRIMARY
      {
        variant: "solid",
        color: "primary",
        className: "bg-neutral-100 text-neutral-10",
      },
      {
        variant: "outline",
        color: "primary",
        className: "border border-neutral-100 text-neutral-100",
      },

       // NEUTRAL
      {
        variant: "solid",
        color: "neutral",
        className: "bg-neutral-15 text-neutral-70",
      },
      {
        variant: "outline",
        color: "neutral",
        className: "border border-neutral-70 text-neutral-70",
      },

      // SUCCESS
      {
        variant: "solid",
        color: "success",
        className: "bg-success-10 text-success-90",
      },
      {
        variant: "outline",
        color: "success",
        className: "border border-success-90 text-success-90",
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
        className: "border border-warning-70 text-warning-70",
      },

      // ERROR
      {
        variant: "solid",
        color: "error",
        className: "bg-error-10 text-error-90",
      },
      {
        variant: "outline",
        color: "error",
        className: "border border-error-90 text-error-90",
      },

      // INFO
      {
        variant: "solid",
        color: "info",
        className: "bg-info-10 text-info-70",
      },
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

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "size">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, color, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(badgeVariants({ variant, color, size, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };