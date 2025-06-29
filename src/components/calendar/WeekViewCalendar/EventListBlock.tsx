import { differenceInMinutes, parseISO } from 'date-fns';
import type { HTMLAttributes } from 'react';

import { EventListDialog } from '@/components/calendar/MonthViewCalendar/EventListDialog';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { cn } from '@/lib/utils';
import { getColor } from '@/lib/utils';
import { formatTime } from '@/operations/meeting/CalendarHelpers';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  events: Meeting[];
}

export function EventListBlock({ events, className }: IProps) {
  const { badgeVariant, use24HourFormat } = useMeetingContext();

  const start = parseISO(events[0].meeting_start_datetime);
  const end = parseISO(events[0].meeting_end_datetime);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * 96 - 8;

  const colorClasses = getColor(
    events[0].meeting_id,
    badgeVariant === 'dot' ? 'dot' : 'bg',
  );

  const calendarWeekEventCardClasses = cn(
    'flex select-none flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs focus-visible:outline-offset-2 cursor-pointer',
    colorClasses,
    durationInMinutes < 35 && 'py-0 justify-center',
    className,
  );

  return (
    <EventListDialog date={start} endDate={end} events={events}>
      <div
        role="button"
        tabIndex={0}
        className={calendarWeekEventCardClasses}
        style={{ height: `${heightInPixels}px` }}
      >
        <div className="flex items-center gap-1.5 truncate">
          {badgeVariant === 'dot' && (
            <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0">
              <circle cx="4" cy="4" r="4" />
            </svg>
          )}

          <p className="truncate font-semibold">{events.length} Events</p>
        </div>

        {durationInMinutes > 25 && (
          <p>
            {formatTime(start, use24HourFormat)} -{' '}
            {formatTime(end, use24HourFormat)}
          </p>
        )}
      </div>
    </EventListDialog>
  );
}
