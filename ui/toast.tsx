"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { useTheme } from "next-themes";

import {
  Toaster as Sonner,
  type ToasterProps,
} from "sonner";

const Toast = ({
  ...props
}: ToasterProps) => {
  const { theme = "system" } =
    useTheme();

  return (
    <Sonner
      theme={
        theme as ToasterProps["theme"]
      }
      position="bottom-right"
      expand
      richColors={false}
      closeButton={false}
      className="toaster group"
      toastOptions={{
        classNames: {
          
          toast: [
            "rounded-2xl border shadow-main",

            "bg-white text-foreground",

            "font-vazirmatn",

            "border-neutral-200",

            "gap-x-3",

            "data-[type=success]:!border-success-200",
            "data-[type=success]:!bg-success-50",
            "data-[type=success]:!text-success-500",

            "data-[type=error]:!border-error-200",
            "data-[type=error]:!bg-error-50",
            "data-[type=error]:!text-error-500",

            "data-[type=warning]:!border-warning-200",
            "data-[type=warning]:!bg-warning-50",
            "data-[type=warning]:!text-warning-500",


            "data-[type=info]:!border-info-200",
            "data-[type=info]:!bg-info-50",
            "data-[type=info]:!text-info-500",
          ].join(" "),

          title: "text-sm font-semibold",

          description:
            "text-xs text-neutral-600",

          actionButton: [
            "bg-primary-500",
            "text-white",
            "hover:bg-primary-600",
          ].join(" "),

          cancelButton: [
            "bg-neutral-100",
            "text-neutral-700",
            "hover:bg-neutral-200",
          ].join(" "),

          closeButton: [
            "bg-white",
            "border border-neutral-200",

            "text-neutral-500",

            "hover:bg-neutral-100",
            "hover:text-neutral-800",
          ].join(" "),
        },
      }}
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-success-500" />
        ),

        info: (
          <InfoIcon className="size-5 text-info-500" />
        ),

        warning: (
          <TriangleAlertIcon className="size-5 text-warning-500" />
        ),

        error: (
          <OctagonXIcon className="size-5 text-error-500" />
        ),

        loading: (
          <Loader className="size-5 animate-spin text-primary-500" />
        ),
      }}
      {...props}
    />
  );
};

export { Toast };