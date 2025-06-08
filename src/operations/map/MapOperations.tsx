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

  static getCurrentWeekRange(): {
    startDate: Date;
    endDate: Date;
  } {
    const now = new Date();

    const day = now.getDay();

    const diffToMonday = (day + 6) % 7;

    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { startDate: monday, endDate: sunday };
  }
}
