'use client';

import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';

import { useAuth } from '@/domain/hooks/useAuth';
import { suggestionRepository } from '@/repositories/suggestionRepository';

export const useDebouncedSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();

  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (input.length < 2) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await suggestionRepository.getSuggestions(
          input,
          signOut,
        );
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
