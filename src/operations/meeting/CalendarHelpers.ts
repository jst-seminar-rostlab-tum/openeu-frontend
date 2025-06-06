import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameDay,
  isValid,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

import type { CalendarCell } from '@/domain/entities/calendar/CalendarCell';
import type { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';
import { meetingRepository } from '@/repositories/meetingRepository';

const FORMAT_STRING = 'MMM d, yyyy';
export const COLORS = ['blue', 'green', 'red', 'orange', 'purple', 'yellow'];

export function rangeText(view: TCalendarView, date: Date): string {
  let start: Date;
  let end: Date;

  switch (view) {
    case 'month':
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case 'week':
      start = startOfWeek(date);
      end = endOfWeek(date);
      break;
    case 'day':
      return format(date, FORMAT_STRING);
    case 'year':
      start = startOfYear(date);
      end = endOfYear(date);
      break;
    case 'agenda':
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    default:
      return 'Error while formatting';
  }

  return `${format(start, FORMAT_STRING)} - ${format(end, FORMAT_STRING)}`;
}

export function navigateDate(
  date: Date,
  view: TCalendarView,
  direction: 'previous' | 'next',
): Date {
  const operations: Record<TCalendarView, (d: Date, n: number) => Date> = {
    month: direction === 'next' ? addMonths : subMonths,
    week: direction === 'next' ? addWeeks : subWeeks,
    day: direction === 'next' ? addDays : subDays,
    year: direction === 'next' ? addYears : subYears,
    agenda: direction === 'next' ? addMonths : subMonths,
  };

  return operations[view](date, 1);
}

export function useFilteredEvents() {
  const { events, selectedDate } = useCalendar();
  return events.filter((event) => {
    const itemStartDate = new Date(event.meeting_start_datetime);
    let itemEndDate: Date;
    if (event.meeting_end_datetime === null) {
      itemEndDate = itemStartDate;
    } else {
      itemEndDate = new Date(event.meeting_end_datetime);
    }
    const monthStart = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );
    const monthEnd = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    );

    const isInSelectedMonth =
      itemStartDate <= monthEnd && itemEndDate >= monthStart;

    return isInSelectedMonth;
  });
}

export function getMonthCellEvents(
  date: Date,
  events: MeetingData[],
  eventPositions: Record<string, number>,
) {
  const dayStart = startOfDay(date);
  const eventsForDate = events.filter((event) => {
    const eventStart = parseISO(event.meeting_start_datetime);
    const eventEnd = parseISO(event.meeting_end_datetime);
    return (
      (dayStart >= eventStart && dayStart <= eventEnd) ||
      isSameDay(dayStart, eventStart) ||
      isSameDay(dayStart, eventEnd)
    );
  });
  return eventsForDate
    .map((event) => ({
      ...event,
      position: eventPositions[event.meeting_id] ?? -1,
      isMultiDay: event.meeting_start_datetime !== event.meeting_end_datetime,
    }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;
      return a.position - b.position;
    });
}

export function getColorFromId(meetingId: string) {
  let hash = 0;
  for (let i = 0; i < meetingId.length; i++) {
    hash = meetingId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index].toString();
}
export function getCalendarCells(selectedDate: Date): CalendarCell[] {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysInMonth = endOfMonth(selectedDate).getDate(); // Faster than new Date(year, month + 1, 0)
  const firstDayOfMonth = startOfMonth(selectedDate).getDay();
  const daysInPrevMonth = endOfMonth(new Date(year, month - 1)).getDate();
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(year, month - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(year, month, i + 1),
  }));

  const nextMonthCells = Array.from(
    { length: (7 - (totalDays % 7)) % 7 },
    (_, i) => ({
      day: i + 1,
      currentMonth: false,
      date: new Date(year, month + 1, i + 1),
    }),
  );

  return [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];
}

export function formatTime(
  date: Date | string,
  use24HourFormat: boolean,
): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return format(parsedDate, use24HourFormat ? 'HH:mm' : 'h:mm a');
}

export function calculateMonthEventPositions(
  multiDayEvents: MeetingData[],
  singleDayEvents: MeetingData[],
  selectedDate: Date,
): Record<string, number> {
  try {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const eventPositions: Record<string, number> = {};
    const occupiedPositions: Record<string, boolean[]> = {};

    eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
      occupiedPositions[day.toISOString()] = [false, false, false];
    });

    const sortedEvents = [
      ...multiDayEvents.sort((a, b) => {
        const aDuration = differenceInDays(
          parseISO(a.meeting_end_datetime),
          parseISO(a.meeting_start_datetime),
        );
        const bDuration = differenceInDays(
          parseISO(b.meeting_end_datetime),
          parseISO(b.meeting_start_datetime),
        );
        return (
          bDuration - aDuration ||
          parseISO(a.meeting_start_datetime).getTime() -
            parseISO(b.meeting_start_datetime).getTime()
        );
      }),
      ...singleDayEvents.sort(
        (a, b) =>
          parseISO(a.meeting_start_datetime).getTime() -
          parseISO(b.meeting_start_datetime).getTime(),
      ),
    ];

    sortedEvents.forEach((event) => {
      const eventStart = parseISO(event.meeting_start_datetime);
      const eventEnd = parseISO(event.meeting_end_datetime);
      const eventDays = eachDayOfInterval({
        start: eventStart < monthStart ? monthStart : eventStart,
        end: eventEnd > monthEnd ? monthEnd : eventEnd,
      });

      let position = -1;

      for (let i = 0; i < 3; i++) {
        if (
          eventDays.every((day) => {
            const dayPositions =
              occupiedPositions[startOfDay(day).toISOString()];
            return dayPositions && !dayPositions[i];
          })
        ) {
          position = i;
          break;
        }
      }

      if (position !== -1) {
        eventDays.forEach((day) => {
          const dayKey = startOfDay(day).toISOString();
          occupiedPositions[dayKey][position] = true;
        });
        eventPositions[event.meeting_id] = position;
      }
    });

    return eventPositions;
  } catch (error) {
    console.error('Error calculating month event positions:', error);
    return {};
  }
}

export const getEvents = async (
  startDate?: string,
  endDate?: string,
  query?: string,
): Promise<MeetingData[]> => {
  return await meetingRepository.getMeetings(startDate, endDate, query);
};
// Please leave this for testing.
// export const getEvents = async () => dummyMeetings;
