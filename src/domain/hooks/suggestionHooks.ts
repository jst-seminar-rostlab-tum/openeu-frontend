'use client';

import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

import { suggestionRepository } from '@/repositories/suggestionRepository';

export const useDebouncedSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 2) {
        setSuggestions([]);
        return;
      }

      const results = await suggestionRepository.getSuggestions(input);
      setSuggestions(results);
    }, 300),
    [],
  );

  const clearSuggestions = () => setSuggestions([]);

  return {
    suggestions,
    fetchSuggestions,
    clearSuggestions,
  };
};
