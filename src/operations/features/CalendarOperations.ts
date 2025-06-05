interface CalendarEvent {
  date: number;
  title: string;
  type: 'urgent' | 'normal';
}

export default class CalendarOperations {
  static getCalendarEvents(): CalendarEvent[] {
    return [
      { date: 2, title: 'GDPR Amendment Review', type: 'normal' },
      { date: 3, title: 'Digital Markets Act Update', type: 'urgent' },
      { date: 5, title: 'AI Ethics Guidelines', type: 'normal' },
      { date: 7, title: 'Data Protection Summit', type: 'urgent' },
    ];
  }

  static getEventsForDate(date: number): CalendarEvent[] {
    return this.getCalendarEvents().filter((event) => event.date === date);
  }

  static hasEventOnDate(date: number): boolean {
    return this.getCalendarEvents().some((event) => event.date === date);
  }

  static getEventTypeForDate(date: number): 'urgent' | 'normal' | undefined {
    return this.getCalendarEvents().find((event) => event.date === date)?.type;
  }
}

export type { CalendarEvent };
