import { format } from 'date-fns';
import { Building, MapPin } from 'lucide-react';
import React, { ReactNode } from 'react';

import { dayCellVariants } from '@/components/calendar/MonthViewCalendar/DayCell';
import { EventBullet } from '@/components/calendar/MonthViewCalendar/EventBullet';
import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { RelevanceScore } from '@/components/RelevanceScore/RelevanceScore';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { Meeting } from '@/domain/entities/calendar/generated-types';
import { TMeetingColor } from '@/domain/types/calendar/types';
import { cn } from '@/lib/utils';
import { getMeetingTypeShort } from '@/operations/meeting/CalendarHelpers';

interface EventListDialogProps {
  date: Date;
  events: Meeting[];
  MAX_VISIBLE_EVENTS?: number;
  children?: ReactNode;
  endDate?: Date;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EventListDialog({
  date,
  events,
  MAX_VISIBLE_EVENTS = 3,
  children,
  endDate,
  title,
  open,
  onOpenChange,
}: EventListDialogProps) {
  const cellEvents = events;
  const hiddenEventsCount = Math.max(cellEvents.length - MAX_VISIBLE_EVENTS, 0);

  const defaultTrigger = (
    <span className="cursor-pointer">
      <span className="sm:hidden">+{hiddenEventsCount}</span>
      <span className="hidden sm:inline py-0.5 px-2 my-1 rounded-xl border">
        {hiddenEventsCount}
        <span className="mx-1">more...</span>
      </span>
    </span>
  );

  function eventListEntry(event: Meeting, index: number) {
    const relevanceScore = event.similarity
      ? Math.round(event.similarity * 100)
      : null;
    return (
      <EventDetailsDialog key={`${event.meeting_id}-${index}`} event={event}>
        <div
          className={cn(
            'flex items-center gap-2 p-2 border rounded-md hover:bg-muted',
            {
              [dayCellVariants({
                color: event.color as TMeetingColor,
              })]: true,
            },
          )}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex justify-between gap-1">
              <p className="flex flex-col text-sm font-medium">{event.title}</p>
              {relevanceScore && (
                <div className="flex flex-none size-10">
                  <RelevanceScore meeting={event} type={'circle'} />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-white">
                <Building className="shrink-0" />
                {getMeetingTypeShort(event.source_table)}
              </Badge>
              <Badge variant="outline" className="text-white max-w-40">
                <MapPin className="shrink-0 w-3 h-3" />
                <span
                  className="truncate min-w-0 direction-rtl text-left"
                  title={getMeetingTypeShort(
                    event.location ? event.location : 'No location specified',
                  )}
                >
                  {event.location && getMeetingTypeShort(event.location)}
                </span>
              </Badge>
            </div>
          </div>
        </div>
      </EventDetailsDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <EventBullet
                color={cellEvents[0]?.color as TMeetingColor}
                className=""
              />
              <p className="text-sm font-medium">
                {title ||
                  (endDate
                    ? `Events during ${format(date, 'HH:mm')} - ${format(endDate, 'HH:mm')}`
                    : `Events on ${format(date, 'EEEE, MMMM d, yyyy')}`)}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {cellEvents.map((event, index) => eventListEntry(event, index))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
