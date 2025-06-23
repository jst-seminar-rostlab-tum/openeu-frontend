'use client';

import React, { useCallback, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useDebouncedSuggestions } from '@/domain/hooks/suggestionHooks';

interface SuggestedSearchProps {
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SuggestedSearch({
  value,
  onValueChange,
  onSearch,
  placeholder = 'Search...',
  isLoading,
}: SuggestedSearchProps) {
  const {
    suggestions,
    fetchSuggestions,
    clearSuggestions,
    isLoading: internalLoading,
  } = useDebouncedSuggestions();

  const loading = isLoading ?? internalLoading;
  const [localSearchText, setLocalSearchText] = useState(value);
  const [open, setOpen] = useState(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      setLocalSearchText(input);
      onValueChange(input);
      fetchSuggestions(input);

      // Automatically show dropdown if input is long enough
      setOpen(input.length >= 2);
    },
    [onValueChange, fetchSuggestions],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch?.(localSearchText);
        clearSuggestions();
        setOpen(false); // Close the popover
      }
    },
    [onSearch, localSearchText, clearSuggestions],
  );

  const onSelectSuggestion = (title: string) => {
    setLocalSearchText(title);
    onValueChange(title);
    onSearch?.(title);
    clearSuggestions();
    setOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
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
        >
          <div className="max-h-60 overflow-y-auto">
            {suggestions.length > 0 && (
              <div className="p-1">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  Suggestions
                </div>
                {suggestions.map((title, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onSelectSuggestion(title)}
                  >
                    <span className="truncate">{title}</span>
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
