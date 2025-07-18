import { differenceInMinutes, parseISO } from 'date-fns';
import { Building, MapPin } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { RelevanceScore } from '@/components/RelevanceScore';
import { Badge } from '@/components/ui/badge';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { cn, COLOR_SCHEMES } from '@/lib/utils';
import {
  formatTime,
  getMeetingTypeShort,
} from '@/operations/meeting/CalendarHelpers';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  event: Meeting;
}

export function EventBlock({ event, className }: IProps) {
  const { badgeVariant, use24HourFormat } = useMeetingContext();

  const start = parseISO(event.meeting_start_datetime);
  const end = parseISO(event.meeting_end_datetime);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * 96 - 8;

  const calendarWeekEventCardClasses = cn(
    'flex select-none flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs focus-visible:outline-offset-2 cursor-pointer',
    COLOR_SCHEMES[event.color].bg,
    COLOR_SCHEMES[event.color].text,
    COLOR_SCHEMES[event.color].outline,
    durationInMinutes < 35 && 'py-0 justify-center',
    className,
  );

  return (
    <EventDetailsDialog event={event}>
      <div
        role="button"
        tabIndex={0}
        className={calendarWeekEventCardClasses}
        style={{ height: `${heightInPixels}px` }}
      >
        <div className="flex justify-between gap-1">
          <div id="title" className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 truncate">
              {badgeVariant === 'dot' && (
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="shrink-0"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              )}
              <p className="truncate font-semibold">{event.title}</p>
            </div>

            {durationInMinutes > 25 && (
              <p className="truncate">
                {formatTime(start, use24HourFormat)} -{' '}
                {formatTime(end, use24HourFormat)}
              </p>
            )}
          </div>
          {event.similarity && (
            <RelevanceScore meeting={event} type={'circle'} />
          )}
        </div>
        <Badge variant="outline" className="dark:text-white">
          <Building className="shrink-0" />

          {getMeetingTypeShort(event.source_table)}
        </Badge>
        <Badge variant="outline" className="dark:text-white max-w-40">
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
    </EventDetailsDialog>
  );
}
