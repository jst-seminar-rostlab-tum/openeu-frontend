import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns';

import { EventDetailsDialog } from '@/components/calendar/MonthViewCalendar/EventDetailsDialog';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { cn, COLOR_SCHEMES } from '@/lib/utils';
import { formatTime } from '@/operations/meeting/CalendarHelpers';

export const eventBadgeVariants = cva(
  'mx-1 flex size-auto h-6.5 sselect-none items-center gap-1.5  whitespace-nowrap truncate justify-between rounded-md border px-2 text-xs cursor-pointer',
  {
    variants: {
      multiDayPosition: {
        first:
          'relative z-10 mr-0 w-[calc(100%_+_1px)] rounded-r-none border-r-0 [&>span]:mr-2.5',
        middle:
          'relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0',
        last: 'ml-0 rounded-l-none border-l-0',
        none: '',
      },
    },
    defaultVariants: {},
  },
);

interface IProps
  extends Omit<VariantProps<typeof eventBadgeVariants>, 'multiDayPosition'> {
  event: Meeting;
  cellDate: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: 'first' | 'middle' | 'last' | 'none';
}

export function MonthEventBadge({
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: IProps) {
  const itemStart = startOfDay(parseISO(event.meeting_start_datetime));

  const itemEnd = endOfDay(parseISO(event.meeting_end_datetime));

  if (cellDate < itemStart || cellDate > itemEnd) return null;

  let position: 'first' | 'middle' | 'last' | 'none' | undefined;

  if (propPosition) {
    position = propPosition;
  } else if (eventCurrentDay && eventTotalDays) {
    position = 'none';
  } else if (isSameDay(itemStart, itemEnd)) {
    position = 'none';
  } else if (isSameDay(cellDate, itemStart)) {
    position = 'first';
  } else if (isSameDay(cellDate, itemEnd)) {
    position = 'last';
  } else {
    position = 'middle';
  }

  const renderBadgeText = ['first', 'none'].includes(position);

  const formattedTime = formatTime(
    new Date(event.meeting_start_datetime),
    true,
  );

  const eventBadgeClasses = cn(
    eventBadgeVariants({ multiDayPosition: position, className }),
    COLOR_SCHEMES[event.color].bg,
    COLOR_SCHEMES[event.color].text,
    COLOR_SCHEMES[event.color].outline,
  );

  return (
    <EventDetailsDialog event={event}>
      <div role="button" tabIndex={0} className={eventBadgeClasses}>
        <div className="flex items-center  truncate flex-1">
          {!['middle', 'last'].includes(position) && (
            <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0">
              <circle cx="4" cy="4" r="4" />
            </svg>
          )}

          {renderBadgeText && (
            <p className="truncate font-semibold text-ellipsis flex-1">
              {event.title}
            </p>
          )}
        </div>

        {renderBadgeText && <span>{formattedTime}</span>}
      </div>
    </EventDetailsDialog>
  );
}
