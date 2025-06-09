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
import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';
import { useNotifications } from '@/domain/hooks/notificationsHooks';
import { useAuth } from '@/domain/hooks/useAuth';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { createColumns } from './columns';
import { DataTable } from './data-table';

export default function InboxPage() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { user } = useAuth();

  // Fetch notifications with user ID
  const {
    data: notifications,
    isLoading,
    error,
  } = useNotifications(
    {
      userId: user?.id || '',
    },
    !!user,
  );

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      ToastOperations.showError({
        title: 'Error Loading Notifications',
        message: 'Failed to load your notifications. Please try again later.',
      });
    }
  }, [error]);

  // Map notifications to InboxItem format
  const data: InboxItem[] = useMemo(() => {
    if (!notifications) return [];

    return notifications.map((notification) => ({
      id: notification.id.toString(),
      title: notification.type || 'No title',
      date: new Date(notification.sent_at).toLocaleDateString(),
      country: 'EU wide', // Backend doesn't provide country info yet
      relevanceScore: 0, // Backend doesn't provide relevance score yet
    }));
  }, [notifications]);

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

  return (
    <Section>
      <h1 className="text-2xl font-bold">Inbox</h1>
      <div className="space-y-2">
        <DataTableToolbar
          table={table}
          onBulkArchive={handleBulkArchive}
          onBulkDelete={handleBulkDelete}
        />
        <DataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>
    </Section>
  );
}
