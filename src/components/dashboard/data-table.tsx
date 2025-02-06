"use client";

import * as React from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ChevronDown, ListFilter, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/dropdown-menu";
import { Button } from "@/shared/button";
import { Input } from "@/shared/input";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Reset column visibility based on screen size
      const defaultHidden: Record<string, boolean> = isMobile
        ? columns.reduce(
            (acc, column) => ({
              ...acc,
              [(column as any).id]: false,
            }),
            {}
          )
        : {};

      // Always show the first column and essential columns on mobile
      if (isMobile) {
        defaultHidden[columns[0].id as string] = true;
      }

      setColumnVisibility(defaultHidden);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [columns, isMobile]);

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [searchValue, setSearchValue] = useState(globalFilter);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const handleColumnFilter = (columnId: string, value: string) => {
    setColumnFilters((prev) => {
      const existing = prev.find((f) => f.id === columnId);
      if (existing && !value) {
        return prev.filter((f) => f.id !== columnId);
      }
      if (!existing && value) {
        return [...prev, { id: columnId, value }];
      }
      if (existing && value) {
        return prev.map((f) => (f.id === columnId ? { ...f, value } : f));
      }
      return prev;
    });
  };

  const toggleRowExpansion = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="w-full">
      {/* Responsive search and filter controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center py-4 px-1 gap-2">
        <div className="w-full md:w-auto flex items-center gap-2">
          <Search className="text-gray-400 size-4" />
          <Input
            placeholder="Search all columns..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full md:max-w-sm"
          />
        </div>

        <div className="w-full md:w-auto flex items-center gap-2">
          {activeFilter && (
            <div className="flex-1 md:flex-initial flex items-center gap-2">
              <Input
                placeholder={`Filter ${activeFilter}...`}
                value={
                  (columnFilters.find((f) => f.id === activeFilter)
                    ?.value as string) || ""
                }
                onChange={(e) =>
                  handleColumnFilter(activeFilter, e.target.value)
                }
                className="w-full md:w-auto"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setActiveFilter(null);
                  handleColumnFilter(activeFilter, "");
                }}
              >
                Clear
              </Button>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="ml-auto"
                iconPlacement="left"
                Icon={<ListFilter height={20} width={20} className="size-5" />}
              >
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <div className="text-sm font-semibold mb-2">
                  Filter by column
                </div>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanFilter())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={activeFilter === column.id}
                      onCheckedChange={() =>
                        setActiveFilter(
                          activeFilter === column.id ? null : column.id
                        )
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <div className="text-sm font-semibold mb-2">Toggle columns</div>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Responsive table */}
      <div className="rounded-md border w-full overflow-x-auto">
        {isMobile ? (
          // Mobile card view
          <div className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <div key={row.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  {/* Always show first column as header */}
                  <div className="font-medium">
                    {flexRender(
                      row.getVisibleCells()[0].column.columnDef.cell,
                      row.getVisibleCells()[0].getContext()
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(row.id)}
                  >
                    <ChevronDown
                      className={`transition-transform ${
                        expandedRows.has(row.id) ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>

                {/* Expandable content */}
                {expandedRows.has(row.id) && (
                  <div className="mt-2 space-y-2">
                    {row
                      .getVisibleCells()
                      .slice(1)
                      .map((cell) => (
                        <div
                          key={cell.id}
                          className="flex justify-between gap-2 py-1"
                        >
                          <span className="text-sm font-medium text-gray-500">
                            {cell.column.id}:
                          </span>
                          <span className="text-sm text-right">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Desktop table view
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
                          cell.getContext()
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Responsive pagination controls */}
      <div className="flex flex-col md:flex-row items-center justify-end space-y-2 md:space-y-0 md:space-x-2 py-4">
        <div className="w-full md:flex-1 text-sm text-muted-foreground text-center md:text-left">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
