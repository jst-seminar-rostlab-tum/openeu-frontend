'use client';

import React, { createContext, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedColors: TMeetingColor[];
  events: MeetingData[];
  use24HourFormat: boolean;
  badgeVariant: 'dot' | 'colored';
}

export const CalendarContext = createContext<ICalendarContext | undefined>(
  undefined,
);

export function CalendarProvider({
  children,
  events,
  view = 'day',
}: {
  children: React.ReactNode;
  events: MeetingData[];
  view?: TCalendarView;
  badge?: 'dot' | 'colored';
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColors] = useState<TMeetingColor[]>([]);
  const [data] = useState(events || []);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };
  const value: ICalendarContext = {
    selectedDate,
    view: currentView,
    setView,
    setSelectedDate: handleSelectDate,
    selectedColors,
    events: data,
    use24HourFormat: true,
    badgeVariant: 'colored',
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
