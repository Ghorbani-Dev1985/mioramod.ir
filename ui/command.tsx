"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl",
        "bg-white shadow-main",
        className,
      )}
      {...props}
    />
  );
}

function CommandInput({
  className,
  showSearchIcon = true,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  showSearchIcon?: boolean;
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="w-full flex items-center border-b border-neutral-100 px-4 h-14">
      {showSearchIcon && (
        <Search className="size-5 text-neutral-400 shrink-0" strokeWidth={2} />
      )}
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex-1 bg-transparent",
          showSearchIcon ? "px-3" : "",
          "text-sm outline-none",
          "placeholder:text-neutral-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-72 overflow-y-auto", className)}
      {...props}
    />
  );
}

function CommandEmpty(
  props: React.ComponentProps<typeof CommandPrimitive.Empty>,
) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-10 text-center text-sm text-neutral-500"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-2",
        "**:[[cmdk-group-heading]]:px-2",
        "**:[[cmdk-group-heading]]:pb-2",
        "**:[[cmdk-group-heading]]:text-xs",
        "**:[[cmdk-group-heading]]:font-medium",
        "**:[[cmdk-group-heading]]:text-neutral-500",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("mx-2 my-2 h-px bg-neutral-100", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer items-center",
        "rounded-xl p-3",
        "text-sm",
        "transition-all duration-200",
        "outline-none",
        "data-[selected=true]:bg-primary-50",
        "data-[selected=true]:text-primary-600",
        "data-[disabled=true]:pointer-events-none",
        "data-[disabled=true]:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-auto text-xs text-neutral-400", className)}
      {...props}
    />
  );
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
