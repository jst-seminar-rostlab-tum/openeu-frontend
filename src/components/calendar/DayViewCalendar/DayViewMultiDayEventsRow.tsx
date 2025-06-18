import {
  differenceInDays,
  endOfDay,
  isWithinInterval,
  parseISO,
  startOfDay,
} from 'date-fns';

import { MonthEventBadge } from '@/components/calendar/MonthViewCalendar/MonthEventBadge';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';

interface IProps {
  selectedDate: Date;
  multiDayEvents: MeetingData[];
}

export function DayViewMultiDayEventsRow({
  selectedDate,
  multiDayEvents,
}: IProps) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayEventsInDay = multiDayEvents
    .filter((event) => {
      const eventStart = parseISO(event.meeting_start_datetime);
      const eventEnd = parseISO(event.meeting_end_datetime);

      return (
        isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
        isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      );
    })
    .sort((a, b) => {
      const durationA = differenceInDays(
        parseISO(a.meeting_end_datetime),
        parseISO(a.meeting_end_datetime),
      );
      const durationB = differenceInDays(
        parseISO(b.meeting_start_datetime),
        parseISO(b.meeting_start_datetime),
      );
      return durationB - durationA;
    });

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayEventsInDay.map((event) => {
          const eventStart = startOfDay(parseISO(event.meeting_start_datetime));
          const eventEnd = startOfDay(parseISO(event.meeting_end_datetime));
          const currentDate = startOfDay(selectedDate);

          const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
          const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

          return (
            <MonthEventBadge
              key={event.meeting_id}
              event={event}
              cellDate={selectedDate}
              eventCurrentDay={eventCurrentDay}
              eventTotalDays={eventTotalDays}
            />
          );
        })}
      </div>
    </div>
  );
}
