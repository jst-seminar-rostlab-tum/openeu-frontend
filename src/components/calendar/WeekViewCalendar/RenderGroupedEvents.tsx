import { areIntervalsOverlapping, parseISO } from 'date-fns';

import { EventBlock } from '@/components/calendar/WeekViewCalendar/EventBlock';
import { EventListBlock } from '@/components/calendar/WeekViewCalendar/EventListBlock';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { getEventBlockStyle } from '@/operations/meeting/CalendarHelpers';

interface RenderGroupedEventsProps {
  groupedEvents: MeetingData[][][];
  day: Date;
}

export function RenderGroupedEvents({
  groupedEvents,
  day,
}: RenderGroupedEventsProps) {
  return groupedEvents.map((group, groupIndex) =>
    group.map((events, eventIndex) => {
      let style = getEventBlockStyle(
        events[0],
        day,
        groupIndex,
        groupedEvents.length,
      );
      const hasOverlap = groupedEvents.some(
        (otherGroup, otherIndex) =>
          otherIndex !== groupIndex &&
          otherGroup.some((otherEvent) =>
            areIntervalsOverlapping(
              {
                start: parseISO(events[0].meeting_start_datetime),
                end: parseISO(events[0].meeting_end_datetime),
              },
              {
                start: parseISO(otherEvent[0].meeting_start_datetime),
                end: parseISO(otherEvent[0].meeting_end_datetime),
              },
            ),
          ),
      );

      if (!hasOverlap) style = { ...style, width: '100%', left: '0%' };

      if (events.length == 1) {
        return (
          <div
            key={events[0].meeting_id}
            className="absolute p-1"
            style={style}
          >
            <EventBlock event={events[0]} />
          </div>
        );
      }

      return (
        <div
          key={`${groupIndex}-${eventIndex}`}
          className="absolute p-1"
          style={style}
        >
          <EventListBlock events={events} />
        </div>
      );
    }),
  );
}
