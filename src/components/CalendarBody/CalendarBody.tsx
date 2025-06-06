'use client';

import { isSameDay, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import React from 'react';

import { CalendarMonthView } from '@/components/MonthViewCalendar/MonthViewCalendar';
import { fadeIn, transition } from '@/domain/animations';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import { useFilteredEvents } from '@/operations/meeting/CalendarHelpers';

export function CalendarBody() {
  const { view } = useCalendar();

  const singleDayEvents = useFilteredEvents().filter((event: MeetingData) => {
    const startDate = parseISO(event.meeting_start_datetime);
    const endDate = parseISO(event.meeting_end_datetime);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = useFilteredEvents().filter((event: MeetingData) => {
    const startDate = parseISO(event.meeting_start_datetime);
    const endDate = parseISO(event.meeting_end_datetime);
    return !isSameDay(startDate, endDate);
  });

  return (
    <div className=" w-full overflow-scroll relative]">
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
