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
import { useCallback, useMemo, useState } from 'react';

import { DataTablePagination } from '@/components/Inbox/data-table-pagination';
import { DataTableToolbar } from '@/components/Inbox/data-table-toolbar';
import { Section } from '@/components/section';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/domain/hooks/notificationsHooks';
import { useAuth } from '@/domain/hooks/useAuth';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { createColumns } from './columns';
import { DataTable } from './data-table';

export default function InboxPage() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Get user from auth context
  const { user } = useAuth();

  // Fetch notifications with user ID
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications(
    user?.id || '',
    !!user, // Only fetch when user exists
  );

  // Use notifications data directly
  const data = useMemo(() => notifications || [], [notifications]);

  // Get unique countries for filter options
  const uniqueCountries = useMemo(() => {
    try {
      return Array.from(
        new Set(data.map((item) => item.country).filter(Boolean)),
      );
    } catch {
      ToastOperations.showError({
        title: 'Error',
        message: `Error extracting unique countries.`,
      });
      return [];
    }
  }, [data]);

  // Action handlers
  const handleView = useCallback((itemId: string) => {
    ToastOperations.showInfo({
      title: 'Info',
      message: `Viewing item: ${itemId}`,
    });
  }, []);

  const handleArchive = useCallback((itemId: string) => {
    ToastOperations.showInfo({
      title: 'Info',
      message: `Archiving item: ${itemId}`,
    });
  }, []);

  const handleDelete = useCallback((itemId: string) => {
    ToastOperations.showInfo({
      title: 'Info',
      message: `Deleting item: ${itemId}`,
    });
    // TODO: Implement actual delete API call
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
    ToastOperations.showInfo({
      title: 'Info',
      message: `Archiving ${selectedItems.length} items`,
    });
    setRowSelection({});
  }, [table]);

  const handleBulkDelete = useCallback(() => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
    ToastOperations.showInfo({
      title: 'Info',
      message: `Deleting ${selectedIds.length} items`,
    });
    setRowSelection({});
  }, [table]);

  // Handle loading state
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

  // Handle error state
  if (error) {
    return (
      <Section>
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load notifications</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      </Section>
    );
  }

  // Handle no user state
  if (!user) {
    return (
      <Section>
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="text-center py-8">
          <p>Please log in to view your notifications</p>
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
