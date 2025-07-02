'use client';

import { isToday, startOfDay } from 'date-fns';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { DroppableArea } from '@/components/calendar/MonthViewCalendar/DroppableArea';
import { EventBullet } from '@/components/calendar/MonthViewCalendar/EventBullet';
import { EventListDialog } from '@/components/calendar/MonthViewCalendar/EventListDialog';
import { MonthEventBadge } from '@/components/calendar/MonthViewCalendar/MonthEventBadge';
import { staggerContainer, transition } from '@/domain/animations';
import {
  CalendarCell,
  Meeting,
} from '@/domain/entities/calendar/CalendarTypes';
import { cn } from '@/lib/utils';
import { getMonthCellEvents } from '@/operations/meeting/CalendarHelpers';

interface IProps {
  cell: CalendarCell;
  events: Meeting[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(() => {
    const result = getMonthCellEvents(date, events, eventPositions);
    return Array.isArray(result) ? result : [];
  }, [date, events, eventPositions]);

  const isSunday = date.getDay() === 0;
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-1 border-l border-t py-1.5',
        isSunday && 'border-l-0',
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <DroppableArea date={date}>
        <motion.span
          className={cn(
            'h-6 w-6 px-1 flex translate-x-1 items-center justify-center rounded-full text-xs font-semibold lg:px-2 mb-1',
            !currentMonth && 'text-muted-foreground',
            isToday(date) && ' bg-primary text-primary-foreground',
          )}
          whileHover={{ scale: 1.1 }}
          transition={transition}
        >
          {day}
        </motion.span>

        <motion.div
          className={cn(
            'flex h-6 gap-1 px-2 lg:min-h-[94px] lg:flex-col lg:gap-2 lg:px-0',
            !currentMonth && 'opacity-50',
          )}
          variants={staggerContainer}
        >
          {[0, 1, 2].map((position) => {
            const event = cellEvents[position];
            const eventKey = event
              ? `event-${event.meeting_id}-${position}`
              : `empty-${position}`;

            return (
              <motion.div
                key={eventKey}
                className="lg:flex-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: Number(event?.meeting_id) * 0.1,
                  ...transition,
                }}
              >
                {event && (
                  <>
                    <EventBullet className="lg:hidden" color={event.color} />
                    <MonthEventBadge
                      className="hidden lg:flex"
                      event={event}
                      cellDate={startOfDay(date)}
                    />
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {cellEvents.length > MAX_VISIBLE_EVENTS && (
          <motion.div
            className={cn(
              'h-4.5 px-1.5 my-2 text-end text-xs font-semibold text-muted-foreground',
              !currentMonth && 'opacity-50',
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...transition }}
          >
            <EventListDialog date={date} events={cellEvents} />
          </motion.div>
        )}
      </DroppableArea>
    </motion.div>
  );
}
