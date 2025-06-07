'use client';

import {
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
  parseISO,
} from 'date-fns';
import React, { createContext, useState } from 'react';

import { getCurrentMonthRange } from '@/app/dateRange';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { TCalendarView, TMeetingColor } from '@/domain/types/calendar/types';
import { meetingRepository } from '@/repositories/meetingRepository';
const { now, startDate, endDate } = getCurrentMonthRange();

export interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  setSelectedDate: (date: Date | undefined) => void;
  events: MeetingData[];
  setEvents: (events: MeetingData[]) => void;
  searchByTitle: (title: string) => void;
  allEvents: MeetingData[];
  filterByTags: (tag: string[]) => void;
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
  events?: MeetingData[];
  view?: TCalendarView;
  badge?: 'dot' | 'colored';
}

export function CalendarProvider({
  children,
  events = [],
  view = 'day',
}: CalendarProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(now);
  const [selectedColors] = useState<TMeetingColor[]>([]);
  const [data, setData] = useState<MeetingData[]>(events);
  const [allEvents] = useState<MeetingData[]>(events);
  const [currentView, setCurrentView] = useState<TCalendarView>(view);
  const setView = (newView: TCalendarView) => {
    setCurrentView(newView);
  };
  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const searchByTitle = async (title: string) => {
    const meetings = await meetingRepository.getMeetings(
      startDate,
      endDate,
      title,
    );
    setData(meetings);
  };
  const filterByTags = (selectedTags: string[]) => {
    const filtered = events.filter((meeting: MeetingData) => {
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
    searchByTitle,
    allEvents,
    filterByTags,
    getEventsCount,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}
