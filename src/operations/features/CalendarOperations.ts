interface CalendarEvent {
  date: number;
  title: string;
  type: 'urgent' | 'normal';
}

export default class CalendarOperations {
  static getCalendarEvents(): CalendarEvent[] {
    return [
      { date: 15, title: 'EU AI Act Review', type: 'urgent' },
      { date: 18, title: 'GDPR Compliance Audit', type: 'normal' },
      { date: 22, title: 'Digital Services Act', type: 'urgent' },
      { date: 28, title: 'Green Deal Update', type: 'normal' },
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
