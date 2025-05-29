'use client';

import { isSameDay, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import React from 'react';

import { fadeIn, transition } from '@/domain/animations';
import { useFilteredEvents } from '@/operations/meeting/calendarHelpers';

import { useCalendar } from '../CalendarHeader/calendarContext';
import { CalendarMonthView } from '../MonthViewCalendar/MonthViewCalendar';

export function CalendarBody() {
  const { view } = useCalendar();

  const singleDayEvents = useFilteredEvents().filter((event) => {
    const startDate = parseISO(event.meeting_start_datetime);
    const endDate = parseISO(event.meeting_end_datetime);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = useFilteredEvents().filter((event) => {
    const startDate = parseISO(event.meeting_start_datetime);
    const endDate = parseISO(event.meeting_end_datetime);
    return !isSameDay(startDate, endDate);
  });

  return (
    <div className="h-[80vh] w-full overflow-scroll relative]">
      <motion.div
        key={view}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        transition={transition}
      >
        {view === 'month' && (
          <CalendarMonthView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
      </motion.div>
    </div>
  );
}
