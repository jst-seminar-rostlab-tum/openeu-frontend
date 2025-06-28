'use client';

import { Search } from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import {
  type SearchConfig,
  useDebouncedSearch,
} from '@/domain/hooks/use-debounced-search';

export interface SuggestedSearchProps<T> {
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelect?: (item: T) => void;
  placeholder?: string;
  isLoading?: boolean;
  fetchSuggestions: (query: string) => Promise<T[]>;
  getDisplayText: (item: T) => string;
  getSelectValue: (item: T) => string;
  searchConfig?: SearchConfig;
  suggestionsLabel?: string;
  className?: string;
}

export function SuggestedSearch<T>({
  value,
  onValueChange,
  onSearch,
  onSelect,
  placeholder = 'Search...',
  isLoading: externalLoading,
  fetchSuggestions,
  getDisplayText,
  getSelectValue,
  searchConfig,
  suggestionsLabel = 'Suggestions',
  className,
}: SuggestedSearchProps<T>) {
  const {
    results: suggestions,
    search,
    clearResults,
    isLoading: internalLoading,
    error,
  } = useDebouncedSearch(fetchSuggestions, searchConfig);

  const loading = externalLoading ?? internalLoading;
  const [localSearchText, setLocalSearchText] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setLocalSearchText(input);
      setHighlightedIndex(-1);
      onValueChange(input);
      search(input);
      setOpen(input.length >= (searchConfig?.minQueryLength ?? 2));
    },
    [onValueChange, search, searchConfig?.minQueryLength],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, suggestions.length - 1),
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem =
          highlightedIndex >= 0 && suggestions[highlightedIndex];

        if (selectedItem) {
          const selectedValue = getSelectValue(selectedItem);
          setLocalSearchText(selectedValue);
          onValueChange(selectedValue);
          onSelect?.(selectedItem);
          onSearch?.(selectedValue);
        } else {
          onSearch?.(localSearchText);
        }

        clearResults();
        setOpen(false);
      } else if (e.key === 'Escape') {
        clearResults();
        setOpen(false);
      }
    },
    [
      highlightedIndex,
      suggestions,
      localSearchText,
      onSearch,
      onValueChange,
      onSelect,
      getSelectValue,
      clearResults,
    ],
  );

  const onSelectSuggestion = (item: T) => {
    const selectedValue = getSelectValue(item);
    setLocalSearchText(selectedValue);
    onValueChange(selectedValue);
    onSelect?.(item);
    onSearch?.(selectedValue);
    clearResults();
    setOpen(false);
  };

  return (
    <div className={`relative ${className || ''}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />

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
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
          side="bottom"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-60 overflow-y-auto">
            {error && <div className="p-2 text-sm text-red-600">{error}</div>}
            {suggestions.length > 0 && !error && (
              <div className="p-1">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  {suggestionsLabel}
                </div>
                {suggestions.map((item, i) => (
                  <div
                    key={i}
                    className={`flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ${
                      i === highlightedIndex
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => onSelectSuggestion(item)}
                  >
                    <span className="truncate">{getDisplayText(item)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
