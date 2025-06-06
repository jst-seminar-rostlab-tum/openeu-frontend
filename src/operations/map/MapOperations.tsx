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
}
