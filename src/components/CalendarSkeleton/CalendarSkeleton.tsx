import React from 'react';

import { CalendarHeaderSkeleton } from '@/components/CalendarSkeleton/CalendarHeaderSkeleton';
import { DayViewSkeleton } from '@/components/CalendarSkeleton/DayViewSkeleton';
import { MonthViewSkeleton } from '@/components/CalendarSkeleton/MonthViewSkeleton';
import { WeekViewSkeleton } from '@/components/CalendarSkeleton/WeekViewSkeleton';
import { TCalendarView } from '@/domain/types/calendar/types';

interface CalendarSkeletonProps {
  view?: TCalendarView;
  showHeader?: boolean;
}

export function CalendarSkeleton({
  view = 'month',
  showHeader = true,
}: CalendarSkeletonProps) {
  const calendarView = (view: TCalendarView) => {
    switch (view) {
      case 'month':
        return <MonthViewSkeleton />;
      case 'day':
        return <DayViewSkeleton />;
      case 'week':
        return <WeekViewSkeleton />;
      default:
        return <MonthViewSkeleton />;
    }
  };

  if (showHeader) {
    return (
      <div className="container mx-auto">
        <div className="flex h-screen flex-col">
          <CalendarHeaderSkeleton />
          <div className="flex-1">{calendarView(view)}</div>
        </div>
      </div>
    );
  }

  return calendarView(view);
}
