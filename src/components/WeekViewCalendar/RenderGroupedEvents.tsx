import { areIntervalsOverlapping, parseISO } from 'date-fns';

import { EventBlock } from '@/components/WeekViewCalendar/EventBlock';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { getEventBlockStyle } from '@/operations/meeting/CalendarHelpers';

interface RenderGroupedEventsProps {
  groupedEvents: MeetingData[][];
  day: Date;
}

export function RenderGroupedEvents({
  groupedEvents,
  day,
}: RenderGroupedEventsProps) {
  return groupedEvents.map((group, groupIndex) =>
    group.map((event) => {
      let style = getEventBlockStyle(
        event,
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
                start: parseISO(event.meeting_start_datetime),
                end: parseISO(event.meeting_end_datetime),
              },
              {
                start: parseISO(otherEvent.meeting_start_datetime),
                end: parseISO(otherEvent.meeting_end_datetime),
              },
            ),
          ),
      );

      if (!hasOverlap) style = { ...style, width: '100%', left: '0%' };

      return (
        <div key={event.meeting_id} className="absolute p-1" style={style}>
          <EventBlock event={event} />
        </div>
      );
    }),
  );
}
