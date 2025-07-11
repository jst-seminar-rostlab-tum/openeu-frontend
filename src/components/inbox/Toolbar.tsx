import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useMemo } from 'react';

import { DateRangeFilter } from '@/components/DateRangeFilter';
import { DataTableBulkActions } from '@/components/inbox/BulkActions';
import { DataTableFacetedFilter } from '@/components/inbox/FacetedFilter';
import { DataTableViewOptions } from '@/components/inbox/ViewOptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTableItem } from '@/domain/entities/alerts/alert';
import ToolbarOperations from '@/operations/inbox/ToolbarOperations';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onBulkArchive?: () => void;
  onBulkDelete?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  onBulkArchive,
  onBulkDelete,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const countryOptions = useMemo(() => {
    const hasCountryColumn = table
      .getAllColumns()
      .some((col) => col.id === 'country');
    if (!hasCountryColumn) return [];
    try {
      const countryColumn = table.getColumn('country');
      if (!countryColumn) return [];

      const facetedValues = countryColumn.getFacetedUniqueValues();
      return Array.from(facetedValues.keys()).map((country) => ({
        label: country,
        value: country,
      }));
    } catch (error) {
      console.error('Error fetching country options:', error);
      return [];
    }
  }, [table]);

  // Show bulk actions when items are selected
  if (selectedCount > 0) {
    let archiveLabel = 'Archive';
    if (
      selectedRows.length > 0 &&
      typeof (selectedRows[0].original as AlertTableItem)?.is_active ===
        'boolean'
    ) {
      const allActive = selectedRows.every(
        (row) => (row.original as AlertTableItem).is_active === true,
      );
      const allInactive = selectedRows.every(
        (row) => (row.original as AlertTableItem).is_active === false,
      );
      if (allInactive) archiveLabel = 'Unarchive';
      else if (!allActive && !allInactive)
        archiveLabel = 'Switch Archive Status';
    }
    return (
      <div className="flex h-10 items-center justify-between">
        <DataTableBulkActions
          selectedCount={selectedCount}
          onArchive={onBulkArchive!}
          onDelete={onBulkDelete!}
          archiveLabel={archiveLabel}
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

  return (
    <div className="flex h-10 items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search all columns..."
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {(() => {
          const hasCountryColumn = table
            .getAllColumns()
            .some((col) => col.id === 'country');
          if (hasCountryColumn) {
            const countryColumn = table.getColumn('country');
            return countryColumn && countryOptions.length > 0 ? (
              <DataTableFacetedFilter
                column={countryColumn}
                title="Country"
                options={countryOptions}
              />
            ) : null;
          }
          return null;
        })()}
        {table.getColumn('date') && (
          <DateRangeFilter
            from={
              (
                table.getColumn('date')?.getFilterValue() as
                  | { from?: Date; to?: Date }
                  | undefined
              )?.from
            }
            to={
              (
                table.getColumn('date')?.getFilterValue() as
                  | { from?: Date; to?: Date }
                  | undefined
              )?.to
            }
            onSelect={ToolbarOperations.handleDateRangeChange(
              table.getColumn('date'),
            )}
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
