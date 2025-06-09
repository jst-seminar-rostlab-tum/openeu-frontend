'use client';

import {
  addHours,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
} from 'date-fns';
import React, { createContext, useEffect, useMemo, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import {
  GetMeetingsQueryParams,
  useMeetings,
} from '@/domain/hooks/meetingHooks';
import { useUrlSync } from '@/domain/hooks/useCalendarUrlSync';
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
  updateUrl?: boolean;
}

export function CalendarProvider({
  children,
  view = 'month',
  updateUrl = true,
}: CalendarProviderProps) {
  const { urlState, syncFiltersToUrl } = useUrlSync();

  // Initialize state from URL (single source of truth pattern)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    return urlState.startDate || now;
  });

  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const [searchQuery, setSearchQuery] = useState<string>(urlState.searchQuery);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    urlState.selectedCountry,
  );
  const [selectedColors] = useState<TMeetingColor[]>([]);

  // Track if we're using a custom date range (from FilterModal)
  const [isCustomRange, setIsCustomRange] = useState<boolean>(
    Boolean(urlState.startDate && urlState.endDate),
  );
  const [customStart, setCustomStart] = useState<string | null>(
    urlState.startDate?.toISOString() || null,
  );
  const [customEnd, setCustomEnd] = useState<string | null>(
    urlState.endDate?.toISOString() || null,
  );

  // Memoized filter calculation following Medium article pattern
  const filters = useMemo((): GetMeetingsQueryParams => {
    let start: string;
    let end: string;

    if (isCustomRange && customStart && customEnd) {
      // Use custom date range from FilterModal
      start = customStart;
      end = customEnd;
    } else {
      // Use calculated range from selectedDate + view for normal navigation
      start = calculateStartDate(selectedDate, currentView).toISOString();
      end = calculateEndDate(selectedDate, currentView).toISOString();
    }

    return {
      start,
      end,
      query: searchQuery || undefined,
      country: selectedCountry || undefined,
    };
  }, [
    selectedDate,
    currentView,
    searchQuery,
    selectedCountry,
    isCustomRange,
    customStart,
    customEnd,
  ]);

  // Single effect: internal state changes → URL params update
  useEffect(() => {
    if (updateUrl) {
      syncFiltersToUrl(filters);
    }
  }, [filters, syncFiltersToUrl]);

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

  // Clean handler functions following Medium article pattern
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
    // Clear custom date range when changing views
    setIsCustomRange(false);
    setCustomStart(null);
    setCustomEnd(null);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    // Clear custom date range when navigating dates
    setIsCustomRange(false);
    setCustomStart(null);
    setCustomEnd(null);
  };

  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleSetSelectedCountry = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSetFilters = (newFilters: GetMeetingsQueryParams) => {
    // Update basic state
    if (newFilters.query !== undefined) {
      setSearchQuery(newFilters.query || '');
    }
    if (newFilters.country !== undefined) {
      setSelectedCountry(newFilters.country || '');
    }
    if (newFilters.start) {
      setSelectedDate(new Date(newFilters.start));
    }

    // Handle custom date ranges from FilterModal
    if (newFilters.start && newFilters.end) {
      setIsCustomRange(true);
      setCustomStart(newFilters.start);
      setCustomEnd(newFilters.end);
    }
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
    setFilters: handleSetFilters,
    getEventsCount,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
