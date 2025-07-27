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
 * Formats topic or countries filters for display, showing first selected value + count if multiple
 * @param selection Array of selection strings
 * @returns Object with display text and whether there are multiple selections
 */
export function formatSelectionForDisplay(selection?: string[] | null): {
  displayText: string;
  hasMultiple: boolean;
} | null {
  if (!selection || selection.length === 0) {
    return null;
  }

  if (selection.length === 1) {
    return {
      displayText: selection[0],
      hasMultiple: false,
    };
  }

  return {
    displayText: `${selection[0]} + ${selection.length - 1}`,
    hasMultiple: true,
  };
}
