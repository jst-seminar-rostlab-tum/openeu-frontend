import { getDay } from 'date-fns';

interface CalendarEvent {
  weekdayIndex: number;
  title: string;
  type: 'urgent' | 'normal';
}

export default class CalendarOperations {
  static getCalendarEvents(): CalendarEvent[] {
    const currentWeekday = getDay(new Date());

    const baseEvents = [
      { weekdayIndex: 1, title: 'Digital Markets Act Update', type: 'urgent' },
      { weekdayIndex: 3, title: 'AI Ethics Guidelines', type: 'normal' },
      { weekdayIndex: 5, title: 'Data Protection Summit', type: 'normal' },
    ] as CalendarEvent[];

    const filteredBaseEvents = baseEvents.filter(
      (event) => event.weekdayIndex !== currentWeekday,
    );

    return [
      {
        weekdayIndex: currentWeekday,
        title: 'Today: EU Policy Brief',
        type: 'urgent',
      },
      ...filteredBaseEvents,
    ];
  }

  private static getWeekdayIndex(date: number): number {
    const targetDate = new Date();
    targetDate.setDate(date);
    return getDay(targetDate);
  }

  static getEventsForDate(date: number): CalendarEvent[] {
    const weekdayIndex = this.getWeekdayIndex(date);
    return this.getCalendarEvents().filter(
      (event) => event.weekdayIndex === weekdayIndex,
    );
  }

  static hasEventOnDate(date: number): boolean {
    const weekdayIndex = this.getWeekdayIndex(date);
    return this.getCalendarEvents().some(
      (event) => event.weekdayIndex === weekdayIndex,
    );
  }

  static getEventTypeForDate(date: number): 'urgent' | 'normal' | undefined {
    const weekdayIndex = this.getWeekdayIndex(date);
    return this.getCalendarEvents().find(
      (event) => event.weekdayIndex === weekdayIndex,
    )?.type;
  }
}

export type { CalendarEvent };
