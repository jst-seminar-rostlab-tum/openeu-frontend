'use client';

import { useCallback, useEffect, useState } from 'react';

import { meetingRepository } from '@/repositories/meetingRepository';

import { Meeting } from '../entities/MeetingData';

export interface MeetingFilters {
  start: string;
  end: string;
}

export default function useMeetingFilter() {
  const [filters, setFilters] = useState<MeetingFilters>(() => {
    const params = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : '',
    );
    const rawStart = params.get('start') || '';
    const rawEnd = params.get('end') || '';
    return { start: rawStart, end: rawEnd };
  });

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
  }, [filters.start, filters.end]);

  const updateFilters = useCallback((newFilters: MeetingFilters) => {
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.start) params.set('start', newFilters.start);
    if (newFilters.end) params.set('end', newFilters.end);

    const basePath = window.location.pathname;
    const newSearch = params.toString();
    const newUrl = newSearch ? `${basePath}?${newSearch}` : basePath;
    window.history.replaceState({}, '', newUrl);
  }, []);

  return {
    filters,
    setFilters: updateFilters,
    meetings,
  };
}
