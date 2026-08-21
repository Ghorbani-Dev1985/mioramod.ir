"use client";

import ToLocalStringNumber from "@/core/utils/to-local-string-num.utils";
import { PaginationRoot } from "@/shared/ui/pagination";

interface TablePaginationProps {
  currentPage: number;

  totalPages: number;

  onPageChange: (
    page: number
  ) => void;

  totalItems?: number;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: TablePaginationProps) {
  return (
    <div className="w-full flex flex-col gap-4 pt-4 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-neutral-500">
        {totalItems
          ? `نتایج 1 تا ${ToLocalStringNumber(totalItems)} از 10 `
          : ""}
      </div>
      <div className="flex justify-end">
         <PaginationRoot
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      </div>
     
    </div>
  );
}