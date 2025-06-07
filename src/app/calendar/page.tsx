'use client';
import { addHours, parseISO } from 'date-fns';

import { CalendarSkeleton } from '@/components/CalendarSkeleton/CalendarSkeleton';
import Calendar from '@/components/MonthlyCalendar/MonthlyCalendar';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useMeetings } from '@/domain/hooks/meetingHooks';
import { COLORS } from '@/operations/meeting/MeetingOperations';

export default function CalendarPage() {
  const { data, error, isLoading, isError } = useMeetings(true);

  function ensureMeetingEndTime(e: MeetingData) {
    if (e.meeting_end_datetime) return e;
    const endTime = parseISO(e.meeting_start_datetime);
    return {
      ...e,
      meeting_end_datetime: addHours(endTime, 1.5).toISOString(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    } as MeetingData;
  }

  if (isLoading) return <CalendarSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  const events = data?.map((e: MeetingData) => ensureMeetingEndTime(e));
  return <Calendar events={events ?? []} />;
}
