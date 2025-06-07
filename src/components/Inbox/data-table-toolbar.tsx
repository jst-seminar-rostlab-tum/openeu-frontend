import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useMemo } from 'react';

import { DataTableBulkActions } from '@/components/Inbox/data-table-bulk-actions';
import { DataTableDateRangeFilter } from '@/components/Inbox/data-table-date-range-filter';
import { DataTableFacetedFilter } from '@/components/Inbox/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/Inbox/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  uniqueCountries: string[];
  onBulkArchive?: () => void;
  onBulkDelete?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  uniqueCountries,
  onBulkArchive,
  onBulkDelete,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  // Memoize country options to prevent recreation
  const countryOptions = useMemo(
    () =>
      uniqueCountries.map((country) => ({
        label: country,
        value: country,
      })),
    [uniqueCountries],
  );

  // Show bulk actions when items are selected
  if (selectedCount > 0) {
    return (
      <div className="flex h-10 items-center justify-between">
        <DataTableBulkActions
          selectedCount={selectedCount}
          onArchive={onBulkArchive!}
          onDelete={onBulkDelete!}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.toggleAllPageRowsSelected(false)}
          className="h-8"
        >
          Clear selection
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Show normal toolbar when no items are selected
  return (
    <div className="flex h-10 items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search all columns..."
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('country') && (
          <DataTableFacetedFilter
            column={table.getColumn('country')}
            title="Country"
            options={countryOptions}
          />
        )}
        {table.getColumn('date') && (
          <DataTableDateRangeFilter
            column={table.getColumn('date')}
            title="Date Range"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
