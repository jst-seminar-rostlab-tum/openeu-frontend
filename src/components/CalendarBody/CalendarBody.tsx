'use client';

import { isSameDay, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import React from 'react';

import { CalendarDayView } from '@/components/DayViewCalendar/DayViewCalendar';
import { CalendarMonthView } from '@/components/MonthViewCalendar/MonthViewCalendar';
import { CalendarWeekView } from '@/components/WeekViewCalendar/WeekViewCalendar';
import { fadeIn, transition } from '@/domain/animations';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';
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

  const calendarView = (view: TCalendarView) => {
    switch (view) {
      case 'month':
        return (
          <CalendarMonthView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        );
      case 'day':
        return (
          <CalendarDayView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        );
      case 'week':
        return (
          <CalendarWeekView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        );
    }
  };

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
        {calendarView(view)}
      </motion.div>
    </div>
  );
}
