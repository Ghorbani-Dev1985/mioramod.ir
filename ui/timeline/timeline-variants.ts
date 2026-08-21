import { cva } from "class-variance-authority";

export const timelineVariants = cva("", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      success: "",
      error: "",
      warning: "",
      info: "",
      neutral: "",
      purple: "",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

export const markerVariants = cva(
  "z-10 flex-center size-6 rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-500",
        secondary: "bg-secondary-50 text-secondary-500",
        success: "bg-success-50 text-success-500",
        error: "bg-error-50 text-error-500",
        warning: "bg-warning-50 text-warning-500",
        info: "bg-info-50 text-info-500",
        neutral: "bg-neutral-50 text-neutral-500",
        purple: "bg-purple-50 text-purple-500",
      },
    },

    defaultVariants: {
      variant: "primary",
    },
  }
);

export const lineVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      success: "bg-success-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-info-500",
      neutral: "bg-neutral-500",
      purple: "bg-purple-500",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

export const borderVariants = cva("", {
  variants: {
    variant: {
      primary: "border-primary-500",
      secondary: "border-secondary-500",
      success: "border-green-500",
      error: "border-red-500",
      warning: "border-yellow-500",
      info: "border-sky-500",
      neutral: "border-neutral-300",
      purple: "border-violet-500",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});