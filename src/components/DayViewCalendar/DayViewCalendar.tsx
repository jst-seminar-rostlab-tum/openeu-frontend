import { format, isWithinInterval, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { DayPicker } from '@/components/DayViewCalendar/DayPicker';
import { DayViewMultiDayEventsRow } from '@/components/DayViewCalendar/DayViewMultiDayEventsRow';
import { DroppableArea } from '@/components/MonthViewCalendar/DroppableArea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarTimeline } from '@/components/WeekViewCalendar/CalendarTimeline';
import { RenderGroupedEvents } from '@/components/WeekViewCalendar/RenderGroupedEvents';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import { groupEvents } from '@/operations/meeting/CalendarHelpers';

interface IProps {
  singleDayEvents: MeetingData[];
  multiDayEvents: MeetingData[];
}

export function CalendarDayView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, setSelectedDate, /*users,*/ use24HourFormat } =
    useCalendar();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (!scrollAreaRef.current) return;

      const scrollArea = scrollAreaRef.current;
      const rect = scrollArea.getBoundingClientRect();
      const scrollSpeed = 15;

      const scrollContainer =
        scrollArea.querySelector('[data-radix-scroll-area-viewport]') ||
        scrollArea;

      if (e.clientY < rect.top + 60) {
        scrollContainer.scrollTop -= scrollSpeed;
      }

      if (e.clientY > rect.bottom - 60) {
        scrollContainer.scrollTop += scrollSpeed;
      }
    };

    document.addEventListener('dragover', handleDragOver);
    return () => {
      document.removeEventListener('dragover', handleDragOver);
    };
  }, []);

  const getCurrentEvents = (events: MeetingData[]) => {
    const now = new Date();

    return (
      events.filter((event) =>
        isWithinInterval(now, {
          start: parseISO(event.meeting_start_datetime),
          end: parseISO(event.meeting_end_datetime),
        }),
      ) || []
    );
  };

  const currentEvents = getCurrentEvents(singleDayEvents);

  const dayEvents = singleDayEvents.filter((event) => {
    const eventDate = parseISO(event.meeting_start_datetime);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>
          <DayViewMultiDayEventsRow
            selectedDate={selectedDate}
            multiDayEvents={multiDayEvents}
          />

          {/* Day header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <span className="flex-1 border-l py-2 text-center text-xs font-medium text-t-quaternary">
              {format(selectedDate, 'EE')}{' '}
              <span className="font-semibold text-t-secondary">
                {format(selectedDate, 'd')}
              </span>
            </span>
          </div>
        </div>

        <ScrollArea className="h-[800px]" type="always" ref={scrollAreaRef}>
          <div className="flex">
            {/* Hours column */}
            <div className="relative w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: '96px' }}>
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && (
                      <span className="text-xs text-t-quaternary">
                        {format(
                          new Date().setHours(hour, 0, 0, 0),
                          use24HourFormat ? 'HH:00' : 'h a',
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="relative flex-1 border-l">
              <div className="relative">
                {hours.map((hour, index) => (
                  <div
                    key={hour}
                    className="relative"
                    style={{ height: '96px' }}
                  >
                    {index !== 0 && (
                      <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>
                    )}

                    <DroppableArea
                      date={selectedDate}
                      hour={hour}
                      minute={0}
                      className="absolute inset-x-0 top-0 h-[48px]"
                    >
                      <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary" />
                    </DroppableArea>

                    <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>

                    <DroppableArea
                      date={selectedDate}
                      hour={hour}
                      minute={30}
                      className="absolute inset-x-0 bottom-0 h-[48px]"
                    >
                      <div className="absolute inset-0 cursor-pointer transition-colors hover:bg-secondary" />
                    </DroppableArea>
                  </div>
                ))}

                <RenderGroupedEvents
                  groupedEvents={groupedEvents}
                  day={selectedDate}
                />
              </div>

              <CalendarTimeline />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="hidden w-72 divide-y border-l md:block">
        <DayPicker
          className="mx-auto w-fit"
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          initialFocus
        />

        <div className="flex-1 space-y-3">
          {currentEvents.length > 0 ? (
            <div className="flex items-start gap-2 px-4 pt-4">
              <span className="relative mt-[5px] flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-success-600"></span>
              </span>

              <p className="text-sm font-semibold text-t-secondary">
                Happening now
              </p>
            </div>
          ) : (
            <p className="p-4 text-center text-sm italic text-t-tertiary">
              No meeting at the moment
            </p>
          )}

          {currentEvents.length > 0 && (
            <ScrollArea className="h-[422px] px-4" type="always">
              <div className="space-y-6 pb-4">
                {currentEvents.map((event) => {
                  //const user = users.find(user => user.id === event.user.id);

                  return (
                    <div key={event.meeting_id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">
                        {event.title}
                      </p>
                      {/*
                      user && (
                        <div className="flex items-center gap-1.5">
                          <User className="size-4 text-t-quinary"/>
                          <span className="text-sm text-t-tertiary">{user.name}</span>
                        </div>
                      )*/}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary">
                          {format(
                            new Date(event.meeting_start_datetime),
                            'MMM d, yyyy',
                          )}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary">
                          {format(
                            parseISO(event.meeting_start_datetime),
                            use24HourFormat ? 'HH:mm' : 'hh:mm a',
                          )}{' '}
                          -
                          {format(
                            parseISO(event.meeting_end_datetime),
                            use24HourFormat ? 'HH:mm' : 'hh:mm a',
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
