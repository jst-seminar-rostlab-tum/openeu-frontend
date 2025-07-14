import { Column } from '@tanstack/react-table';

import { DateRangeFilterProps } from '@/components/DateRangeFilter';

export default class ToolbarOperations {
  static handleDateRangeChange<TData, TValue>(column?: Column<TData, TValue>) {
    return (range: DateRangeFilterProps) => {
      if (range.from || range.to) {
        column?.setFilterValue(range);
      } else {
        column?.setFilterValue(undefined);
      }
    };
  }

  static formatColumnDisplayName(columnId: string): string {
    return columnId
      .replace(/^is_([a-z])/, (_, firstLetter) => firstLetter.toUpperCase())
      .replace(/_([a-z])/g, (_, letter) => ` ${letter.toUpperCase()}`)
      .replace(/^[a-z]/, (letter) => letter.toUpperCase());
  }
}
