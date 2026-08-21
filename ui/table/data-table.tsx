"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { DataTableProps } from "./table.types";

import { TableEmpty } from "./table-empty";

import { TableSkeleton } from "./table-skeleton";
import { cn } from "@/core/utils/shadcn.utils";

export function  DataTable<T>({
  data,
  columns,
  footer,
  loading,
  emptyMessage,
  className,
  cellClassName,
  getRowClassName,
}: DataTableProps<T>) {
  if (loading) {
    return <TableSkeleton rows={8} columns={columns.length} />;
  }

  if (!data.length) {
    return <TableEmpty message={emptyMessage} />;
  }
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={String(column.key)}
              style={column.width ? { width: column.width } : undefined}
              className={cn(
                ["act", "id"].includes(column.key) && "w-1 whitespace-nowrap",
                column.headClassName,
              )}>
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex} className={getRowClassName ? getRowClassName(row, rowIndex) : undefined}>
            {columns.map((column) => {
              const value = row[column.key as keyof T];
              return (
                <TableCell
                   key={String(column.key)}
                   style={column.width ? { width: column.width } : undefined}
                   className={cn(
                     ["act", "id"].includes(column.key) &&
                       "w-1 whitespace-nowrap text-center",
                     column.id && "w-1 whitespace-nowrap",
                     column.cellClassName,
                     cellClassName,
                   )}>
                  {column.render
                    ? column.render(value, row)
                    : String(value ?? "")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} className="text-neutral-900">
              {footer}
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
