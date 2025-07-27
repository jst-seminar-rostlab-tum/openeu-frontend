'use client';

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo } from 'react';

import InboxSkeleton from '@/components/inbox/InboxSkeleton';
import { NewsletterDialog } from '@/components/inbox/NewsletterDialog';
import { DataTablePagination } from '@/components/inbox/Pagination';
import { DataTableToolbar } from '@/components/inbox/Toolbar';
import { Section } from '@/components/section';
import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';
import { useNotifications } from '@/domain/hooks/notificationsHooks';
import { useNewsletterDialog } from '@/domain/hooks/useNewsletterDialog';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { DataTable } from './data-table';
import { createColumns } from './inbox-columns';

interface InboxSectionProps {
  userId: string;
}

export function InboxSection({ userId }: InboxSectionProps) {
  const {
    data: notifications,
    error,
    isLoading,
  } = useNotifications(
    {
      userId: userId,
    },
    !!userId,
  );

  useEffect(() => {
    if (error) {
      ToastOperations.showError({
        title: 'Error Loading Notifications',
        message: 'Failed to load your notifications. Please try again later.',
      });
    }
  }, [error]);

  const data: InboxItem[] = useMemo(() => {
    if (!notifications) return [];

    const sortedNotifications = [...notifications].sort(
      (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
    );

    // Map notifications with index
    return sortedNotifications.map((notification) => ({
      id: notification.id.toString(),
      title: notification.message_subject ?? 'Newsletter',
      date: notification.sent_at,
      country: 'EU wide', // Backend doesn't provide country info yet
      relevanceScore: notification.relevance_score ?? undefined,
      message: notification.message,
    }));
  }, [notifications]);

  const { selectedItem, isOpen, openDialog, closeDialog } =
    useNewsletterDialog();

  const handleView = useCallback(
    (item: InboxItem) => {
      openDialog(item);
    },
    [openDialog],
  );

  const columns = useMemo(
    () =>
      createColumns({
        onView: handleView,
      }),
    [handleView],
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
    autoResetPageIndex: false,
  });

  if (isLoading) {
    return (
      <Section>
        <h1 className="text-2xl font-bold">Inbox</h1>
        <InboxSkeleton />
      </Section>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1">
        <div className="mt-1 sm:mt-0">
          <h1 className="text-2xl font-bold">Inbox</h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and manage your notifications and newsletters.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <DataTableToolbar table={table} />
        <DataTable table={table} columns={columns} />
        <DataTablePagination table={table} />
      </div>

      <NewsletterDialog
        item={selectedItem}
        open={isOpen}
        onOpenChange={closeDialog}
      />
    </div>
  );
}
