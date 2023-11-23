"use client";

import * as React from "react";
import { Table as TanstackTable } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableToolbarProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex gap-1 dark:text-white">
      <Input
        className="max-w-xs"
        placeholder="title filter..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="description filter..."
        value={
          (table.getColumn("description")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("description")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="slug filter..."
        value={(table.getColumn("slug")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("slug")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="content filter..."
        value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("content")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="status filter..."
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("status")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="publishedAt filter..."
        value={
          (table.getColumn("publishedAt")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("publishedAt")?.setFilterValue(event.target.value)
        }
      />

      <Input
        className="max-w-xs"
        placeholder="authorId filter..."
        value={(table.getColumn("authorId")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("authorId")?.setFilterValue(event.target.value)
        }
      />

      {/* {table.getColumn("role") && roles && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Rol"
            options={roles}
          />
        )} */}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="w-4 h-4 ml-2" />
        </Button>
      )}
      <div className="flex-1 ">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnsOff?: string[];
  subject: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnsOff,
  subject,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  React.useEffect(() => {
    columnsOff &&
      columnsOff.forEach((colName) => {
        table.getColumn(colName)?.toggleVisibility(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-4 dark:text-white">
      <DataTableToolbar table={table} />
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} subject={subject} />
    </div>
  );
}
