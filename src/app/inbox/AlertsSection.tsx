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
import { AlertDetailsDialog } from '@/components/inbox/AlertDetailsDialog';
import { DataTablePagination } from '@/components/inbox/Pagination';
import { DataTableToolbar } from '@/components/inbox/Toolbar';
import { ViewAlertMeetingsDialog } from '@/components/inbox/ViewAlertMeetingsDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAlerts } from '@/domain/hooks/alertHooks';
import { toggleAlertActive } from '@/repositories/alertRepository';

import { getAlertColumns } from './alertColumns';
import { AlertTableItem, mapAlertToTableItem } from './alertTypes';
import { DataTable } from './data-table';

interface AlertsSectionProps {
  userId: string;
}

export function AlertsSection({ userId }: AlertsSectionProps) {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [viewAlertDialogOpen, setViewAlertDialogOpen] = useState(false);
  const [alertDetailsDialogOpen, setAlertDetailsDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertTableItem | null>(
    null,
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const queryClient = useQueryClient();

  const { data: alerts, isLoading: isAlertsLoading } = useAlerts(
    {
      userId: userId,
    },
    true,
  );

  const alertData = useMemo(() => {
    return alerts?.map(mapAlertToTableItem).sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [alerts]);

  const handleViewAlert = useCallback((alert: AlertTableItem) => {
    setSelectedAlert(alert);
    setViewAlertDialogOpen(true);
  }, []);

  const handleAlertTitleClick = useCallback((alert: AlertTableItem) => {
    setSelectedAlert(alert);
    setAlertDetailsDialogOpen(true);
  }, []);

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

  const handleViewMeetings = useCallback((alert: AlertTableItem) => {
    setSelectedAlert(alert);
    setViewAlertDialogOpen(true);
  }, []);

  const alertColumns = useMemo(
    () =>
      getAlertColumns({
        onView: handleViewAlert,
        onTitleClick: handleAlertTitleClick,
        onToggleActive: handleToggleActive,
        onViewMeetings: handleViewMeetings,
      }),
    [
      handleViewAlert,
      handleAlertTitleClick,
      handleToggleActive,
      handleViewMeetings,
    ],
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
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
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
          <Button
            className="w-fit"
            size="sm"
            onClick={() => setAlertDialogOpen(true)}
            variant="outline"
          >
            Add new alert
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <DataTableToolbar table={alertTable} />
        <DataTable table={alertTable} columns={alertColumns} />
        <DataTablePagination table={alertTable} />
      </div>

      <AddAlertDialog
        open={alertDialogOpen}
        onOpenChange={setAlertDialogOpen}
        userId={userId}
      />

      <ViewAlertMeetingsDialog
        alert={selectedAlert}
        open={viewAlertDialogOpen}
        onOpenChange={setViewAlertDialogOpen}
      />

      <AlertDetailsDialog
        open={alertDetailsDialogOpen}
        onOpenChange={setAlertDetailsDialogOpen}
        alert={selectedAlert}
        onViewMeetings={(alert: AlertTableItem) => {
          setSelectedAlert(alert);
          setViewAlertDialogOpen(true);
        }}
      />
    </div>
  );
}
