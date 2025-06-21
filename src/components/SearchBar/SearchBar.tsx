'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';
import type React from 'react';
import { useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

const searchBarVariants = cva('relative flex items-center', {
  variants: {
    size: {
      default: 'h-9',
      sm: 'h-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const searchIconVariants = cva(
  'absolute text-muted-foreground pointer-events-none',
  {
    variants: {
      size: {
        default: 'left-2.5 h-4 w-4',
        sm: 'left-2 h-3.5 w-3.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const searchInputVariants = cva('', {
  variants: {
    size: {
      default: 'pl-8 h-9',
      sm: 'pl-7 h-8 text-sm',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const spinnerVariants = cva('absolute', {
  variants: {
    size: {
      default: 'right-2.5',
      sm: 'right-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface SearchBarProps extends VariantProps<typeof searchBarVariants> {
  value: string;
  onValueChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isFetching?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onValueChange,
  onSearch,
  placeholder,
  isFetching = false,
  size = 'default',
  className,
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
    <div className={cn(searchBarVariants({ size }), className)}>
      <Search className={cn(searchIconVariants({ size }))} />
      <Input
        type="search"
        placeholder={placeholder || 'Search...'}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={cn(searchInputVariants({ size }))}
      />
      {isFetching && (
        <Spinner className={cn(spinnerVariants({ size }))} size="xsmall" />
      )}
    </div>
  );
}
