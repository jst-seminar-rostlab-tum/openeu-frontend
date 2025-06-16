import {
  endOfWeek,
  formatISO,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { format } from 'date-fns';

export class DateHelper {
  /**
   * Converts a Date to ISO string format
   * Uses date-fns for reliable formatting
   */
  static dateToISOString(date?: Date): string {
    if (!date) return '';
    return formatISO(date);
  }

  /**
   * Parses ISO string to Date with fallback to current date
   * Uses date-fns for reliable parsing
   */
  static isoStringToDate(iso: string): Date {
    try {
      return parseISO(iso);
    } catch {
      return startOfDay(new Date());
    }
  }

  /**
   * Gets current week range (Monday to Sunday)
   * Uses date-fns for accurate week calculations
   */
  static getCurrentWeekRange(): {
    startDate: Date;
    endDate: Date;
  } {
    const now = new Date();

    return {
      startDate: startOfWeek(now, { weekStartsOn: 1 }), // Monday
      endDate: endOfWeek(now, { weekStartsOn: 1 }), // Sunday
    };
  }

  static dateRangeToString(from?: Date, to?: Date): string {
    let result = '';

    if (from) {
      result += format(from, 'MMM dd');
    }

    if (from && to) {
      result += ' - ';
    }

    if (to) {
      result += format(to, 'MMM dd');
    }

    return result;
  }
}
