'use client';
import { addHours, parseISO } from 'date-fns';
import { useState } from 'react';

import Calendar from '@/components/MonthlyCalendar/MonthlyCalendar';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import {
  GetMeetingsQueryParams,
  useMeetings,
} from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';
import {
  calculateEndDate,
  calculateStartDate,
  getColorFromId,
} from '@/operations/meeting/CalendarHelpers';

export default function CalendarPage() {
  const [view, setView] = useState<TCalendarView>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<GetMeetingsQueryParams>({
    start: calculateStartDate(selectedDate, view).toISOString(),
    end: calculateEndDate(selectedDate, view).toISOString(),
  } as GetMeetingsQueryParams);

  const {
    data: meetings,
    error,
    isLoading,
    isError,
  } = useMeetings(filters, true);

  function ensureMeetingEndTimeAndColor(meeting: MeetingData) {
    if (meeting.meeting_end_datetime) return meeting;
    const endTime = parseISO(meeting.meeting_start_datetime);
    return {
      ...meeting,
      meeting_end_datetime: addHours(endTime, 1.5).toISOString(),
      color: getColorFromId(meeting.meeting_id),
    } as MeetingData;
  }

  const events = meetings?.map((e: MeetingData) =>
    ensureMeetingEndTimeAndColor(e),
  );

  return (
    <Calendar
      isLoading={isLoading}
      isError={isError}
      error={error}
      events={events ?? []}
      filters={filters}
      setFilters={(newFilters) => setFilters(newFilters)}
      view={view}
      setView={(newView) => setView(newView)}
      selectedDate={selectedDate}
      setSelectedDate={(date: Date) => setSelectedDate(date)}
    />
  );
}
