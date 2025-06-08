'use client';
import { useCallback, useEffect, useState } from 'react';

import MapOperations from '@/operations/map/MapOperations';

export interface MeetingFilters {
  start: string;
  end: string;
  query?: string;
}

export default function useMeetingFilter() {
  const { startDate, endDate } = MapOperations.getCurrentWeekRange();
  const defaultFilters: MeetingFilters = {
    start: MapOperations.dateToISOString(startDate),
    end: MapOperations.dateToISOString(endDate),
    query: '',
  };

  const [filters, setFiltersState] = useState<MeetingFilters>(() => {
    if (typeof window === 'undefined') return defaultFilters;

    const params = new URLSearchParams(window.location.search);
    return {
      start: params.get('start') ?? defaultFilters.start,
      end: params.get('end') ?? defaultFilters.end,
      query: params.get('query') ?? defaultFilters.query,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();
    params.set('start', filters.start);
    params.set('end', filters.end);
    if (filters.query) params.set('query', filters.query);

    const newUrl = [window.location.pathname, params.toString()]
      .filter(Boolean)
      .join('?');

    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const setFilters = useCallback((updates: Partial<MeetingFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...updates }));
  }, []);

  return { filters, setFilters };
}
