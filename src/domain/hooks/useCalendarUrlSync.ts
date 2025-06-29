'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { getInstitutionFromSourceTable } from '@/operations/meeting/CalendarHelpers';

import { TCalendarView } from '../entities/calendar/CalendarTypes';
import { GetMeetingsQueryParams } from './meetingHooks';

const CALENDAR_VIEWS = new Set<TCalendarView>([
  'day',
  'week',
  'month',
  'year',
  'agenda',
] as const);

/**
 * Validates and sanitizes calendar view parameter
 * @param viewParam - Raw view parameter from URL
 * @returns Valid TCalendarView with fallback to 'month'
 */
function validateCalendarView(viewParam: string | null): TCalendarView {
  return CALENDAR_VIEWS.has(viewParam as TCalendarView)
    ? (viewParam as TCalendarView)
    : 'month';
}

interface UrlState {
  selectedTopics: string[];
  searchQuery: string;
  selectedCountry: string;
  selectedInstitutions: string[];
  startDate: Date | null;
  endDate: Date | null;
  view: TCalendarView;
}

interface UrlSyncOptions {
  excludeParams?: string[];
}

/**
 * URL state management hook following Next.js App Router best practices
 * Implements single source of truth pattern from Medium article
 * @see https://nextjs.org/docs/app/api-reference/functions/use-search-params
 */
export function useUrlSync(options: UrlSyncOptions = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { excludeParams = [] } = options;

  // Reactive URL state parsing with validation (Medium article pattern)
  const urlState = useMemo((): UrlState => {
    const searchQuery = searchParams.get('q') || '';
    const selectedCountry = searchParams.get('country') || '';
    const selectedTopics = searchParams.get('topics')
      ? searchParams.get('topics')!.split(',').filter(Boolean)
      : [];
    const selectedInstitutions = searchParams.get('source_table')
      ? searchParams
          .get('source_table')!
          .split(',')
          .filter(Boolean)
          .map(getInstitutionFromSourceTable)
      : [];

    // Parse and validate view parameter with fallback
    const view = validateCalendarView(searchParams.get('view'));

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
      selectedInstitutions,
      view,
    };
  }, [searchParams]);

  // Batched URL update function (prevents multiple router.replace calls)
  const syncFiltersToUrl = useCallback(
    (filters: NonNullable<GetMeetingsQueryParams>, view?: TCalendarView) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      // Batch all parameter updates into single operation
      const updates: Record<string, string | null> = {
        q: filters.query || null,
        country: filters.country || null,
        start: filters.start || null,
        end: filters.end || null,
        view: view || null,
        topics:
          filters.topics && filters.topics.length > 0
            ? filters.topics.join(',')
            : null,
        source_table:
          filters.source_table && filters.source_table.length > 0
            ? filters.source_table.join(',')
            : null,
      };

      // Apply excludeParams filter
      excludeParams.forEach((param) => {
        delete updates[param];
        current.delete(param);
      });

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
      router.replace(`${pathname}${query}`, { scroll: false });
    },
    [searchParams, router, pathname, excludeParams],
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
