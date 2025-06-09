'use client';

import {
  addHours,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
} from 'date-fns';
import React, { createContext, useMemo, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import {
  GetMeetingsQueryParams,
  useMeetings,
} from '@/domain/hooks/meetingHooks';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';
import {
  calculateEndDate,
  calculateStartDate,
  getColorFromId,
  getCurrentMonthRange,
} from '@/operations/meeting/CalendarHelpers';

const { now } = getCurrentMonthRange();

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedColors: TMeetingColor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  meetings: MeetingData[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  use24HourFormat: boolean;
  badgeVariant: 'dot' | 'colored';
  filters: GetMeetingsQueryParams;
  setFilters: (filters: GetMeetingsQueryParams) => void;
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
  const [selectedColors] = useState<TMeetingColor[]>([]);

  // Generate filters based on current view and selected date
  const getFilters = (): GetMeetingsQueryParams => {
    const start = calculateStartDate(selectedDate, currentView).toISOString();
    const end = calculateEndDate(selectedDate, currentView).toISOString();

    return {
      start,
      end,
      query: searchQuery || undefined,
      country: selectedCountry || undefined,
    };
  };

  const [filters, setFilters] = useState<GetMeetingsQueryParams>(getFilters());

  // Use TanStack Query for data fetching with the new API
  const {
    data: rawMeetings = [],
    isLoading,
    isFetching,
    isError,
  } = useMeetings(filters);

  // Add colors to meetings using getColorFromId
  const meetings = useMemo(() => {
    return rawMeetings.map((meeting) => {
      // Ensure meeting has valid end time
      const processedMeeting = { ...meeting };
      if (
        !meeting.meeting_end_datetime ||
        meeting.meeting_start_datetime == meeting.meeting_end_datetime
      ) {
        const startTime = parseISO(meeting.meeting_start_datetime);
        const endTime = addHours(startTime, 1.5);
        processedMeeting.meeting_end_datetime = endTime.toISOString();
      }

      // Assign color
      processedMeeting.color = getColorFromId(
        meeting.meeting_id,
      ) as TMeetingColor;

      return processedMeeting;
    });
  }, [rawMeetings]);

  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
    // Update filters when view changes
    const newStart = calculateStartDate(selectedDate, newView).toISOString();
    const newEnd = calculateEndDate(selectedDate, newView).toISOString();
    setFilters((prev) => ({ ...prev, start: newStart, end: newEnd }));
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    // Update filters when date changes
    const start = calculateStartDate(date, currentView).toISOString();
    const end = calculateEndDate(date, currentView).toISOString();
    setFilters((prev) => ({ ...prev, start, end }));
  };

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, query: query || undefined }));
  };

  const handleSetSelectedCountry = (country: string) => {
    setSelectedCountry(country);
    setFilters((prev) => ({ ...prev, country: country || undefined }));
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

  const value: ICalendarContext = {
    selectedDate,
    view: currentView,
    setView,
    setSelectedDate: handleSelectDate,
    selectedColors,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    selectedCountry,
    setSelectedCountry: handleSetSelectedCountry,
    meetings,
    isLoading,
    isFetching,
    isError,
    use24HourFormat: true,
    badgeVariant: 'colored' as const,
    filters,
    setFilters,
    getEventsCount,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
