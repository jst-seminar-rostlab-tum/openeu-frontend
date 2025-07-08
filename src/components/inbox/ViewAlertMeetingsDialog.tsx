'use client';

import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AlertTableItem } from '@/app/inbox/alertTypes';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { getMeetingsForAlert } from '@/repositories/alertRepository';

interface ViewAlertMeetingsDialogProps {
  alert: AlertTableItem | null;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ViewAlertMeetingsDialog({
  alert,
  trigger,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ViewAlertMeetingsDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled =
    controlledOpen !== undefined && controlledOnOpenChange !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const onOpenChange = isControlled
    ? controlledOnOpenChange!
    : setUncontrolledOpen;
  const [alertMeetings, setAlertMeetings] = useState<Meeting[]>([]);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);
  const [meetingSearchQuery, setMeetingSearchQuery] = useState('');
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set(),
  );

  const loadMeetings = useCallback(async () => {
    if (!alert?.id) return;
    setIsLoadingMeetings(true);
    try {
      const meetings = await getMeetingsForAlert(alert.id);
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
  }, [alert]);

  useEffect(() => {
    if (open && alert?.id) {
      loadMeetings();
    }
  }, [open, alert, loadMeetings]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onOpenChange(newOpen);
      if (newOpen && alert?.id) {
        loadMeetings();
      } else {
        setAlertMeetings([]);
        setMeetingSearchQuery('');
        setExpandedDescriptions(new Set());
      }
    },
    [onOpenChange, loadMeetings, alert],
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && (
        <div onClick={() => onOpenChange(true)} style={{ display: 'inline' }}>
          {trigger}
        </div>
      )}
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alert Meetings</DialogTitle>
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
              ? `No meetings found for this alert.`
              : 'No meetings match your search.'}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredMeetings?.length || 0} meetings
            </div>
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
                              Show more <ChevronDown className="ml-1 h-3 w-3" />
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
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
