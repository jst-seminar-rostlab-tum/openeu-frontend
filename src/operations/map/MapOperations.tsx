import { useMemo } from 'react';

import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';

const COUNTRY_MAPPINGS = {
  'European Union': 'Belgium',
} as const;

export function useMeetingCountByCountry(
  meetings: MeetingData[],
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
  static topicsToFilterBadge(topics: string[]) {
    const [first, ...rest] = topics;
    const label = rest.length > 0 ? `${first} +${rest.length}` : first;
    return label;
  }
}
