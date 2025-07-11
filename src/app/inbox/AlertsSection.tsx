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
import { toggleAlertActive } from '@/repositories/alertRepository';

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
            Stay up to date with the latest regulatory and legislative alerts.
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <AddAlertDialog userId={userId} />
        </div>
      </div>

      <div className="space-y-2">
        <DataTableToolbar table={alertTable} />
        <DataTable table={alertTable} columns={alertColumns} />
        <DataTablePagination table={alertTable} />
      </div>
    </div>
  );
}
