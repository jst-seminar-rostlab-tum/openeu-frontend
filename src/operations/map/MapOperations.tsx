export default class MapOperations {
  static dateToISOString(date?: Date): string {
    if (!date) return '';
    const utc = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return utc.toISOString();
  }
}
