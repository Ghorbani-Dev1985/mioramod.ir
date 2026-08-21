import { cva } from "class-variance-authority";

export const radialProgressVariants = cva("", {
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
