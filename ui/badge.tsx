"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/utils/shadcn.utils";
import { XMarkIcon } from "@heroicons/react/16/solid";

const badgeVariants = cva(
  "inline-flex items-center w-fit gap-1.5 rounded-full px-2.5 py-0.5 hover:opacity-80 text-sm font-normal transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-800 border border-neutral-200",
        defaultOutline: "bg-neutral-100 text-neutral-800 border border-neutral-300",
        tag: "bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-md p-1",
        tagPill: "bg-neutral-100 text-neutral-900 rounded-full border border-neutral-300",
        primary: "bg-primary-500 text-white",
        primaryLight: "bg-primary-100 text-primary-700 border border-primary-400",
        secondary: "bg-secondary-100 text-secondary-800 border border-secondary-200",
        success: "bg-success-500 text-white border border-success-600",
        successOutline:
          "bg-success-100 text-success-700 border border-success-400 ",
        error: "bg-error-100 text-error-800 border border-error-200",
        errorOutline: "bg-error-100 text-error-700 border border-error-400",
        warning: "bg-warning-500 text-white border border-warning-600",
        warningOutline:
          "bg-warning-100 text-warning-700 border border-warning-400",
        info: "bg-info-500 text-white",
        infoLight: "bg-info-100 text-info-800 border border border-info-200",
        infoOutline: "bg-info-100 text-info-700 border border-info-500",
        outline: "bg-transparent text-neutral-800 border border-neutral-200 rounded-md",
        outlineRoundedFull: "bg-transparent text-neutral-800 border border-neutral-200",
        purple: "bg-purple-500 text-white border border-purple-600",
        purpleOuline: "bg-purple-100 text-purple-700 border border-purple-500",
      },
    defaultVariants: {
      variant: "primary",
    },
  },
  }
);

const dotVariants = cva(
  'rounded-full shrink-0',
  {
    variants: {
      variant: {
        success: 'bg-success-500',
        successSolid: 'bg-white',

        error: 'bg-error-500',
        errorSolid: 'bg-white',

        warning: 'bg-warning-500',
        warningSolid: 'bg-white',

        info: 'bg-primary-500',
        infoSolid: 'bg-white',

        neutral: 'bg-neutral-500',
        neutralSolid: 'bg-white',
      },

      size: {
        sm: 'size-1.5',
        base: 'size-2',
        lg: 'size-2.5',
      },
    },

    defaultVariants: {
      variant: 'info',
      size: 'base',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;

  removable?: boolean;

  onRemove?: () => void;

  icon?: React.ReactNode;

  iconPosition?: 'left' | 'right';

  size?: 'sm' | 'base' | 'lg';

  dotVariant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';

}

function Badge({
  className,
  variant,
  dotVariant,

  dot,
  icon,
  iconPosition = 'left',

  removable,
  onRemove,

  children,

   size,

  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant,
        }),
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            dotVariants({
              variant: dotVariant || 'neutral',
              size,
            })
          )}
        />
      )}

      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-full transition-colors hover:bg-neutral-200"
          aria-label="حذف"
        >
          <XMarkIcon className="size-3 text-neutral-500" />
        </button>
      )}

      {icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">
          {icon}
        </span>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
