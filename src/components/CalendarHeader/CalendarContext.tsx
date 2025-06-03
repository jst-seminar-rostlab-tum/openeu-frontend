'use client';

import {
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
} from 'date-fns';
import React, { createContext, useState } from 'react';

import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  events: MeetingData[];
  setEvents: (events: MeetingData[]) => void;
  searchByTitle: (title: string) => void;
  filterByTags: (tag: string[]) => void;
  filterByCountry: (country: string) => void;
  getEventsCount: (
    events?: MeetingData[],
    selectedDate?: Date,
    view?: TCalendarView,
  ) => number;
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
  const [data, setData] = useState(events || []);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const searchByTitle = (title: string) => {
    if (!title) {
      setData(events);
      return;
    }
    const filtered = events.filter((meeting) =>
      meeting.title.toLowerCase().includes(title.toLowerCase()),
    );
    setData(filtered);
  };
  const filterByTags = (selectedTags: string[]) => {
    const filtered = events.filter((meeting) => {
      if (!meeting.tags) return false;

      return selectedTags.some((tag) =>
        meeting.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
      );
    });

    setData(filtered);
  };

  const filterByCountry = (selectedCountry: string) => {
    const filtered = events.filter((meeting) => {
      if (!meeting.location) return false;
      return meeting.location
        .toLowerCase()
        .includes(selectedCountry.toLowerCase());
    });
    setData(filtered);
  };
  function getEventsCount(events?: MeetingData[], selectedDate?: Date): number {
    const compareFns: Record<TCalendarView, (d1: Date, d2: Date) => boolean> = {
      day: isSameDay,
      week: isSameWeek,
      month: isSameMonth,
      year: isSameYear,
      agenda: isSameMonth,
    };

    const compareFn = compareFns[view];
    return events!.filter((event) =>
      compareFn(parseISO(event.meeting_start_datetime), selectedDate!),
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
    searchByTitle,
    filterByTags,
    filterByCountry,
    getEventsCount,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
