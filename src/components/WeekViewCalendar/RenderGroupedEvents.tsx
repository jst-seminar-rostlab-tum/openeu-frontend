import { areIntervalsOverlapping, parseISO } from 'date-fns';

import { EventBlock } from '@/components/WeekViewCalendar/EventBlock';
import { EventListBlock } from '@/components/WeekViewCalendar/EventListBlock';
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
    group.map((event, eventIndex) => {
      let style = getEventBlockStyle(
        event[0],
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
                start: parseISO(event[0].meeting_start_datetime),
                end: parseISO(event[0].meeting_end_datetime),
              },
              {
                start: parseISO(otherEvent[0].meeting_start_datetime),
                end: parseISO(otherEvent[0].meeting_end_datetime),
              },
            ),
          ),
      );

      if (!hasOverlap) style = { ...style, width: '100%', left: '0%' };

      if (event.length == 1) {
        return (
          <div key={event[0].meeting_id} className="absolute p-1" style={style}>
            <EventBlock event={event[0]} />
          </div>
        );
      }

      return (
        <div
          key={`${groupIndex}-${eventIndex}`}
          className="absolute p-1"
          style={style}
        >
          <EventListBlock events={event} />
        </div>
      );
    }),
  );
}
