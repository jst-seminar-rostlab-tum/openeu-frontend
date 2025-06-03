'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import {
  CalendarContext,
  ICalendarContext,
} from '@/components/CalendarHeader/CalendarContext';
import { DragDropContext } from '@/components/MonthViewCalendar/DragDropContext';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export const useMeetings = (
  startDate?: string,
  endDate?: string,
  query?: string,
  enabled = true,
) =>
  useQuery<MeetingData[]>({
    queryKey: ['meetings', startDate, endDate, query],
    queryFn: () => meetingRepository.getMeetings(startDate, endDate, query),
    enabled,
  });
export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (context === undefined)
    throw new Error('useCalendar must be used within a CalendarProvider.');
  return context;
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}
