'use client';
import { useCallback, useState } from 'react';

import MapOperations from '@/operations/map/MapOperations';

export interface MeetingFilters {
  start: string;
  end: string;
  query?: string;
}

export default function useInitUrlMeetingFilter() {
  const { startDate, endDate } = MapOperations.getCurrentWeekRange();
  const defaultFilters: MeetingFilters = {
    start: MapOperations.dateToISOString(startDate),
    end: MapOperations.dateToISOString(endDate),
    query: '',
  };

  const [urlFilters, setUrlFilters] = useState<MeetingFilters>(() => {
    if (typeof window === 'undefined') {
      return defaultFilters;
    }
    const params = new URLSearchParams(window.location.search);
    return {
      start: params.get('start') ?? defaultFilters.start,
      end: params.get('end') ?? defaultFilters.end,
      query: params.get('query') ?? defaultFilters.query,
    };
  });

  const updateFilters = useCallback((updates: Partial<MeetingFilters>) => {
    setUrlFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  return { urlFilters, setFilters: updateFilters };
}
