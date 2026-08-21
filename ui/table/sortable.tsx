"use client";

import * as React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Bars3Icon } from "@heroicons/react/24/outline";

export interface CustomColumn<TData> {
  key: string;
  title: string;
  width?: string;
  render?: (value: unknown, row: TData, index: number) => React.ReactNode;
}

interface DraggableRowProps<TData> {
  row: Row<TData>;
  reorderRow: (dragIndex: number, dropIndex: number) => void;
}

function DraggableRow<TData>({ row, reorderRow }: DraggableRowProps<TData>) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "row",
    item: { index: row.index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: "row",
    drop: (item: { index: number }) => {
      if (item.index !== row.index) {
        reorderRow(item.index, row.index);
      }
    },
  });

  return (
    <TableRow
      ref={(node) => {
        dropRef(node); 
      }}
       className={`
        transition-all duration-200
        ${isDragging 
          ? "opacity-60 shadow-lg cursor-grabbing" 
          : "opacity-100 cursor-default"}
      `}
      style={{
        transform: isDragging ? "rotate(0.5deg)" : "none",
      }}
    >
      <TableCell>
        <button ref={(node) => {
    if (node) {
      dragRef(node);
    }
        }} className="cursor-move">
          <Bars3Icon className="size-6" />
        </button>
      </TableCell>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

interface SortTableProps<TData> {
  data: TData[];
  columns: CustomColumn<TData>[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
}

function SortTable<TData extends { id?: string | number }>({
  data,
  columns: customColumns,
  onReorder,
}: SortTableProps<TData>) {
  const tanstackColumns = React.useMemo<ColumnDef<TData>[]>(() => {
  return customColumns.map((col) => ({
    id: col.key,
    header: col.title,
    accessorKey: col.render ? undefined : col.key,

    meta: {
      width: col.width,
    },

    cell: ({ row }) => {
      const rawValue = col.render ? undefined : row.getValue(col.key);

      if (col.render) {
        return col.render(rawValue, row.original, row.index);
      }

      return rawValue;
    },
  }));
}, [customColumns]);

  const table = useReactTable({
    data,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id ?? Math.random()), 
    enableSorting: false,
    enableFilters: false,
  });
  
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead />
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} reorderRow={onReorder} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tanstackColumns.length + 1} className="h-24 text-center">
                  نتیجه‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DndProvider>
  );
}
export { SortTable };
export default SortTable;