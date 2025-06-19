import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface DateRangeFilterProps {
  from?: Date;
  to?: Date;
  onSelect?: (range: { from?: Date; to?: Date }) => void;
}

export function DateRangeFilter({ from, to, onSelect }: DateRangeFilterProps) {
  const hasDateRange = from || to;

  const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
    onSelect?.(range);
  };

  const clearFilter = () => {
    onSelect?.({});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <CalendarIcon className="h-4 w-4" />
          <span className="w-full left-3">
            {hasDateRange ? (
              <>
                {from && format(from, 'MMM dd')}
                {from && to && ' - '}
                {to && format(to, 'MMM dd')}
              </>
            ) : (
              <span>Select dates</span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{
            from: from,
            to: to,
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
