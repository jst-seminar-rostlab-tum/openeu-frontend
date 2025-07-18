'use client';

import { Table as ReactTable } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Eye,
  Settings2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import PersonalizeLegislationSwitch from '@/components/PersonalizeSwitch/PersonalizeLegislationSwitch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LegislativeFile,
  LegislativeFileSuggestion,
} from '@/domain/entities/monitor/generated-types';
import { useLegislativeUniqueValues } from '@/domain/hooks/legislative-hooks';
import { legislationRepository } from '@/repositories/legislationRepository';

import { SuggestedSearch } from '../SuggestedSearch/SuggestedSearch';

interface KanbanToolbarProps {
  table: ReactTable<LegislativeFile>;
  onSearchChange?: (search: string) => void;
  onCommitteeChange?: (committee: string | undefined) => void;
  onYearChange?: (year: number | undefined) => void;
  onUserIdChange?: (userId: string | undefined) => void;
  searchValue?: string;
  selectedCommittee?: string;
  selectedYear?: number;
  selectedUserId?: string;
  visibleColumns: Set<string>;
  onVisibleColumnsChange: (columns: Set<string>) => void;
  statusColumnsWithData: string[];
}

export function KanbanToolbar({
  table,
  onSearchChange,
  onCommitteeChange,
  onYearChange,
  onUserIdChange,
  searchValue = '',
  selectedCommittee,
  selectedYear,
  selectedUserId,
  visibleColumns,
  onVisibleColumnsChange,
  statusColumnsWithData,
}: KanbanToolbarProps) {
  // Local filter state
  const [localSearchText, setLocalSearchText] = useState(searchValue);
  const [committeeInput, setCommitteeInput] = useState(
    selectedCommittee || 'all',
  );
  const [yearInput, setYearInput] = useState(
    selectedYear ? String(selectedYear) : 'all',
  );

  // Fetch unique values from API
  const { data: uniqueValues } = useLegislativeUniqueValues();

  // Sync local search text with external search value
  useEffect(() => {
    setLocalSearchText(searchValue);
  }, [searchValue]);

  // Get unique values from API or fallback to empty arrays
  const committees = uniqueValues?.committees || [];
  const years = uniqueValues?.years || [];

  // Sortable columns from TanStack Table
  const sortableColumns = useMemo(() => {
    return table
      .getAllColumns()
      .filter((column) => column.getCanSort())
      .map((column) => ({
        id: column.id,
        label: (column.columnDef.header as string) || column.id,
      }));
  }, [table]);

  // Local filter handlers
  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
  };

  const handleCommitteeFilter = (value: string) => {
    setCommitteeInput(value);
    if (value === 'all') {
      onCommitteeChange?.(undefined);
    } else {
      onCommitteeChange?.(value);
    }
  };

  const handleYearFilter = (value: string) => {
    setYearInput(value);
    if (value === 'all') {
      onYearChange?.(undefined);
    } else {
      onYearChange?.(Number(value));
    }
  };

  // TanStack Table multi-sort handler - cycle through: off -> asc -> desc -> off
  const handleSort = (field: string) => {
    const column = table.getColumn(field);
    if (column) {
      const currentSort = column.getIsSorted();

      if (currentSort === false) {
        // Off -> Asc
        column.toggleSorting(false, true);
      } else if (currentSort === 'asc') {
        // Asc -> Desc
        column.toggleSorting(true, true);
      } else {
        // Desc -> Off
        column.clearSorting();
      }
    }
  };

  const handleColumnToggle = (columnId: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(columnId)) {
      newVisibleColumns.delete(columnId);
    } else {
      newVisibleColumns.add(columnId);
    }
    onVisibleColumnsChange(newVisibleColumns);
  };

  const clearAllFilters = () => {
    // Clear local filters (excluding search)
    setCommitteeInput('all');
    setYearInput('all');
    onCommitteeChange?.(undefined);
    onYearChange?.(undefined);

    table.resetSorting();

    const allColumns = new Set(statusColumnsWithData);
    onVisibleColumnsChange(allColumns);
  };

  const hasLocalFilters = !!(committeeInput !== 'all' || yearInput !== 'all');

  const sorting = table.getState().sorting;
  const hasSorting = sorting.length > 0;
  const hasHiddenColumns = statusColumnsWithData.some(
    (status) => !visibleColumns.has(status),
  );
  const hasAnyFilters = hasLocalFilters || hasSorting || hasHiddenColumns;

  const ControlsContent = () => (
    <>
      {/* Personalize Switch */}
      <PersonalizeLegislationSwitch
        onUserIdChange={onUserIdChange}
        selectedUserId={selectedUserId}
      />

      {/* Clear All Filters */}
      {hasAnyFilters && (
        <Button
          variant="link"
          onClick={clearAllFilters}
          size="sm"
          className="underline col-span-full"
        >
          Clear All
        </Button>
      )}

      {/* Sorting */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1 space-y-1">
          {sortableColumns.map((column) => {
            const tableColumn = table.getColumn(column.id);
            const currentSort = tableColumn?.getIsSorted();
            const isActive = currentSort !== false;

            const getSortIcon = () => {
              if (currentSort === 'asc') return <ArrowUp className="h-4 w-4" />;
              if (currentSort === 'desc')
                return <ArrowDown className="h-4 w-4" />;
              return <ArrowUpDown className="h-4 w-4" />;
            };

            return (
              <Button
                key={column.id}
                variant={isActive ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => handleSort(column.id)}
                className="w-full justify-start"
              >
                {getSortIcon()}
                {column.label}
                {isActive && (
                  <span className="ml-auto text-xs">
                    #{sorting.findIndex((s) => s.id === column.id) + 1}
                  </span>
                )}
              </Button>
            );
          })}
          {hasSorting && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetSorting()}
              className="w-full justify-start text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </PopoverContent>
      </Popover>

      {/* Column Visibility */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
            Columns
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60">
          {statusColumnsWithData.map((column) => (
            <DropdownMenuCheckboxItem
              key={column}
              className="capitalize"
              checked={visibleColumns.has(column)}
              onCheckedChange={() => handleColumnToggle(column)}
            >
              {column}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Committee Filter */}
      <Select value={committeeInput} onValueChange={handleCommitteeFilter}>
        <SelectTrigger className="w-full md:w-2xs col-span-full" size="sm">
          <SelectValue placeholder="All Committees" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Committees</SelectItem>
          {committees.map((committee) => (
            <SelectItem key={committee} value={committee}>
              {committee}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Filter */}
      <Select value={yearInput} onValueChange={handleYearFilter}>
        <SelectTrigger className="w-full md:w-40 col-span-full" size="sm">
          <SelectValue placeholder="All Years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <div className="flex items-center gap-2 justify-between">
      {/* Search - always visible */}
      <SuggestedSearch<LegislativeFileSuggestion>
        placeholder="Search legislation..."
        value={localSearchText}
        onValueChange={setLocalSearchText}
        onSearch={handleSearchChange}
        fetchSuggestions={(query) =>
          legislationRepository.getLegislationSuggestions({ query, limit: 5 })
        }
        getDisplayText={(legislation) => legislation.title}
        getSelectValue={(legislation) => legislation.title}
        onSelect={(legislation) => handleSearchChange(legislation.title)}
      />

      {/* Desktop Controls */}
      <div className="hidden md:flex items-center gap-2">
        <ControlsContent />
      </div>

      {/* Mobile Options Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden">
            <Settings2 className="h-4 w-4" />
            Options
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter & Sort Options</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <ControlsContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
