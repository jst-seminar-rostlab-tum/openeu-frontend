'use client';

import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

import { suggestionRepository } from '@/repositories/suggestionRepository';

export const useDebouncedSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 2) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await suggestionRepository.getSuggestions(input);
        setSuggestions(results);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [],
  );

  const clearSuggestions = () => setSuggestions([]);

  return {
    suggestions,
    isLoading,
    fetchSuggestions,
    clearSuggestions,
  };
};
