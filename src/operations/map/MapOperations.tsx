export default class MapOperations {
  static dateToISOString(date?: Date): string {
    if (!date) return '';
    const utc = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return utc.toISOString();
  }

  static isoStringToDate(iso: string): Date {
    const parsed = new Date(iso);
    if (isNaN(parsed.getTime())) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return now;
    }
    return new Date(parsed.getTime() + parsed.getTimezoneOffset() * 60_000);
  }

  static initDateRange(): { startDate: string; endDate: string } {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    start.setHours(0, 0, 0, 0);

    end.setHours(23, 59, 0, 0);

    return {
      startDate: this.dateToISOString(start),
      endDate: this.dateToISOString(end),
    };
  }
}
