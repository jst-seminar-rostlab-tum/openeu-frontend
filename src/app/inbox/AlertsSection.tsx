'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { AddAlertDialog } from '@/components/inbox/AddAlertDialog';
import InboxSkeleton from '@/components/inbox/InboxSkeleton';
import { DataTablePagination } from '@/components/inbox/Pagination';
import { DataTableToolbar } from '@/components/inbox/Toolbar';
import { Section } from '@/components/section';
import { mapAlertToTableItem } from '@/domain/entities/alerts/alert';
import { useAlerts } from '@/domain/hooks/alertHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { deleteAlert, toggleAlertActive } from '@/repositories/alertRepository';

import { getAlertColumns } from './alert-columns';
import { DataTable } from './data-table';

interface AlertsSectionProps {
  userId: string;
}

export function AlertsSection({ userId }: AlertsSectionProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const queryClient = useQueryClient();

  const { data: alerts, isLoading: isAlertsLoading } = useAlerts({
    userId: userId,
  });

  const alertData = useMemo(() => {
    return alerts?.map(mapAlertToTableItem).sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [alerts]);

  const handleToggleActive = useCallback(
    async (alertId: string, active: boolean) => {
      try {
        await toggleAlertActive(alertId, active);
        queryClient.invalidateQueries({ queryKey: ['alerts', userId] });
      } catch (error) {
        console.error('Error toggling alert active:', error);
      }
    },
    [queryClient, userId],
  );

  const alertColumns = useMemo(
    () =>
      getAlertColumns({
        onToggleActive: handleToggleActive,
      }),
    [handleToggleActive],
  );

  const alertTable = useReactTable({
    data: alertData || [],
    columns: alertColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleBulkActivationToggle = useCallback(async () => {
    const selectedRows = alertTable.getFilteredSelectedRowModel().rows;
    if (!selectedRows.length) return;

    const allActive = selectedRows.every((row) => row.original.is_active);
    const allInactive = selectedRows.every((row) => !row.original.is_active);

    let activationAction = 'updated';
    if (allActive) activationAction = 'deactivated';
    else if (allInactive) activationAction = 'activated';

    const results = await Promise.allSettled(
      selectedRows.map((row) =>
        toggleAlertActive(row.original.id, !row.original.is_active),
      ),
    );

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    const failCount = results.filter((r) => r.status === 'rejected').length;

    setRowSelection({});
    queryClient.invalidateQueries({ queryKey: ['alerts', userId] });

    if (failCount === 0) {
      ToastOperations.showSuccess({
        title: 'Alerts Updated',
        message: `${successCount} alert${successCount !== 1 ? 's' : ''} ${activationAction}.`,
      });
    } else {
      ToastOperations.showError({
        title: 'Error',
        message: `${failCount} alert${failCount !== 1 ? 's' : ''} failed to be ${activationAction}.`,
      });
      console.error(
        'Some alerts failed to update:',
        results.filter((r) => r.status === 'rejected'),
      );
    }
  }, [alertTable, queryClient, userId]);

  const handleBulkDelete = useCallback(async () => {
    const selectedRows = alertTable.getFilteredSelectedRowModel().rows;
    if (!selectedRows.length) return;

    const deletionResults = await Promise.allSettled(
      selectedRows.map((row) => deleteAlert(row.original.id)),
    );

    const successfulDeletes = deletionResults.filter(
      (result) => result.status === 'fulfilled',
    ).length;

    setRowSelection({});
    queryClient.invalidateQueries({ queryKey: ['alerts', userId] });

    if (successfulDeletes > 0) {
      ToastOperations.showSuccess({
        title: 'Alerts Deleted',
        message: `${successfulDeletes} alert${successfulDeletes !== 1 ? 's' : ''} deleted.`,
      });
    }

    const failedDeletes = deletionResults.filter(
      (result) => result.status === 'rejected',
    );
    if (failedDeletes.length > 0) {
      ToastOperations.showError({
        title: 'Error',
        message: `Failed to delete ${failedDeletes.length} alert${failedDeletes.length !== 1 ? 's' : ''}.`,
      });
      console.error('Failed deletions:', failedDeletes);
    }
  }, [alertTable, queryClient, userId]);

  if (isAlertsLoading) {
    return (
      <Section>
        <h1 className="text-2xl font-bold">Alerts</h1>
        <InboxSkeleton />
      </Section>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1">
        <div className="mt-1 sm:mt-0">
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage alerts to get notified about topics and
            legislative updates that matter to you.
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <AddAlertDialog userId={userId} />
        </div>
      </div>

      <div className="space-y-2">
        <DataTableToolbar
          table={alertTable}
          onBulkActivate={handleBulkActivationToggle}
          onBulkDelete={handleBulkDelete}
        />
        <DataTable table={alertTable} columns={alertColumns} />
        <DataTablePagination table={alertTable} />
      </div>
    </div>
  );
}
