import {
  differenceInDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

import { MonthEventBadge } from '@/components/calendar/MonthViewCalendar/MonthEventBadge';
import { Meeting } from '@/domain/entities/calendar/generated-types';

interface IProps {
  selectedDate: Date;
  multiDayEvents: Meeting[];
}

export function DayViewMultiDayEventsRow({
  selectedDate,
  multiDayEvents,
}: IProps) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayEventsInDay = multiDayEvents
    .filter((event) => {
      const eventStart = event.meeting_start_datetime;
      const eventEnd = event.meeting_end_datetime!;

      return (
        isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
        isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      );
    })
    .sort((a, b) => {
      const durationA = differenceInDays(
        a.meeting_end_datetime!,
        a.meeting_end_datetime!,
      );
      const durationB = differenceInDays(
        b.meeting_start_datetime,
        b.meeting_start_datetime,
      );
      return durationB - durationA;
    });

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayEventsInDay.map((event) => {
          const eventStart = startOfDay(event.meeting_start_datetime);
          const eventEnd = startOfDay(event.meeting_end_datetime!);
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
