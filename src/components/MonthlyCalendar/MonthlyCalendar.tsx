'use client';

import React from 'react';

import { CalendarBody } from '@/components/CalendarBody/CalendarBody';
import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';
import { CalendarHeader } from '@/components/CalendarHeader/CalendarHeader';
import { CalendarSkeleton } from '@/components/CalendarSkeleton/CalendarSkeleton';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';

interface CalendarClientProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  events: MeetingData[];
  filters: GetMeetingsQueryParams;
  setFilters: (newFilters: GetMeetingsQueryParams) => void;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function Calendar({
  isLoading,
  isError,
  error,
  events,
  filters,
  setFilters,
  view,
  setView,
  selectedDate,
  setSelectedDate,
}: CalendarClientProps) {
  return (
    <div className="p-4">
      <CalendarProvider
        events={events}
        filters={filters}
        setFilters={setFilters}
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      >
        {isLoading && (
          <div className="w-full border rounded-xl ">
            <CalendarSkeleton view={view} />)
          </div>
        )}
        {isError && <p>Error: {error?.message}</p>}
        {!isLoading && !isError && (
          <div className="w-full border rounded-xl ">
            <CalendarHeader />
            <CalendarBody />
          </div>
        )}
      </CalendarProvider>
    </div>
  );
}
