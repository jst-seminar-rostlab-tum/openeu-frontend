'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { GetMeetingsQueryParams } from './meetingHooks';

interface UrlState {
  selectedTopics: string[];
  searchQuery: string;
  selectedCountry: string;
  startDate: Date | null;
  endDate: Date | null;
}

/**
 * URL state management hook following Next.js App Router best practices
 * Implements single source of truth pattern from Medium article
 * @see https://nextjs.org/docs/app/api-reference/functions/use-search-params
 */
export function useUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Reactive URL state parsing with validation (Medium article pattern)
  const urlState = useMemo((): UrlState => {
    const searchQuery = searchParams.get('q') || '';
    const selectedCountry = searchParams.get('country') || '';
    const selectedTopics = searchParams.get('topics')
      ? searchParams.get('topics')!.split(',').filter(Boolean)
      : [];

    // Safe date parsing with validation (prevents crashes from malformed URLs)
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    try {
      const startParam = searchParams.get('start');
      const endParam = searchParams.get('end');

      if (startParam) {
        const parsed = new Date(startParam);
        startDate = isValidDate(parsed) ? parsed : null;
      }

      if (endParam) {
        const parsed = new Date(endParam);
        endDate = isValidDate(parsed) ? parsed : null;
      }
    } catch (error) {
      console.warn('Invalid date parameters in URL, using defaults:', error);
    }

    return {
      searchQuery,
      selectedCountry,
      startDate,
      endDate,
      selectedTopics,
    };
  }, [searchParams]);

  // Batched URL update function (prevents multiple router.replace calls)
  const syncFiltersToUrl = useCallback(
    (filters: GetMeetingsQueryParams) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Batch all parameter updates into single operation
      const updates = {
        q: filters.query || null,
        country: filters.country || null,
        start: filters.start || null,
        end: filters.end || null,
      };

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      // Use router.replace to avoid polluting browser history (Next.js best practice)
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.replace(`${window.location.pathname}${query}`, { scroll: false });
    },
    [searchParams, router],
  );

  return {
    urlState,
    syncFiltersToUrl,
  };
}

/**
 * Utility function for safe date validation
 * Prevents Invalid Date objects from crashing the app
 */
function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
