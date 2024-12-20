'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui-components/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/ui-components/button';
import { PlusCircleIcon } from 'lucide-react';
import { DataTableProps } from '@/types/interfaces';

export function DataTable<TData extends { id: number }>({
  columns,
  data,
  onAddRow,
  onAddPayer,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {table
              .getHeaderGroups()
              .map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )),
              )}
            <TableHead>
              <div className="space-y-2 min-w-30 h-full">
                <div className="flex items-center justify-center h-1/2">
                  <Button
                    aria-description="Add additional payer"
                    variant="outline"
                    size="icon"
                    onClick={onAddPayer}
                  >
                    <PlusCircleIcon />
                  </Button>
                </div>
                <div className="text-center h-1/2"></div>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>
              <Button
                aria-description="Add a new cost"
                variant="outline"
                size="icon"
                onClick={onAddRow}
              >
                <PlusCircleIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
