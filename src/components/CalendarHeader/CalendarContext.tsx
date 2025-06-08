'use client';

import {
  endOfMonth,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
  startOfMonth,
} from 'date-fns';
import React, { createContext, useEffect, useState } from 'react';

import { getCurrentMonthRange } from '@/app/dateRange';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useMeetings } from '@/domain/hooks/meetingHooks';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';
const { now } = getCurrentMonthRange();

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  events: MeetingData[];
  setEvents: (events: MeetingData[]) => void;
  filterByTags: (tag: string[]) => void;
  getEventsCount: (
    events?: MeetingData[],
    selectedDate?: Date,
    view?: TCalendarView,
  ) => number;
  monthStart: Date;
  monthEnd: Date;
  setMonthStart: (date: Date) => void;
  setMonthEnd: (date: Date) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  countryFilter: string;
  setCountryFilter: (country: string) => void;
}

export const CalendarContext = createContext<ICalendarContext | undefined>(
  undefined,
);

interface CalendarProviderProps {
  children: React.ReactNode;
  events?: MeetingData[];
  view?: TCalendarView;
  badge?: 'dot' | 'colored';
}

export function CalendarProvider({
  children,
  view = 'day',
}: CalendarProviderProps) {
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(now);
  const [monthStart, setMonthStart] = useState<Date>(
    startOfMonth(selectedDate),
  );
  const [monthEnd, setMonthEnd] = useState<Date>(endOfMonth(selectedDate));
  const [selectedColors] = useState<TMeetingColor[]>([]);
  const { data: meetings = [], isLoading } = useMeetings(
    monthStart.toISOString(),
    monthEnd.toISOString(),
    searchQuery,
  );
  const [data, setData] = useState<MeetingData[]>(meetings);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };
  useEffect(() => {
    setMonthStart(startOfMonth(selectedDate));
    setMonthEnd(endOfMonth(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (!isLoading) {
      setData(meetings);
    }
  }, [meetings, isLoading]);

  const filterByTags = (selectedTags: string[]) => {
    const filtered = data.filter((meeting: MeetingData) => {
      if (!meeting.tags) return false;

      return selectedTags.some((tag) =>
        meeting
          .tags!.map((t: string) => t.toLowerCase())
          .includes(tag.toLowerCase()),
      );
    });

    setData(filtered);
  };

  function getEventsCount(
    eventsParam: MeetingData[] = data,
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
    selectedColors,
    events: data,
    setEvents: setData,
    filterByTags,
    getEventsCount,
    monthStart,
    monthEnd,
    setMonthStart,
    setMonthEnd,
    searchQuery,
    setSearchQuery,
    countryFilter,
    setCountryFilter,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
