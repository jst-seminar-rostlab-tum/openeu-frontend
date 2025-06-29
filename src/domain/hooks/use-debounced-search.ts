'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useDebounce } from './use-debounce';

export interface SearchConfig {
  minQueryLength?: number;
  debounceDelay?: number;
  staleTime?: number;
  gcTime?: number;
}

export const useDebouncedSearch = <T>(
  fetchFn: (query: string) => Promise<T[]>,
  config: SearchConfig = {},
) => {
  const { minQueryLength = 2, debounceDelay = 300 } = config;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debouncedSetSearch = useDebounce((term: string) => {
    setDebouncedSearchTerm(term);
  }, debounceDelay);

  const {
    data: results = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['search', fetchFn.name, debouncedSearchTerm],
    queryFn: () => fetchFn(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= minQueryLength,
  });

  const search = (query: string) => {
    setSearchTerm(query);
    if (query.length >= minQueryLength) {
      debouncedSetSearch(query);
    } else {
      setDebouncedSearchTerm('');
    }
  };

  const clearResults = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return {
    results,
    isLoading: isLoading || isFetching,
    error: error?.message || null,
    search,
    clearResults,
    searchTerm,
    debouncedSearchTerm,
  };
};
