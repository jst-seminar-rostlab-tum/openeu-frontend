'use client';

import { isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

import { CalendarSkeleton } from '@/components/calendar/CalendarSkeleton/CalendarSkeleton';
import { CalendarDayView } from '@/components/calendar/DayViewCalendar/DayViewCalendar';
import { CalendarMonthView } from '@/components/calendar/MonthViewCalendar/MonthViewCalendar';
import { CalendarWeekView } from '@/components/calendar/WeekViewCalendar/WeekViewCalendar';
import { fadeIn, transition } from '@/domain/animations';
import { Meeting } from '@/domain/entities/calendar/generated-types';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';
import { ToastOperations } from '@/operations/toast/toastOperations';

export function CalendarBody() {
  const { view, isLoading, isError, meetings } = useMeetingContext();

  useEffect(() => {
    if (isError) {
      ToastOperations.showError({
        title: 'Failed to Load Meetings',
        message:
          'Unable to fetch meeting data. Please check your connection and try again.',
      });
    }
  }, [isError]);

  if (isLoading) {
    return <CalendarSkeleton view={view} />;
  }

  const safeEvents = isError ? [] : meetings;

  const singleDayEvents = safeEvents.filter((event: Meeting) => {
    const startDate = event.meeting_start_datetime;
    const endDate = event.meeting_end_datetime!;
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = safeEvents.filter((event: Meeting) => {
    const startDate = event.meeting_start_datetime;
    const endDate = event.meeting_end_datetime!;
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
    <div className="w-full overflow-scroll relative">
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
