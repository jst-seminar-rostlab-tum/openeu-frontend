'use client';

import { enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { CustomComponents } from 'react-day-picker';
import { DayPicker as ReactDayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TDayPickerProps = ComponentProps<typeof ReactDayPicker>;

function DayPicker({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: TDayPickerProps) {
  return (
    <ReactDayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col select-none sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',

        caption: 'flex justify-center pt-1 relative items-center capitalize',
        caption_label: 'text-sm font-medium',

        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        head_row: 'flex',
        head_cell: 'w-9 font-medium text-sm capitalize',
        row: 'flex w-full mt-2',

        cell: cn(
          'size-9 flex items-center justify-center text-t-secondary text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
          '[&:has([aria-selected].day-range-end)]:rounded-r-lg last:[&:has([aria-selected])]:rounded-r-lg first:[&:has([aria-selected])]:rounded-l-lg [&:has([aria-selected])]:bg-bg-secondary',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8.5 p-0 font-normal aria-selected:opacity-100',
        ),
        day_selected:
          'bg-primary text-white dark:text-black dark:hover:!text-white',
        day_today: 'text-red-600',
        day_outside: 'opacity-50 aria-selected:opacity-40',
        day_range_middle:
          'aria-selected:bg-bg-secondary aria-selected:text-t-primary',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={
        {
          IconLeft: () => <ChevronLeft className="size-4" />,
          IconRight: () => <ChevronRight className="size-4" />,
        } as Partial<CustomComponents>
      }
      locale={enUS}
      {...props}
    />
  );
}

export { DayPicker };
