import {
  endOfWeek,
  format,
  formatISO,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns';

/**
 * Converts a Date to ISO string format
 * Uses date-fns for reliable formatting
 */
export function dateToISOString(date?: Date): string {
  if (!date) return '';
  return formatISO(date);
}

/**
 * Parses ISO string to Date with fallback to current date
 * Uses date-fns for reliable parsing
 */
export function isoStringToDate(iso: string): Date {
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
export function getCurrentWeekRange(): {
  startDate: Date;
  endDate: Date;
} {
  const now = new Date();

  return {
    startDate: startOfWeek(now, { weekStartsOn: 1 }), // Monday
    endDate: endOfWeek(now, { weekStartsOn: 1 }), // Sunday
  };
}

/**
 * Formats a date range into a human-readable string
 */
export function dateRangeToString(from?: Date, to?: Date): string {
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

/**
 * Formats topic filters for display, showing first topic + count if multiple
 * @param topics Array of topic strings
 * @returns Object with display text and whether there are multiple topics
 */
export function formatTopicsForDisplay(topics?: string[] | null): {
  displayText: string;
  hasMultiple: boolean;
} | null {
  if (!topics || topics.length === 0) {
    return null;
  }

  if (topics.length === 1) {
    return {
      displayText: topics[0],
      hasMultiple: false,
    };
  }

  return {
    displayText: `${topics[0]} + ${topics.length - 1}`,
    hasMultiple: true,
  };
}
