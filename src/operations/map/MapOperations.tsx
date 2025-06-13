import {
  endOfWeek,
  formatISO,
  parseISO,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { useMemo } from 'react';

import { Meeting } from '@/domain/entities/calendar/generated-types';
import { meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';

const COUNTRY_MAPPINGS = {
  'European Union': 'Belgium',
} as const;

export function useMeetingCountByCountry(
  meetings: Meeting[],
): typeof meetingsPerCountry {
  return useMemo(() => {
    const countMap = new Map<string, number>();
    meetingsPerCountry.forEach((_, country) => countMap.set(country, 0));

    meetings.forEach((meeting) => {
      const country =
        COUNTRY_MAPPINGS[meeting.location as keyof typeof COUNTRY_MAPPINGS] ??
        meeting.location;

      if (countMap.has(country)) {
        countMap.set(country, countMap.get(country)! + 1);
      } else {
        console.warn(`Unknown country "${meeting.location}" - skipping`);
      }
    });

    return countMap;
  }, [meetings]);
}

export default class MapOperations {
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
}
