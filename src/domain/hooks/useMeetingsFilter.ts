'use client';

import { useCallback, useEffect, useState } from 'react';

import MapOperations from '@/operations/map/MapOperations';
import { meetingRepository } from '@/repositories/meetingRepository';

import { MeetingData } from '../entities/calendar/MeetingData';

export interface MeetingFilters {
  start: string;
  end: string;
  query?: string;
}

export default function useMeetingFilter() {
  const todayRange = MapOperations.initDateRange();

  const [filters, setFiltersState] = useState<MeetingFilters>(() => {
    if (typeof window === 'undefined') {
      return {
        start: todayRange.startDate,
        end: todayRange.endDate,
        query: '',
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      start: params.get('start') || todayRange.startDate,
      end: params.get('end') || todayRange.endDate,
      query: params.get('query') || '',
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const rawStart = params.get('start');
    const rawEnd = params.get('end');

    if (rawStart === null || rawEnd === null) {
      const newParams = new URLSearchParams();
      newParams.set('start', filters.start);
      newParams.set('end', filters.end);
      if (filters.query) {
        newParams.set('query', filters.query);
      }

      const basePath = window.location.pathname;
      const qs = newParams.toString();
      const newUrl = qs ? `${basePath}?${qs}` : basePath;
      window.history.replaceState({}, '', newUrl);
    }
  }, [filters.start, filters.end, filters.query]);

  const [meetings, setMeetings] = useState<MeetingData[]>([]);

  useEffect(() => {
    let cancelled = false;

    if (!filters.start || !filters.end) {
      setMeetings([]);
      return;
    }

    (async () => {
      try {
        const data = await meetingRepository.getMeetings(
          filters.start,
          filters.end,
          filters.query,
        );
        if (!cancelled) {
          setMeetings(data);
        }
      } catch (err) {
        console.error('Error fetching meetings:', err);
        if (!cancelled) {
          setMeetings([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filters.start, filters.end, filters.query]);

  const setFilters = useCallback((newFilters: MeetingFilters) => {
    setFiltersState(newFilters);

    const params = new URLSearchParams();
    if (newFilters.start) params.set('start', newFilters.start);
    if (newFilters.end) params.set('end', newFilters.end);
    if (newFilters.query) params.set('query', newFilters.query);

    const basePath = window.location.pathname;
    const qs = params.toString();
    const newUrl = qs ? `${basePath}?${qs}` : basePath;
    window.history.replaceState({}, '', newUrl);
  }, []);

  return {
    filters,
    setFilters,
    meetings,
  };
}
