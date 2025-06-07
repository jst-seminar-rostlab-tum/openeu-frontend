import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInMinutes,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isSameYear,
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
import { dummyMeetings } from '@/operations/meeting/MeetingOperations';

const FORMAT_STRING = 'MMM d, yyyy';

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
    const itemEndDate = new Date(event.meeting_end_datetime);

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

    return itemStartDate <= monthEnd && itemEndDate >= monthStart;
  });
}
export function getEventsCount(
  events: MeetingData[],
  date: Date,
  view: TCalendarView,
): number {
  const compareFns: Record<TCalendarView, (d1: Date, d2: Date) => boolean> = {
    day: isSameDay,
    week: isSameWeek,
    month: isSameMonth,
    year: isSameYear,
    agenda: isSameMonth,
  };

  const compareFn = compareFns[view];
  return events.filter((event) =>
    compareFn(parseISO(event.meeting_start_datetime), date),
  ).length;
}

export function getMonthCellEvents(
  date: Date,
  events: MeetingData[],
  eventPositions: Record<string, number>,
): MeetingData[] {
  const dayStart = startOfDay(date);
  const eventsForDate: MeetingData[] = events.filter((event) => {
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
      position: eventPositions[Number(event.meeting_id)] ?? -1,
      isMultiDay: !isSameDay(
        parseISO(event.meeting_start_datetime),
        parseISO(event.meeting_end_datetime),
      ),
    }))
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;
      return a.position - b.position;
    });
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
        eventPositions[Number(event.meeting_id)] = position;
      }
    });

    return eventPositions;
  } catch (error) {
    // eslint-disable-next-line
    console.error('Error calculating month event positions:', error);
    return {};
  }
}

export const getEvents = async () => dummyMeetings;

// Tag color utilities
const TAG_COLORS = [
  'bg-blue-100 text-blue-800 border-blue-200',
  'bg-green-100 text-green-800 border-green-200',
  'bg-purple-100 text-purple-800 border-purple-200',
  'bg-yellow-100 text-yellow-800 border-yellow-200',
  'bg-red-100 text-red-800 border-red-200',
  'bg-indigo-100 text-indigo-800 border-indigo-200',
  'bg-pink-100 text-pink-800 border-pink-200',
  'bg-orange-100 text-orange-800 border-orange-200',
  'bg-teal-100 text-teal-800 border-teal-200',
  'bg-cyan-100 text-cyan-800 border-cyan-200',
];

function hashString(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

/**
 * Maps a tag to a consistent color using hashing
 */
export function getTagColor(tag: string): string {
  const hash = hashString(tag);
  const colorIndex = hash % TAG_COLORS.length;
  return TAG_COLORS[colorIndex];
}

export function groupEvents(dayEvents: MeetingData[]): MeetingData[][] {
  const sortedEvents = dayEvents.sort(
    (a, b) =>
      parseISO(a.meeting_end_datetime).getTime() -
      parseISO(b.meeting_start_datetime).getTime(),
  );
  const groups: MeetingData[][] = [];

  for (const event of sortedEvents) {
    const eventStart = parseISO(event.meeting_start_datetime);
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1];
      const lastEventEnd = parseISO(lastEventInGroup.meeting_end_datetime);

      if (eventStart >= lastEventEnd) {
        group.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) groups.push([event]);
  }
  return groups;
}

export function getEventBlockStyle(
  event: MeetingData,
  day: Date,
  groupIndex: number,
  groupSize: number,
) {
  const startDate = parseISO(event.meeting_start_datetime);
  const dayStart = startOfDay(day); // Use startOfDay instead of manual reset
  const eventStart = startDate < dayStart ? dayStart : startDate;
  const startMinutes = differenceInMinutes(eventStart, dayStart);

  const top = (startMinutes / 1440) * 100; // 1440 minutes in a day
  const width = 100 / groupSize;
  const left = groupIndex * width;

  return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
}
