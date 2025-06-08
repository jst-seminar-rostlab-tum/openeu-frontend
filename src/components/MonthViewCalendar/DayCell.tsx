'use client';

import { cva } from 'class-variance-authority';
import { isToday, startOfDay } from 'date-fns';
import { useMemo } from 'react';

import { EventBullet } from '@/components/MonthViewCalendar/EventBullet';
import { EventListDialog } from '@/components/MonthViewCalendar/EventListDialog';
import { MonthEventBadge } from '@/components/MonthViewCalendar/MonthEventBadge';
import type { CalendarCell } from '@/domain/entities/calendar/CalendarCell';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { cn } from '@/lib/utils';
import { getMonthCellEvents } from '@/operations/meeting/CalendarHelpers';

interface IProps {
  cell: CalendarCell;
  events: MeetingData[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export const dayCellVariants = cva('text-white', {
  variants: {
    color: {
      blue: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 ',
      green:
        'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400',
      red: 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400',
      yellow:
        'bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-400',
      purple:
        'bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400',
      orange:
        'bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400',
      gray: 'bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400',
    },
  },
  defaultVariants: {
    color: 'orange',
  },
});

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;
  const cellEvents = useMemo(() => {
    const result = getMonthCellEvents(date, events, eventPositions);
    return Array.isArray(result) ? result : [];
  }, [date, events, eventPositions]) as (MeetingData & {
    position: number;
    isMultiDay: boolean;
  })[];

  const isSunday = date.getDay() === 0;
  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-l border-t py-1.5',
        isSunday && 'border-l-0',
      )}
    >
      <span
        className={cn(
          'h-6 w-6 px-1 flex translate-x-1 items-center justify-center rounded-full text-xs font-semibold lg:px-2 mb-1',
          !currentMonth && 'text-muted-foreground',
          isToday(date) && ' bg-primary text-primary-foreground',
        )}
      >
        {day}
      </span>
      <div
        className={cn(
          'flex h-6 gap-1 px-2 lg:min-h-[94px] lg:flex-col lg:gap-2 lg:px-0',
          !currentMonth && 'opacity-50',
        )}
      >
        {[0, 1, 2].map((position) => {
          const event = cellEvents.find((e) => e.position === position);
          const eventKey = event
            ? `event-${event.meeting_id}-${position}`
            : `empty-${position}`;
          return (
            <div key={eventKey} className="lg:flex-1 cursor-pointer">
              {event && (
                <>
                  <EventBullet className="lg:hidden" color="blue" />
                  <MonthEventBadge
                    className="hidden lg:flex"
                    event={event}
                    cellDate={startOfDay(date)}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {cellEvents.length > MAX_VISIBLE_EVENTS && (
        <div
          className={cn(
            'h-4.5 px-1.5 my-2 text-end text-xs font-semibold text-muted-foreground',
            !currentMonth && 'opacity-50',
          )}
        >
          <EventListDialog date={date} events={cellEvents} />
        </div>
      )}
    </div>
  );
}
