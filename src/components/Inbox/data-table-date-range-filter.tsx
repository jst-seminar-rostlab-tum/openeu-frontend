import { Column } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface DataTableDateRangeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableDateRangeFilter<TData, TValue>({
  column,
  title,
}: DataTableDateRangeFilterProps<TData, TValue>) {
  const [dateRange, setDateRange] = React.useState<{
    from?: Date;
    to?: Date;
  }>({});

  const filterValue = column?.getFilterValue() as
    | { from?: Date; to?: Date }
    | undefined;

  React.useEffect(() => {
    if (filterValue) {
      setDateRange(filterValue);
    } else {
      setDateRange({});
    }
  }, [filterValue]);

  const hasDateRange = dateRange.from || dateRange.to;

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    setDateRange(range);
    if (range.from || range.to) {
      column?.setFilterValue(range);
    } else {
      column?.setFilterValue(undefined);
    }
  };

  const clearFilter = () => {
    setDateRange({});
    column?.setFilterValue(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <CalendarIcon className="h-4 w-4" />
          {title}
          {hasDateRange && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="font-normal">
                {dateRange.from && format(dateRange.from, 'MMM dd')}
                {dateRange.from && dateRange.to && ' - '}
                {dateRange.to && format(dateRange.to, 'MMM dd')}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from: dateRange.from,
            to: dateRange.to,
          }}
          onSelect={(range) => {
            handleDateRangeChange({
              from: range?.from,
              to: range?.to,
            });
          }}
        />
        {hasDateRange && (
          <Button
            variant="ghost"
            onClick={clearFilter}
            className="w-full justify-center text-center underline"
          >
            Clear dates
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
