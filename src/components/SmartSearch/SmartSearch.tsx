'use client';

import { Search } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useDebouncedSuggestions } from '@/domain/hooks/suggestionHooks';

interface SmartSearchProps {
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  value,
  onValueChange,
  onSearch,
  placeholder = 'Search...',
  isLoading,
}) => {
  const {
    suggestions,
    fetchSuggestions,
    clearSuggestions,
    isLoading: internalLoading,
  } = useDebouncedSuggestions();

  const loading = isLoading ?? internalLoading;

  const [localSearchText, setLocalSearchText] = useState(value);

  useEffect(() => {
    setLocalSearchText(value);
  }, [value]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setLocalSearchText(input);
      onValueChange(input);
      fetchSuggestions(input);
    },
    [onValueChange, fetchSuggestions],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch?.(localSearchText);
        clearSuggestions();
      }
    },
    [onSearch, localSearchText, clearSuggestions],
  );

  const onSelectSuggestion = (title: string) => {
    onValueChange(title);
    onSearch?.(title);
    clearSuggestions();
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={localSearchText}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="pl-8"
      />

      {loading && (
        <Spinner className="absolute right-8 top-2.5" size="xsmall" />
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-200 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((title, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => onSelectSuggestion(title)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
