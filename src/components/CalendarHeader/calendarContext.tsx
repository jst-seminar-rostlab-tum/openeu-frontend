'use client';

import React, { createContext, useContext, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';

interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  events: MeetingData[];
  badgeVariant: 'dot' | 'colored';
}

interface CalendarSettings {
  badgeVariant: 'dot' | 'colored';
  view: TCalendarView;
  use24HourFormat: boolean;
  agendaModeGroupBy: 'date' | 'color';
}

const DEFAULT_SETTINGS: CalendarSettings = {
  badgeVariant: 'colored',
  view: 'day',
  use24HourFormat: true,
  agendaModeGroupBy: 'date',
};

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({
  children,
  events,
  badge = 'colored',
  view = 'day',
}: {
  children: React.ReactNode;
  events: MeetingData[] | null;
  view?: TCalendarView;
  badge?: 'dot' | 'colored';
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedColors, setSelectedColors] = useState<TMeetingColor[]>([]);
  const [data, setData] = useState(events || []);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const DEFAULT_SETTINGS: CalendarSettings = {
    badgeVariant: 'colored',
    view: 'day',
    use24HourFormat: true,
    agendaModeGroupBy: 'date',
  };

  const value = {
    selectedDate,
    view: currentView,
    setView,
    setSelectedDate: handleSelectDate,
    selectedColors,
    events: data,
    badgeVariant: badge || DEFAULT_SETTINGS.badgeVariant,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (context === undefined)
    throw new Error('useCalendar must be used within a CalendarProvider.');
  return context;
}
