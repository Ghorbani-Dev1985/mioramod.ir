import * as React from "react";
import { Platform, Pressable, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { TextClassContext } from "./text"; 


const buttonVariants = cva(
  cn(
    "group flex-row items-center justify-center gap-2 rounded-16 disabled:opacity-50",
    Platform.select({
      web: "whitespace-nowrap cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
    })
  ),
  {
    variants: {
      variant: {
        solid: "shadow-sm",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        subtle: "bg-neutral-100",
      },
      color: {
        primary: "",
        secondary: "",
      },
      size: {
        sm: "h-10 px-2 py-3",
        md: "h-12 px-2 py-3",
        lg: "h-14 px-2 py-3",
        iconSm: "size-8 rounded-full p-0",
        iconMd: "size-10 rounded-full p-0",
        iconLg: "size-12 rounded-full p-0",
      },
      fullWidth: {
        true: "flex-1 w-full",
      },
    },
    compoundVariants: [
      // ================= PRIMARY =================
      {
        variant: "solid",
        color: "primary",
        className: "bg-neutral-100 active:bg-neutral-80 disabled:bg-neutral-30",
      },
      {
        variant: "outline",
        color: "primary",
        className: "border-neutral-100 active:border-neutral-80 active:bg-neutral-100/10 disabled:border-neutral-50",
      },
      {
        variant: "ghost",
        color: "primary",
        className: "active:bg-neutral-100/20 disabled:bg-transparent",
      },
      {
        variant: "subtle",
        color: "primary",
        className: "bg-neutral-100 active:bg-neutral-200",
      },

      // ================= SECONDARY =================
      {
        variant: "solid",
        color: "secondary",
        className: "bg-neutral-80 active:bg-neutral-70 disabled:bg-neutral-30",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "border-neutral-80 active:border-neutral-70 active:bg-neutral-80/10 disabled:border-neutral-40",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "active:bg-neutral-80/20 disabled:bg-transparent",
      },
      {
        variant: "subtle",
        color: "secondary",
        className: "bg-neutral-80 active:bg-neutral-70",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);


const buttonTextVariants = cva(
  cn(
    "miora-label-sm",
    Platform.select({ web: "pointer-events-none transition-colors" })
  ),
  {
    variants: {
      variant: {
        solid: "",
        outline: "",
        ghost: "",
        subtle: "text-neutral-800",
      },
      color: {
        primary: "",
        secondary: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        iconSm: "",
        iconMd: "",
        iconLg: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Primary Text Colors
      { variant: "solid", color: "primary", className: "text-white" },
      { variant: "outline", color: "primary", className: "text-neutral-100 group-active:text-neutral-80" },
      { variant: "ghost", color: "primary", className: "text-neutral-100 group-active:text-neutral-80" },
      
      // Secondary Text Colors
      { variant: "solid", color: "secondary", className: "text-neutral-50" },
      { variant: "outline", color: "secondary", className: "text-neutral-80 group-active:text-neutral-70" },
      { variant: "ghost", color: "secondary", className: "text-neutral-80 group-active:text-neutral-70" },

      // Disabled States (Text)
      { variant: "solid", disabled: true, className: "text-neutral-50" },
      { variant: "outline", disabled: true, className: "text-neutral-50" },
      { variant: "ghost", disabled: true, className: "text-neutral-50" },
      { variant: "subtle", disabled: true, className: "text-neutral-40" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      disabled: false,
    },
  }
);

type ButtonProps = Omit<PressableProps, 'disabled'> & 
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    disabled?: boolean;
  };

function Button({
  className,
  variant,
  color,
  size,
  fullWidth,
  disabled,
  children,
  ...props
}: ButtonProps) {
  
  const isDisabled = disabled ?? false;
  const textClasses = buttonTextVariants({
    variant,
    color,
    size,
    disabled: isDisabled,
  });

  return (
    <TextClassContext.Provider value={textClasses}>
      <Pressable
        className={cn(
          buttonVariants({ variant, color, size, fullWidth }),
          isDisabled && "opacity-50",
          className
        )}
        role="button"
        disabled={isDisabled}
        {...props}
      >{children}</Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };