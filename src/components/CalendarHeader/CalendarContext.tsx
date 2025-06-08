'use client';

import React, { createContext, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { GetMeetingsQueryParams } from '@/domain/hooks/meetingHooks';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';
import {
  calculateEndDate,
  calculateStartDate,
} from '@/operations/meeting/CalendarHelpers';

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedColors: TMeetingColor[];
  events: MeetingData[];
  use24HourFormat: boolean;
  badgeVariant: 'dot' | 'colored';
  filters: GetMeetingsQueryParams;
  setFilters: (filters: GetMeetingsQueryParams) => void;
}

export const CalendarContext = createContext<ICalendarContext | undefined>(
  undefined,
);

interface CalendarProviderProps {
  children: React.ReactNode;
  events: MeetingData[];
  filters: GetMeetingsQueryParams;
  setFilters: (filters: GetMeetingsQueryParams) => void;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function CalendarProvider({
  children,
  events,
  filters,
  setFilters,
  view,
  setView,
  selectedDate,
  setSelectedDate,
}: CalendarProviderProps) {
  const [selectedColors] = useState<TMeetingColor[]>([]);
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    const start = calculateStartDate(date, view).toISOString();
    const end = calculateEndDate(date, view).toISOString();
    setFilters({
      ...filters,
      start,
      end,
    });
  };
  const value: ICalendarContext = {
    selectedDate,
    view,
    setView,
    setSelectedDate: handleSelectDate,
    selectedColors,
    events,
    use24HourFormat: true,
    badgeVariant: 'colored',
    filters,
    setFilters,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
