'use client';

import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInMinutes,
  eachDayOfInterval,
  endOfDay,
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
} from 'date-fns';

import {
  CalendarCell,
  TCalendarView,
} from '@/domain/entities/calendar/CalendarTypes';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';

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
  const amount = direction === 'next' ? 1 : -1;

  const operations = {
    day: (d: Date, amt: number) => addDays(d, amt),
    week: (d: Date, amt: number) => addWeeks(d, amt),
    month: (d: Date, amt: number) => addMonths(d, amt),
    year: (d: Date, amt: number) => addYears(d, amt),
    agenda: (d: Date, amt: number) => addMonths(d, amt),
  };

  return operations[view](date, amount);
}

export function getEventsCount(
  events: Meeting[],
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
  events: Meeting[],
  eventPositions: Record<string, number>,
): Meeting[] {
  const dayStart = startOfDay(date);
  const eventsForDate: Meeting[] = events.filter((event) => {
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
  multiDayEvents: Meeting[],
  singleDayEvents: Meeting[],
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
    console.error('Error calculating month event positions:', error);
    return {};
  }
}

export const getCurrentMonthRange = () => {
  const now = new Date();
  return {
    startDate: startOfMonth(now).toISOString(),
    endDate: endOfMonth(now).toISOString(),
    now: now,
  };
};

// Meeting type mapping utilities
export const MEETING_TYPE_MAPPING: Record<string, string> = {
  mep_meetings: 'MEP',
  ep_meetings: 'European Parliament',
  austrian_parliament_meetings: 'Austrian Parliament',
  belgian_parliament_meetings: 'Belgian Parliament',
  ipex_events: 'IPEX Events',
  mec_prep_bodies_meeting: 'MEC Prep-Bodies',
  mec_summit_ministerial_meeting: 'MEC Summit/Ministerial',
  polish_presidency_meeting: 'Polish Presidency',
  spanish_commission_meetings: 'Spanish Commission',
  weekly_agenda: 'Weekly Agenda',
};

/**
 * Maps a source_table value to a human-readable meeting type
 * @param sourceTable - The source_table value from the backend
 * @returns Human-readable meeting type or the original value if not found
 */
export function getMeetingType(sourceTable?: string): string {
  if (!sourceTable) return 'Unknown';
  return MEETING_TYPE_MAPPING[sourceTable] || sourceTable;
}

/**
 * Gets the short version of meeting type for compact display
 * @param sourceTable - The source_table value from the backend
 * @returns Short meeting type or the original value if not found
 */
export function getMeetingTypeShort(sourceTable?: string): string {
  if (!sourceTable) return 'Unknown';

  const shortMappings: Record<string, string> = {
    mep_meetings: 'MEP',
    ep_meetings: 'EP',
    austrian_parliament_meetings: 'AT Parliament',
    belgian_parliament_meetings: 'BE Parliament',
    ipex_events: 'IPEX',
    mec_prep_bodies_meeting: 'MEC Prep',
    mec_summit_ministerial_meeting: 'MEC Summit',
    polish_presidency_meeting: 'PL Presidency',
    spanish_commission_meetings: 'ES Commission',
    weekly_agenda: 'Weekly',
  };

  return (
    shortMappings[sourceTable] ||
    MEETING_TYPE_MAPPING[sourceTable] ||
    sourceTable
  );
}

export function getSourceTableFromInstitution(institutionName: string): string {
  const reverseMapping = Object.fromEntries(
    Object.entries(MEETING_TYPE_MAPPING).map(([key, value]) => [value, key]),
  );

  return reverseMapping[institutionName] || institutionName;
}

export function getInstitutionFromSourceTable(sourceTable: string): string {
  return MEETING_TYPE_MAPPING[sourceTable] || sourceTable;
}

export function groupEvents(dayEvents: Meeting[]) {
  const sortedEvents = dayEvents.sort(
    (a, b) =>
      parseISO(a.meeting_end_datetime).getTime() -
      parseISO(b.meeting_start_datetime).getTime(),
  );

  const grouped = Object.groupBy(
    sortedEvents,
    ({ meeting_start_datetime, meeting_end_datetime }) => {
      const start = parseISO(meeting_start_datetime);
      const end = parseISO(meeting_end_datetime);
      return start.toISOString() + '---' + end.toISOString();
    },
  );

  const groups: Meeting[][][] = [];
  Object.entries(grouped).forEach(([key, value]) => {
    const [start] = key.split('---');
    const eventStart = parseISO(start);
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1];
      const lastEventEnd = parseISO(lastEventInGroup[0].meeting_end_datetime);

      if (eventStart >= lastEventEnd) {
        group.push(value!);
        placed = true;
        break;
      }
    }
    if (!placed) groups.push([value!]);
  });
  return groups;
}

export function getEventBlockStyle(
  event: Meeting,
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

// New functions from the incoming branch
export const calculateStartDate = (start: Date, view: TCalendarView): Date => {
  switch (view) {
    case 'month':
      return startOfMonth(start);
    case 'week':
      return startOfWeek(start);
    case 'day':
      return startOfDay(start);
    default:
      return start;
  }
};

export const calculateEndDate = (start: Date, view: TCalendarView): Date => {
  switch (view) {
    case 'month':
      return endOfMonth(start);
    case 'week':
      return endOfWeek(start);
    case 'day':
      return endOfDay(start);
    default:
      return start;
  }
};
