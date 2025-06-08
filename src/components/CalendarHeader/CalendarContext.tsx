'use client';

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import React, { createContext, useState } from 'react';

import { getCurrentMonthRange } from '@/app/dateRange';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useMeetings } from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';

const { now } = getCurrentMonthRange();

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  meetings: MeetingData[];
  isLoading: boolean;
  isError: boolean;
  use24HourFormat: boolean;
  badgeVariant: 'dot' | 'colored';
  getEventsCount: (
    events?: MeetingData[],
    selectedDate?: Date,
    view?: TCalendarView,
  ) => number;
}

export const CalendarContext = createContext<ICalendarContext | undefined>(
  undefined,
);

interface CalendarProviderProps {
  children: React.ReactNode;
  view?: TCalendarView;
}

export function CalendarProvider({
  children,
  view = 'month',
}: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(now);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  // Generate start and end dates based on current view and selected date
  const getDateRange = () => {
    switch (currentView) {
      case 'day':
        return {
          startDate: format(selectedDate, 'yyyy-MM-dd'),
          endDate: format(selectedDate, 'yyyy-MM-dd'),
        };
      case 'week':
        return {
          startDate: format(startOfWeek(selectedDate), 'yyyy-MM-dd'),
          endDate: format(endOfWeek(selectedDate), 'yyyy-MM-dd'),
        };
      case 'month':
        return {
          startDate: format(startOfMonth(selectedDate), 'yyyy-MM-dd'),
          endDate: format(endOfMonth(selectedDate), 'yyyy-MM-dd'),
        };
      case 'year':
        return {
          startDate: format(startOfYear(selectedDate), 'yyyy-MM-dd'),
          endDate: format(endOfYear(selectedDate), 'yyyy-MM-dd'),
        };
      case 'agenda':
        return {
          startDate: format(startOfMonth(selectedDate), 'yyyy-MM-dd'),
          endDate: format(endOfMonth(selectedDate), 'yyyy-MM-dd'),
        };
      default:
        return {
          startDate: format(startOfMonth(selectedDate), 'yyyy-MM-dd'),
          endDate: format(endOfMonth(selectedDate), 'yyyy-MM-dd'),
        };
    }
  };

  const { startDate, endDate } = getDateRange();

  // Use TanStack Query for data fetching
  const {
    data: meetings = [],
    isLoading,
    isError,
  } = useMeetings(
    startDate,
    endDate,
    searchQuery || undefined,
    selectedCountry || undefined,
  );

  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  function getEventsCount(
    eventsParam: MeetingData[] = meetings,
    selectedDateParam: Date = selectedDate,
    viewParam: TCalendarView = currentView,
  ): number {
    const compareFns: Record<TCalendarView, (d1: Date, d2: Date) => boolean> = {
      day: isSameDay,
      week: isSameWeek,
      month: isSameMonth,
      year: isSameYear,
      agenda: isSameMonth,
    };

    const compareFn = compareFns[viewParam];
    return eventsParam.filter((event) =>
      compareFn(parseISO(event.meeting_start_datetime), selectedDateParam),
    ).length;
  }

  const value = {
    selectedDate,
    view: currentView,
    setView,
    setSelectedDate: handleSelectDate,
    searchQuery,
    setSearchQuery,
    selectedCountry,
    setSelectedCountry,
    meetings,
    isLoading,
    isError,
    use24HourFormat: true,
    badgeVariant: 'colored' as const,
    getEventsCount,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
