import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "flex-center gap-2 whitespace-nowrap rounded-16 px-2 py-3 text-label-sm cursor-pointer disabled:cursor-not-allowed transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "text-neutral-5",
        outline: "border bg-transparent",
        ghost: "bg-transparent hover:bg-neutral-50",
        subtle: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
      },

      color: {
        primary: "",
        secondary: "",
      },

      size: {
        sm: "h-10",
        md: "h-12",
        lg: "h-14",
        iconSm: "size-8 rounded-full",
        iconMd: "size-10",
        iconLg: "size-12",
      },
    },

    compoundVariants: [
      // ---------------- PRIMARY ---------------- //
      {
        variant: "solid",
        color: "primary",
        className: "bg-neutral-100 hover:bg-neutral-80",
      },
      {
        variant: "solid",
        color: "primary",
        className: "disabled:bg-neutral-30 disabled:text-neutral-50",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-neutral-100 text-neutral-100 hover:border-neutral-80 hover:text-neutral-80",
      },
      {
        variant: "outline",
        color: "primary",
        className: "disabled:border-neutral-50 disabled:text-neutral-50",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-neutral-100 hover:text-neutral-80",
      },
      {
        variant: "ghost",
        color: "primary",
        className: "disabled:text-neutral-50",
      },

      // ---------------- SECONDARY ---------------- //
      {
        variant: "solid",
        color: "secondary",
        className: "bg-neutral-80 hover:bg-neutral-70",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "disabled:bg-neutral-30 disabled:text-neutral-40",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-neutral-80 text-neutral-80 hover:border-neutral-70 hover:text-neutral-70",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "disabled:border-neutral-40 disabled:text-neutral-40",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-neutral-80 hover:text-neutral-70",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "disabled:text-neutral-40",
      },

      // ---------------- ICON BUTTONS ---------------- //
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary-100 hover:bg-primary-80",
      },
      {
        variant: "solid",
        color: "primary",
        className: "disabled:bg-primary-30 disabled:text-primary-50",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary-100 text-primary-100 hover:border-primary-80 hover:text-primary-80",
      },
      {
        variant: "outline",
        color: "primary",
        className: "disabled:border-primary-50 disabled:text-primary-50",
      },
      {
        variant: "ghost",
        color: "primary",
        className:
          "text-primary-80 hover:text-primary-70",
      },
      {
        variant: "ghost",
        color: "primary",
        className: "disabled:text-primary-50",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "bg-neutral-80 hover:bg-neutral-70",
      },
      {
        variant: "solid",
        color: "secondary",
        className: "disabled:bg-neutral-30 disabled:text-neutral-40",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-neutral-80 text-neutral-80 hover:border-neutral-70 hover:text-neutral-70",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "disabled:border-neutral-40 disabled:text-neutral-40",
      },
      {
        variant: "ghost",
        color: "secondary",
        className:
          "text-neutral-60 hover:text-neutral-70",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "disabled:text-neutral-40",
      },
    ],

    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
    },
  }
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(({ className, variant, color, size, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, color, size }), className)}
      {...props}
    />
  );
});

Button.displayName = "Button";