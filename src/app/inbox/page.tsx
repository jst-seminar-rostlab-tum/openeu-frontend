'use client';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import BulkActions from '@/components/BulkActions/BulkActions';
import SearchAndFilters from '@/components/SearchAndFilters/SearchAndFilters';
import InboxOperations from '@/operations/inbox/InboxOperations';

import { createColumns,InboxItem } from './columns';
import InboxTable from './data-table';

export default function InboxPage() {
  const [data, setData] = useState<InboxItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    countries: [] as string[],
    relevanceRange: { min: 0, max: 100 },
    dateRange: { start: '', end: '' },
  });

  // Initialize data in useEffect to avoid render-time side effects
  useEffect(() => {
    setData(InboxOperations.getInboxItems());
  }, []);

  // Get unique countries for filter options
  const uniqueCountries = Array.from(new Set(data.map((item) => item.country)));

  // Check if any filters are active
  const hasActiveFilters = filters.countries.length > 0 || filters.relevanceRange.min > 0;

  // Action handlers
  const handleView = useCallback((itemId: string) => {
    alert(`Viewing item: ${itemId}`);
  }, []);

  const handleArchive = useCallback((itemId: string) => {
    alert(`Archiving item: ${itemId}`);
  }, []);

  const handleDelete = useCallback((itemId: string) => {
    setData((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // Create columns with action handlers
  const columns = useMemo(() => createColumns({
    onView: handleView,
    onArchive: handleArchive,
    onDelete: handleDelete,
  }), [handleView, handleArchive, handleDelete]);

  // Filter data based on custom filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCountry = filters.countries.length === 0 || filters.countries.includes(item.country);
      const matchesRelevance = item.relevanceScore >= filters.relevanceRange.min && item.relevanceScore <= filters.relevanceRange.max;
      return matchesCountry && matchesRelevance;
    });
  }, [data, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  // Get selected items
  const selectedItems = table.getFilteredSelectedRowModel().rows.map(row => row.original.id);

  // Bulk actions
  const handleBulkArchive = () => {
    alert(`Archiving ${selectedItems.length} items`);
    setRowSelection({});
  };

  const handleBulkDelete = () => {
    const selectedIds = selectedItems;
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setRowSelection({});
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Inbox Items</h1>

      <SearchAndFilters
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        uniqueCountries={uniqueCountries}
        hasActiveFilters={hasActiveFilters}
        totalItems={data.length}
        filteredItems={table.getFilteredRowModel().rows.length}
      />

      <BulkActions
        selectedCount={selectedItems.length}
        onBulkArchive={handleBulkArchive}
        onBulkDelete={handleBulkDelete}
      />

      <InboxTable
        table={table}
        onView={handleView}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />
    </div>
  );
}