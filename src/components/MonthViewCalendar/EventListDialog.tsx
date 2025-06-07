import { format } from 'date-fns';
import { Building, MapPin } from 'lucide-react';
import React, { ReactNode } from 'react';

import { dayCellVariants } from '@/components/MonthViewCalendar/DayCell';
import { EventBullet } from '@/components/MonthViewCalendar/EventBullet';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TMeetingColor } from '@/domain/types/calendar/types';
import { cn } from '@/lib/utils';
import { getMeetingTypeShort } from '@/operations/meeting/CalendarHelpers';

interface EventListDialogProps {
  date: Date;
  events: MeetingData[];
  MAX_VISIBLE_EVENTS?: number;
  children?: ReactNode;
  endDate?: Date;
}

export function EventListDialog({
  date,
  events,
  MAX_VISIBLE_EVENTS = 3,
  children,
  endDate,
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

  return (
    <Dialog>
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
                {endDate
                  ? `Events during ${format(date, 'HH:mm')} - ${format(endDate, 'HH:mm')}`
                  : `Events on ${format(date, 'EEEE, MMMM d, yyyy')}`}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto space-y-2">
          {cellEvents.map((event) => (
            <div
              key={event.meeting_id}
              className={cn(
                'flex items-center gap-2 p-2 border rounded-md hover:bg-muted',
                {
                  [dayCellVariants({ color: event.color as TMeetingColor })]:
                    true,
                },
              )}
            >
              <EventBullet color={event.color as TMeetingColor} className="" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{event.title}</p>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-white">
                    <Building className="shrink-0" />

                    {getMeetingTypeShort(event.source_table)}
                  </Badge>
                  <Badge variant="outline" className="text-white max-w-40">
                    <MapPin className="shrink-0 w-3 h-3" />
                    <span
                      className="truncate min-w-0 direction-rtl text-left"
                      title={getMeetingTypeShort(event.location)}
                    >
                      {getMeetingTypeShort(event.location)}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
