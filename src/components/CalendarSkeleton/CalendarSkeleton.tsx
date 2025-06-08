import React from 'react';

import { DayViewSkeleton } from '@/components/CalendarSkeleton/DayViewSkeleton';
import { MonthViewSkeleton } from '@/components/CalendarSkeleton/MonthViewSkeleton';
import { WeekViewSkeleton } from '@/components/CalendarSkeleton/WeekViewSkeleton';
import { TCalendarView } from '@/domain/types/calendar/types';

interface CalendarSkeletonProps {
  view: TCalendarView;
}

export function CalendarSkeleton({ view }: CalendarSkeletonProps) {
  const calendarView = (view: TCalendarView) => {
    switch (view) {
      case 'month':
        return <MonthViewSkeleton />;
      case 'day':
        return <DayViewSkeleton />;
      case 'week':
        return <WeekViewSkeleton />;
    }
  };

  return calendarView(view);
}
