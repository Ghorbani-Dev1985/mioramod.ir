"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/core/utils/shadcn.utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      spellCheck={false}
      containerClassName={cn(
        "flex-center gap-4",
        containerClassName
      )}
      className={cn(className)}
      {...props}
    />
  );
}

function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center gap-4",
        className
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext =
    React.useContext(OTPInputContext);

  const {
    char,
    hasFakeCaret,
    isActive,
  } =
    inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        [
          "relative",

          "flex-center",

          "w-17.5 h-12",

          "rounded-md",

          "border",

          "bg-white",

          "text-xl font-semibold",

          "transition-all duration-200",

          "border-neutral-300 dir-ltr",

          isActive && [
            "border-primary-500",
          ],
        ],
        className
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex-center">
          <div className="h-6 w-0.5 animate-pulse bg-primary-500" />
        </div>
      )}
    </div>
  );
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
};