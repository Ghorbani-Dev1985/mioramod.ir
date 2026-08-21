"use client";

import { ReactNode } from "react";
import { cn } from "@/core/utils/shadcn.utils";
import { Input } from "@/shared/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface TableToolbarProps {
  search?: string;

  onSearchChange?: (value: string) => void;

  searchPlaceholder?: string;

  filters?: ReactNode;

  actions?: ReactNode;

  className?: string;
}

export function TableToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "جستجو...",
  filters,
  actions,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        `
        w-full
        flex
        flex-col
        gap-5
        my-6
        lg:flex-row
        lg:items-center
        lg:justify-between
      `,
        className,
      )}>
      {/* Right */}
      <div
        className="
                w-full
                md:max-w-65
                flex
                flex-col
                gap-2
                md:flex-row
                md:items-center
              ">
        {onSearchChange && (
            <Input
              startIcon={<MagnifyingGlassIcon />}
              value={search}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange(e.target.value)}
            />
        )}
      </div>
      {/* Left */}
      <div
        className="
        flex
        flex-wrap
        items-center
        gap-2
        ">
        {filters}
        {actions}
      </div>
    </div>
  );
}
