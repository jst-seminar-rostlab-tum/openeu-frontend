import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { differenceInMinutes, parseISO } from 'date-fns';
import type { HTMLAttributes } from 'react';

import { EventListDialog } from '@/components/MonthViewCalendar/EventListDialog';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import { cn } from '@/lib/utils';
import { formatTime } from '@/operations/meeting/CalendarHelpers';

const calendarWeekEventCardVariants = cva(
  'flex select-none flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs focus-visible:outline-offset-2',
  {
    variants: {
      color: {
        // Colored variants
        blue: 'border-blue-200 bg-blue-100/50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-950',
        green:
          'border-green-200 bg-green-100/50 text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300 dark:hover:bg-green-950',
        red: 'border-red-200 bg-red-100/50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950',
        yellow:
          'border-yellow-200 bg-yellow-100/50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-950/50 dark:text-yellow-300 dark:hover:bg-yellow-950',
        purple:
          'border-purple-200 bg-purple-100/50 text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300 dark:hover:bg-purple-950',
        orange:
          'border-orange-200 bg-orange-100/50 text-orange-700 hover:bg-orange-100 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-950',

        // Dot variants
        'blue-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-blue-600 dark:[&_svg]:fill-blue-500',
        'green-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-green-600 dark:[&_svg]:fill-green-500',
        'red-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-red-600 dark:[&_svg]:fill-red-500',
        'orange-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-orange-600 dark:[&_svg]:fill-orange-500',
        'purple-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-purple-600 dark:[&_svg]:fill-purple-500',
        'yellow-dot':
          'border-border bg-card text-foreground hover:bg-accent [&_svg]:fill-yellow-600 dark:[&_svg]:fill-yellow-500',
      },
    },
    defaultVariants: {
      color: 'blue-dot',
    },
  },
);

interface IProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof calendarWeekEventCardVariants>, 'color'> {
  events: MeetingData[];
}

export function EventListBlock({ events, className }: IProps) {
  const { badgeVariant, use24HourFormat } = useCalendar();

  const start = parseISO(events[0].meeting_start_datetime);
  const end = parseISO(events[0].meeting_end_datetime);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * 96 - 8;

  const color = (
    badgeVariant === 'dot' ? `${events[0].color}-dot` : events[0].color
  ) as VariantProps<typeof calendarWeekEventCardVariants>['color'];

  const calendarWeekEventCardClasses = cn(
    calendarWeekEventCardVariants({ color, className }),
    durationInMinutes < 35 && 'py-0 justify-center',
  );

  return (
    <EventListDialog date={start} events={events}>
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
