"use client";

import * as React from "react";

import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

type InputVariant = "default" | "success" | "error";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  isRequired?: boolean;

  hint?: string;

  error?: string;

  success?: string;

  startIcon?: React.ReactNode;

  endIcon?: React.ReactNode;

  loading?: boolean;
  
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,

      type,

      label,

      isRequired,

      hint,

      error,

      success,

      startIcon,

      endIcon,

      disabled,

      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";

    const computedType = isPassword && showPassword ? "text" : type;

    const variant: InputVariant = error
      ? "error"
      : success
        ? "success"
        : "default";

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label className="text-base font-normal text-neutral-800">
            {label} {isRequired && <span className="text-error-500">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Prefix Icon */}

          {startIcon && (
            <div className="pointer-events-none absolute inset-y-0 inset-s-3 flex items-center text-neutral-400">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id="input"
            type={computedType}
            disabled={disabled}
            className={cn(
              [
                "flex h-10 w-full rounded-md border border-neutral-300 bg-white",
                "px-3 py-2 text-xs md:text-sm text-neutral-800",
                "transition-all duration-200",
                "outline-none",

                "placeholder:text-neutral-400",

                // focus
                "focus-visible:border",
                "focus-visible:border-primary-500",
                "focus-visible:caret-primary-500",
                "focus:border",
                "focus:caret-primary-500",
                "focus:border-primary-500",

                // disabled
                "disabled:cursor-not-allowed",
                "disabled:bg-neutral-100",
                "disabled:text-neutral-400",
                "disabled:opacity-80",

                // padding with icons
                startIcon && "ps-10",

                (endIcon || isPassword) && "pe-10",
              ],

              // variants
              variant === "default" && ["border", "focus:border-primary-500"],

              variant === "error" && [
                "border-error-500",
                "focus-visible:border-error-500",
                "focus-visible:border",
                "focus:border-error-500",
                "focus:border",
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

          {/* Password Toggle */}

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 inset-e-3 flex items-center text-neutral-800 transition-colors hover:text-neutral-800">
              {showPassword ? (
                <EyeOff className="size-4 text-neutral-400" />
              ) : (
                <Eye className="size-4 text-neutral-400" />
              )}
            </button>
          )}

          {/* End Icon */}

          {!isPassword && endIcon && (
            <div className="pointer-events-none absolute inset-y-0 inset-e-3 flex items-center text-neutral-400">
              {endIcon}
            </div>
          )}
        </div>

        {/* Hint/Error/Success */}

        {hint && !error && !success && (
          <p className="text-xs text-neutral-800">{hint}</p>
        )}

        {error && (
          <div className="flex items-center gap-1 text-xs text-error-500">
            <span>{error}</span>
          </div>
        )}

        {success && <p className="text-xs text-success-500">{success}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
