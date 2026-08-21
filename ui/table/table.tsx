"use client";

import * as React from "react";

import { cn } from "@/core/utils/shadcn.utils";

function Table({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="
        relative
        w-full
        overflow-x-auto
        rounded-2xl
        border-none md:border
        border-neutral-100
        bg-white
      "
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        [
          "bg-primary-100",

          "[&_tr]:border-b",

          "[&_tr]:border-white",
        ],
        className
      )}
      {...props}
    />
  );
}

function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:last-child]:border-0",
        className
      )}
      {...props}
    />
  );
}

function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        [
          "bg-primary-100",
          "[&_tr:last-child_td:first-child]:rounded-bl-2xl",
          "[&_tr:last-child_td:last-child]:rounded-br-2xl",
        ],
        className
      )}
      {...props}
    />
  );
}

function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
      
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        [
          "h-11",

          "px-5",

          "text-right",

          "align-middle",

          "font-medium",

          "text-neutral-900",

          "whitespace-nowrap",

          "border-l border-white",

          "last:border-l-0",
        ],
        className
      )}
      {...props}
    />
  );
}

function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        [
          "px-4",

          "py-3",

          "align-middle",

          "text-neutral-600",

          "whitespace-nowrap",
        ],
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-4 text-sm text-neutral-500",
        className
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};