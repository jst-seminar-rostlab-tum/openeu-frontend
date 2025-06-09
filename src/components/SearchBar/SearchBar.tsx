'use client';

import { Search } from 'lucide-react';
import type React from 'react';
import { useCallback } from 'react';

import { Input } from '@/components/ui/input';

import { Spinner } from '../ui/spinner';

interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isFetching?: boolean;
}

export function SearchBar({
  value,
  onValueChange,
  onSearch,
  placeholder,
  isFetching = false,
}: SearchBarProps) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
    },
    [onValueChange],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value);
      }
    },
    [onSearch, value],
  );

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="pl-8"
      />

      {isFetching && (
        <Spinner className="absolute right-8 top-2.5" size="xsmall" />
      )}
    </div>
  );
}
