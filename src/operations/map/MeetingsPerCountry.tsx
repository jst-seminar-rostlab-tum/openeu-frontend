import { useEffect, useMemo, useState } from 'react';

import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingsPerCountry as meetingsPerCountry } from '@/domain/entities/MapIndicator/MeetingCountByCountry';

export function useMeetingCountByCountry(
  meetings: MeetingData[],
): typeof meetingsPerCountry {
  const computed = useMemo<typeof meetingsPerCountry>(() => {
    const next = new Map<string, number>(meetingsPerCountry);
    for (const country of next.keys()) {
      next.set(country, 0);
    }
    for (const meeting of meetings) {
      let country = meeting.location;
      if (country === 'European Union') {
        country = 'Belgium';
      }
      if (next.has(country)) {
        next.set(country, next.get(country)! + 1);
      } else {
        console.warn(
          `Encountered unexpected country "${meeting.location}" — skipping.`,
        );
      }
    }
    return next;
  }, [meetings]);

  const [counts, setCounts] = useState<typeof meetingsPerCountry>(
    () => computed,
  );

  useEffect(() => {
    const prev = counts;
    const next = computed;
    if (prev.size !== next.size) {
      setCounts(next);
      return;
    }
    for (const [country, val] of next.entries()) {
      if (prev.get(country) !== val) {
        setCounts(next);
        return;
      }
    }
  }, [computed]);

  return counts;
}
