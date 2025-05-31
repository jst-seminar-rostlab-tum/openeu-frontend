'use client';

import { cva } from 'class-variance-authority';
import {isToday, startOfDay} from "date-fns";
import {motion} from "framer-motion";
import {useMemo} from "react";

import { DroppableArea } from "@/components/MonthViewCalendar/DroppableArea";
import { EventBullet } from "@/components/MonthViewCalendar/EventBullet";
import { MonthEventBadge } from "@/components/MonthViewCalendar/MonthEventBadge";
import { staggerContainer, transition } from '@/domain/animations'
import type { CalendarCell } from '@/domain/entities/calendar/CalendarCell';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TMeetingColor } from "@/domain/types/calendar/types";
import { cn } from '@/lib/utils';
import { getMonthCellEvents } from '@/operations/meeting/CalendarHelpers';

interface IProps {
  cell: CalendarCell;
  events: MeetingData[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export const dayCellVariants = cva("text-white", {
    variants: {
    color: {
        blue: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 ',
        green: 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400',
        red: 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-400',
        yellow: 'bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-400',
        purple: 'bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-400',
        orange: 'bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-400',
        gray: 'bg-gray-600 dark:bg-gray-500 hover:bg-gray-700 dark:hover:bg-gray-400',
      },
    },
    defaultVariants: {
      color: 'orange'
    },
  });

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(
    () => {
    const result = getMonthCellEvents(date, events);
      return Array.isArray(result) ? result : [];
    },

    [date, events, eventPositions],
    );

  const isSunday = date.getDay() === 0;
  return (
      <motion.div
      className={cn(
              "flex flex-col gap-1 border-l border-t py-1.5",
              isSunday && 'border-l-0'
      )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <DroppableArea date={date}>
              <motion.span
          className={cn(
                      "h-6 w-6 px-1 flex translate-x-1 items-center justify-center rounded-full text-xs font-semibold lg:px-2 mb-1", // mb-0.5 here, always applied
                      !currentMonth && 'text-muted-foreground',
                      isToday(date) && ' bg-primary text-primary-foreground'
          )}
          whileHover={{ scale: 1.1 }}
          transition={transition}
        >
          {day}
        </motion.span>

              <motion.div
          className={cn(
                      "flex h-6 gap-1 px-2 lg:min-h-[94px] lg:flex-col lg:gap-2 lg:px-0",
                      !currentMonth && 'opacity-50'
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
                              transition={{ delay: Number(event?.meeting_id) * 0.1, ...transition }}
              >
                {event && (
                  <>
                                      <EventBullet className="lg:hidden" color={event.color as TMeetingColor} />
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
                          "h-4.5 px-1.5 my-2 text-end text-xs font-semibold text-muted-foreground",
                          !currentMonth && 'opacity-50'
            )}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, ...transition }}
          ></motion.div>
        )}
      </DroppableArea>
    </motion.div>
  );
}