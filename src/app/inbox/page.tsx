'use client';

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataTablePagination } from '@/components/Inbox/data-table-pagination';
import { DataTableToolbar } from '@/components/Inbox/data-table-toolbar';
import { Section } from '@/components/section';
import { Skeleton } from '@/components/ui/skeleton';
import InboxOperations from '@/operations/inbox/InboxOperations';

import { createColumns, InboxItem } from './columns';
import { DataTable } from './data-table';

export default function InboxPage() {
  const [data, setData] = useState<InboxItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const items = InboxOperations.getInboxItems();
        setData(items);
      } catch (error) {
        console.error('Failed to load inbox items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Get unique countries for filter options - memoized to prevent recalculation
  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.country)));
  }, [data]);

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

  const columns = useMemo(
    () =>
      createColumns({
        onView: handleView,
        onArchive: handleArchive,
        onDelete: handleDelete,
      }),
    [handleView, handleArchive, handleDelete],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  const handleBulkArchive = useCallback(() => {
    const selectedItems = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
    alert(`Archiving ${selectedItems.length} items`);
    setRowSelection({});
  }, [table]);

  const handleBulkDelete = useCallback(() => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setRowSelection({});
  }, [table]);

  // Loading state with proper skeleton
  if (isLoading) {
    return (
      <Section>
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <h1 className="text-2xl font-bold">Inbox</h1>
      <div className="space-y-2">
        <DataTableToolbar
          table={table}
          uniqueCountries={uniqueCountries}
          onBulkArchive={handleBulkArchive}
          onBulkDelete={handleBulkDelete}
        />
        <DataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </Section>
  );
}
