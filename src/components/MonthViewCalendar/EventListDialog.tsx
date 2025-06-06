import { format } from 'date-fns';
import React, { ReactNode } from 'react';

import { TagBadge } from '@/components/calendar/TagBadge';
import { dayCellVariants } from '@/components/MonthViewCalendar/DayCell';
import { EventBullet } from '@/components/MonthViewCalendar/EventBullet';
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
}
export function EventListDialog({
  date,
  events,
  MAX_VISIBLE_EVENTS = 3,
  children,
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
                Events on {format(date, 'EEEE, MMMM d, yyyy')}
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
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium flex-1">{event.title}</p>
                  <TagBadge
                    tag={getMeetingTypeShort(event.source_table)}
                    variant="outline"
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
