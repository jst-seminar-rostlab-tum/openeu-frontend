'use client';

import { useQueryClient } from '@tanstack/react-query';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { DataTablePagination } from '@/components/inbox/Pagination';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { useAlerts } from '@/domain/hooks/alertHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';
import {
  createNewAlert,
  getMeetingsForAlert,
  toggleAlertActive,
} from '@/repositories/alertRepository';

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
  const [alertDescription, setAlertDescription] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<AlertTableItem | null>(
    null,
  );
  const [alertMeetings, setAlertMeetings] = useState<Meeting[]>([]);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);
  const [meetingSearchQuery, setMeetingSearchQuery] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set(),
  );
  const queryClient = useQueryClient();

  const { data: alerts, isLoading: isAlertsLoading } = useAlerts(userId, true);

  const alertData = useMemo(() => {
    return alerts?.map(mapAlertToTableItem).sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, [alerts]);

  const openViewAlertDialog = useCallback(async (alertId: string) => {
    setViewAlertDialogOpen(true);
    setIsLoadingMeetings(true);

    try {
      const meetings = await getMeetingsForAlert(alertId);
      setAlertMeetings(meetings);
    } catch (error) {
      ToastOperations.showError({
        title: 'Error Loading Meetings',
        message:
          'Failed to load meetings for this alert. Please try again later.',
      });
      console.error('Error loading meetings:', error);
    } finally {
      setIsLoadingMeetings(false);
    }
  }, []);

  const handleViewAlert = useCallback(
    (alert: AlertTableItem) => {
      openViewAlertDialog(alert.id);
    },
    [openViewAlertDialog],
  );

  const handleAlertTitleClick = useCallback((alert: AlertTableItem) => {
    setSelectedAlert(alert);
    setAlertDetailsDialogOpen(true);
  }, []);

  const handleToggleActive = useCallback(
    async (alertId: string, active: boolean) => {
      try {
        await toggleAlertActive(alertId, active);
        ToastOperations.showSuccess({
          title: 'Success',
          message: `Alert ${active ? 'activated' : 'deactivated'} successfully.`,
        });
        queryClient.invalidateQueries({ queryKey: ['alerts', userId] });
      } catch (error) {
        ToastOperations.showError({
          title: 'Error',
          message: `Failed to ${active ? 'activate' : 'deactivate'} alert. Please try again.`,
        });
        console.error('Error toggling alert active:', error);
      }
    },
    [queryClient, userId],
  );

  const toggleDescriptionExpansion = useCallback((meetingId: string) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(meetingId)) {
        newSet.delete(meetingId);
      } else {
        newSet.add(meetingId);
      }
      return newSet;
    });
  }, []);

  const filteredMeetings = useMemo(() => {
    if (!meetingSearchQuery.trim()) return alertMeetings;

    return alertMeetings.filter(
      (meeting) =>
        meeting.title
          .toLowerCase()
          .includes(meetingSearchQuery.toLowerCase()) ||
        (meeting.description &&
          meeting.description
            .toLowerCase()
            .includes(meetingSearchQuery.toLowerCase())) ||
        (meeting.location &&
          meeting.location
            .toLowerCase()
            .includes(meetingSearchQuery.toLowerCase())),
    );
  }, [alertMeetings, meetingSearchQuery]);

  const alertColumns = useMemo(
    () =>
      getAlertColumns({
        onView: handleViewAlert,
        onTitleClick: handleAlertTitleClick,
        onToggleActive: handleToggleActive,
      }),
    [handleViewAlert, handleAlertTitleClick, handleToggleActive],
  );

  const alertTable = useReactTable({
    data: alertData || [],
    columns: alertColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

      <DataTable table={alertTable} columns={alertColumns} />
      <div className="mt-4">
        <DataTablePagination table={alertTable} />
      </div>

      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new alert</DialogTitle>
            <DialogDescription>
              Describe what you want to be alerted for in a conversational
              manner.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alert-title">Alert Title (Optional)</Label>
              <Input
                id="alert-title"
                placeholder="e.g. EU Digital Regulations (or we'll generate one if left empty)"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alert-description">Description</Label>
              <Textarea
                id="alert-description"
                placeholder="e.g. Notify me about new EU digital regulations"
                value={alertDescription}
                onChange={(e) => setAlertDescription(e.target.value)}
                className="resize-y min-h-16"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await createNewAlert({
                  user_id: userId,
                  title: alertTitle,
                  description: alertDescription,
                });
                setAlertDialogOpen(false);
                setAlertDescription('');
                setAlertTitle('');
                queryClient.invalidateQueries({ queryKey: ['alerts', userId] });
              }}
            >
              🔔 Add alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewAlertDialogOpen} onOpenChange={setViewAlertDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alert Meetings</DialogTitle>
            <DialogDescription>
              Meetings related to this alert
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search meetings by title, description, or location..."
              value={meetingSearchQuery}
              onChange={(e) => setMeetingSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoadingMeetings ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : filteredMeetings?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {alertMeetings?.length === 0
                ? 'No meetings found for this alert.'
                : 'No meetings match your search.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMeetings?.map((meeting) => {
                const isExpanded = expandedDescriptions.has(meeting.meeting_id);
                const description = meeting.description || '';
                const shouldTruncate = description.length > 150;
                const displayDescription =
                  shouldTruncate && !isExpanded
                    ? description.substring(0, 150) + '...'
                    : description;

                return (
                  <div
                    key={meeting.meeting_id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{meeting.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {meeting.meeting_start_datetime
                          ? new Date(
                              meeting.meeting_start_datetime,
                            ).toLocaleDateString()
                          : 'No date'}
                      </span>
                    </div>
                    {description && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {displayDescription}
                        </p>
                        {shouldTruncate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              toggleDescriptionExpansion(meeting.meeting_id)
                            }
                            className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                          >
                            {isExpanded ? (
                              <>
                                Show less <ChevronUp className="ml-1 h-3 w-3" />
                              </>
                            ) : (
                              <>
                                Show more{' '}
                                <ChevronDown className="ml-1 h-3 w-3" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                    {meeting.location && (
                      <p className="text-sm text-muted-foreground">
                        📍 {meeting.location}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setViewAlertDialogOpen(false);
                setAlertMeetings([]);
                setMeetingSearchQuery('');
                setExpandedDescriptions(new Set());
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertDetailsDialogOpen}
        onOpenChange={setAlertDetailsDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAlert?.title || 'Alert Details'}</DialogTitle>
            <DialogDescription>
              Detailed information about this alert
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Title
                </Label>
                <p className="text-sm mt-1">
                  {selectedAlert?.title || 'No title'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Status
                </Label>
                <p className="text-sm mt-1">
                  {selectedAlert?.is_active ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Created
                </Label>
                <p className="text-sm mt-1">
                  {selectedAlert?.date
                    ? new Date(selectedAlert.date).toLocaleDateString()
                    : 'Unknown'}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Relevance Score
                </Label>
                <p className="text-sm mt-1">
                  {selectedAlert?.relevanceScore
                    ? `${Math.round(selectedAlert.relevanceScore * 100)}%`
                    : 'Not set'}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  setAlertDetailsDialogOpen(false);
                  if (selectedAlert) {
                    openViewAlertDialog(selectedAlert.id);
                  }
                }}
                className="w-full"
              >
                View Related Meetings
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setAlertDetailsDialogOpen(false);
                setSelectedAlert(null);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
