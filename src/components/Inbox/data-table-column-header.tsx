import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const handleSort = useCallback(() => {
    column.toggleSorting(column.getIsSorted() === 'asc');
  }, [column]);

  if (!column.getCanSort()) {
    return <div className={cn('font-semibold', className)}>{title}</div>;
  }

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className={cn('h-auto p-0 font-semibold', className)}
    >
      {title}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
