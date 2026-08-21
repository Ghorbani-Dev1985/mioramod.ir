"use client";

import * as React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

import { Button } from "@/shared/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

type PaginationItemType = number | "dots";

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function generatePagination(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
): PaginationItemType[] {
  const totalPageNumbers = siblingCount + 5;

  // no dots
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 2;

  // only right dots
  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, "dots", totalPages];
  }

  // only left dots
  if (showLeftDots && !showRightDots) {
    const rightRange = range(
      totalPages - (3 + siblingCount * 2) + 1,
      totalPages,
    );
    return [1, "dots", ...rightRange];
  }

  // both dots
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, "dots", ...middleRange, "dots", totalPages];
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(
        "mx-auto w-fit flex items-center",
        className,
      )}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("w-fit inline-flex justify-center items-center", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn(className)} data-slot="pagination-item" {...props} />
  );
}

interface PaginationButtonProps extends React.ComponentProps<typeof Button> {
  isActive?: boolean;
}

function PaginationButton({
  className,
  isActive,
  ...props
}: PaginationButtonProps) {
  return (
    <Button
      size="sm"
      variant={isActive ? "filled" : "outline"}
      className={cn(
        [
          "size-9 shrink-0 rounded-none border border-neutral-200 px-0",

          !isActive && [
            "border-neutral-200",
            "bg-white",
            "text-neutral-500",
            "hover:border-primary-300",
            "hover:bg-primary-50",
            "hover:text-primary-700",
          ],

          isActive && [
            "border-primary-200",
            "bg-primary-100",
            "text-primary-700",
            "hover:bg-primary-200",
          ],
        ],
        className,
      )}
      {...props}
    />
  );
}

function PaginationEllipsis() {
  return (
    <div
      className={cn(
        "flex-center size-9 border border-neutral-200 bg-white text-neutral-500",
      )}>
      <MoreHorizontalIcon className="size-4" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Main Pagination                               */
/* -------------------------------------------------------------------------- */

function PaginationRoot({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const paginationRange = generatePagination(
    currentPage,
    totalPages,
    siblingCount,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Pagination dir="rtl" className={className}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={handlePrevious}
            className={cn([
              "size-9 rounded-r-md rounded-l-none border border-neutral-200 border-l-0 bg-white p-0",
              "hover:border-primary-300",
              "hover:bg-primary-50",
              "disabled:pointer-events-none",
              "disabled:opacity-50",
            ])}>
            <ChevronRightIcon className="size-5 text-primary-500" />
          </Button>
        </PaginationItem>

        {/* Pages */}
        {paginationRange.map((page, index) => {
          if (page === "dots") {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const isActive = currentPage === page;

          return (
            <PaginationItem key={page}>
              <PaginationButton
                isActive={isActive}
                onClick={() => onPageChange(page)}>
                {page}
              </PaginationButton>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className={cn([
              "size-9 rounded-l-md rounded-r-none border border-neutral-200 border-r-0 bg-white p-0",
              "hover:border-primary-300",
              "hover:bg-primary-50",
              "disabled:pointer-events-none",
              "disabled:opacity-50",
            ])}>
            <ChevronLeftIcon className="size-5 text-primary-500" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export {
  PaginationRoot,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationEllipsis,
};
