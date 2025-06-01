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
}

const CalendarContext = createContext<ICalendarContext | undefined>(undefined);

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

  const value = {
    selectedDate,
    view: currentView,
    setView,
    setSelectedDate: handleSelectDate,
    selectedColors,
    events: data   
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