import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";


export interface TableColumn<T> {
  id: number;
  key: string;
  title: string;

  width?: number | string;

  headClassName?: string;

  cellClassName?: string;

  render?: (
    value: any,
    row: T
  ) => React.ReactNode;
}

export interface DataTableProps<T> {
  id: number;
  data: T[];

  columns: TableColumn<T>[];

  footer?: ReactNode,

  loading?: boolean;

  emptyMessage?: string;

  className?: string;

  cellClassName?: string;

  sortable?: SortableOptions<T>;

  getRowId?: (row: T) => UniqueIdentifier;

  getRowClassName?: (row: T, index: number) => string;

  onOrderChange?: (rows: T[]) => void;
}

export interface SortableOptions<T> {
  getRowId: (row: T, index: number) => string | number;
  onOrderChange: (rows: T[]) => void;
}
