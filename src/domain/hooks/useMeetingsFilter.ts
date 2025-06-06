'use client';

import { useCallback, useEffect, useState } from 'react';

import MapOperations from '@/operations/map/MapOperations';
import { meetingRepository } from '@/repositories/meetingRepository';

import { Meeting } from '../entities/MeetingData';

export interface MeetingFilters {
  start: string;
  end: string;
  search?: string;
}

export default function useMeetingFilter() {
  const todayRange = MapOperations.initDateRange();

  const [filters, setFiltersState] = useState<MeetingFilters>(() => {
    if (typeof window === 'undefined') {
      return {
        start: todayRange.startDate,
        end: todayRange.endDate,
        search: '',
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      start: params.get('start') || todayRange.startDate,
      end: params.get('end') || todayRange.endDate,
      search: params.get('search') || '',
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const rawStart = params.get('start');
    const rawEnd = params.get('end');

    // Only rewrite if either was null/undefined
    if (rawStart === null || rawEnd === null) {
      const newParams = new URLSearchParams();
      newParams.set('start', filters.start);
      newParams.set('end', filters.end);
      if (filters.search) {
        newParams.set('search', filters.search);
      }

      const basePath = window.location.pathname;
      const qs = newParams.toString();
      const newUrl = qs ? `${basePath}?${qs}` : basePath;
      window.history.replaceState({}, '', newUrl);
    }
  }, [filters.start, filters.end, filters.search]);

  const [meetings, setMeetings] = useState<Meeting[]>([]);

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
          filters.search,
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
  }, [filters.start, filters.end, filters.search]);

  const setFilters = useCallback((newFilters: MeetingFilters) => {
    setFiltersState(newFilters);

    const params = new URLSearchParams();
    if (newFilters.start) params.set('start', newFilters.start);
    if (newFilters.end) params.set('end', newFilters.end);
    if (newFilters.search) params.set('search', newFilters.search);

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
