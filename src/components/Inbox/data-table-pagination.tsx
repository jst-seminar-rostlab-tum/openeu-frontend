import { Table } from '@tanstack/react-table';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>

      {pageCount > 1 && (
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
                className={
                  !table.getCanPreviousPage()
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(0);
                }}
                isActive={pageIndex === 0}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {pageIndex > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(pageIndex - 1);
                  }}
                >
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            )}

            {pageIndex > 0 && pageIndex < pageCount - 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(pageIndex);
                  }}
                  isActive
                >
                  {pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {pageIndex < pageCount - 2 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    table.setPageIndex(pageIndex + 1);
                  }}
                >
                  {pageIndex + 2}
                </PaginationLink>
              </PaginationItem>
            )}

            {pageIndex < pageCount - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.nextPage();
                }}
                className={
                  !table.getCanNextPage()
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
