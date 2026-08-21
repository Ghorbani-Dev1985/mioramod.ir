"use client";

import * as React from "react";

import { CircleAlert } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

type TextareaVariant = "default" | "success" | "error";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;

  hint?: string;

  error?: string;

  success?: string;

  resize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,

      label,

      hint,

      error,

      success,

      disabled,

      resize = false,

      ...props
    },
    ref,
  ) => {
    const variant: TextareaVariant = error
      ? "error"
      : success
        ? "success"
        : "default";

    return (
      <div className="flex w-full flex-col gap-2">
        {/* Label */}

        {label && (
          <label className="text-base font-normal text-neutral-800">
            {label}
          </label>
        )}

        {/* Textarea */}

        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            [
              "flex h-full min-h-16.5 w-full rounded-md border border-neutral-300",
              "bg-white",
              "px-3 py-2.5",
              "text-sm",
              "leading-7",
              "transition-all duration-200",
              "outline-none",

              "placeholder:text-neutral-400",

              // focus
              "focus-visible:border",
              "focus-visible:border-primary-500",
              "focus-visible:caret-primary-500",
              "focus:border",
              "focus:border-primary-500",
              "focus:caret-primary-500",

              // disabled
              "disabled:cursor-not-allowed",
              "disabled:bg-neutral-100",
              "disabled:text-neutral-400",
              "disabled:opacity-80",

              // resize
              resize ? "resize-y" : "resize-none",
            ],

            // variants

            variant === "default" && [
              "border",
              "border-neutral-300",
              "focus:border-primary-500",
            ],

            variant === "error" && [
              "border-error-500",
              "focus:border-error-500",
              "focus-visible:border-error-500",
            ],

            variant === "success" && [
              "border-success-500",
              "focus:border-success-500",
              "focus-visible:border-success-500",
            ],

            className,
          )}
          {...props}
        />

        {/* Hint */}

        {hint && !error && !success && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}

        {/* Error */}

        {error && (
          <div className="flex items-center gap-1 text-xs text-error-500">
            <CircleAlert className="size-3.5 shrink-0" />

            <span>{error}</span>
          </div>
        )}

        {/* Success */}

        {success && <p className="text-xs text-success-600">{success}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
