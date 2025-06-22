'use client';

import { Funnel } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import {
  DateRangeFilter,
  DateRangeFilterProps,
} from '@/components/DateRangeFilter';
import { MotionButton } from '@/components/TooltipMotionButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MultiSelect, MultiSelectRef } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { buttonHover } from '@/domain/animations';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import FilterModalOperations from '@/operations/filter-modal/FilterModalOperations';
import {
  getCurrentMonthRange,
  getSourceTableFromInstitution,
} from '@/operations/meeting/CalendarHelpers';

const { now } = getCurrentMonthRange();
interface FilterModalProps {
  topics?: string[];
  showCountryDropdown?: boolean;
  showTopicDropdown?: boolean;
  showDateDropdown?: boolean;
}

export default function FilterModal({
  topics = [],
  showCountryDropdown = true,
  showTopicDropdown = true,
  showDateDropdown = true,
}: FilterModalProps) {
  const {
    selectedCountry,
    selectedInstitutions,
    setSelectedCountry,
    setSelectedInstitutions,
    setFilters,
    filters,
  } = useMeetingContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localState, setLocalState] = useState<FilterModalState>({
    startDate: now,
    endDate: now,
    country: '',
    topics: [],
    institutions: [],
  });
  const multiSelectRef = useRef<MultiSelectRef>(null);
  const multiSelectRefInstitutions = useRef<MultiSelectRef>(null);
  const countries = FilterModalOperations.getCountries();
  const topicOptions = topics!.map((topic) => ({
    label: topic,
    value: topic,
  }));
  const institutions = FilterModalOperations.getInstitutions();

  useEffect(() => {
    if (dialogOpen) {
      // Sync localState with current context filters when dialog opens
      setLocalState({
        startDate: filters.start ? new Date(filters.start) : now,
        endDate: filters.end ? new Date(filters.end) : now,
        country: selectedCountry,
        topics: [], // Topics not synced from context yet
        institutions: selectedInstitutions,
      });
    }
  }, [
    dialogOpen,
    selectedCountry,
    selectedInstitutions,
    filters.start,
    filters.end,
  ]);

  const updateLocalState = (updates: Partial<FilterModalState>) => {
    setLocalState((prev) => ({ ...prev, ...updates }));
  };

  const handleDateChange = (range: DateRangeFilterProps) => {
    updateLocalState({ startDate: range.from, endDate: range.to });
  };

  const handleTopicsChange = (selectedTopics: string[]) => {
    updateLocalState({ topics: selectedTopics });
  };

  const handleInstitutionsChange = (selectedInstitutions: string[]) => {
    updateLocalState({ institutions: selectedInstitutions });
  };

  const handleClear = () => {
    multiSelectRef.current?.clearHandler();
    multiSelectRefInstitutions.current?.clearHandler();
    const defaultState = FilterModalOperations.getDefaultState();
    setLocalState(defaultState);
    setSelectedCountry('');
    setSelectedInstitutions([]);

    // Reset CalendarContext filters to default date range
    if (showDateDropdown) {
      setFilters({
        ...filters,
        start: (defaultState.startDate || now).toISOString(),
        end: (defaultState.endDate || now).toISOString(),
        country: undefined,
        topics: undefined,
        source_table: undefined,
      });
    } else {
      setFilters({
        ...filters,
        country: undefined,
        source_table: undefined,
      });
    }
  };

  const handleApply = () => {
    setSelectedCountry(localState.country || '');
    setSelectedInstitutions(localState.institutions || []);
    // Update CalendarContext filters with new date range
    if (localState.startDate && localState.endDate && showDateDropdown) {
      setFilters({
        ...filters,
        start: localState.startDate.toISOString(),
        end: localState.endDate.toISOString(),
        country: localState.country || undefined,
        topics: localState.topics?.length ? localState.topics : undefined,
        source_table: localState.institutions?.length
          ? localState.institutions.map(getSourceTableFromInstitution)
          : undefined,
      });
    } else {
      setFilters({
        ...filters,
        country: localState.country || undefined,
        topics: localState.topics || undefined,
        source_table: localState.institutions?.length
          ? localState.institutions.map(getSourceTableFromInstitution)
          : undefined,
      });
    }

    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <MotionButton
          variant="outline"
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          size="icon"
        >
          <Funnel className="h-5 w-5 pointer-events-none" />
        </MotionButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Filter events</DialogTitle>
          <DialogDescription>
            Filter all events and meetings by your preference profile.
          </DialogDescription>
        </DialogHeader>
        {showDateDropdown && (
          <div className="relative z-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DateRangeFilter
                from={localState.startDate}
                to={localState.endDate}
                onSelect={handleDateChange}
              />
            </div>
          </div>
        )}
        <div
          className={`grid gap-4 ${showCountryDropdown ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
        >
          {showCountryDropdown && (
            <Select
              onValueChange={(value) => updateLocalState({ country: value })}
              value={localState.country ?? ''}
            >
              <SelectTrigger className="w-full !h-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="dark:bg-black dark:text-white">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {showTopicDropdown && (
            <MultiSelect
              ref={multiSelectRef}
              options={topicOptions}
              value={localState.topics}
              defaultValue={localState.topics}
              onValueChange={handleTopicsChange}
              placeholder="Topics"
              variant="inverted"
              maxCount={1}
              className={showCountryDropdown ? '' : '!w-full'}
              modalPopover={true}
            />
          )}
          <MultiSelect
            ref={multiSelectRefInstitutions}
            options={institutions}
            value={localState.institutions}
            defaultValue={localState.institutions}
            onValueChange={handleInstitutionsChange}
            placeholder="Institutions"
            variant="inverted"
            modalPopover={true}
            maxCount={1}
          />
        </div>
        <DialogFooter className="!flex-row !justify-between">
          <Button variant="link" onClick={handleClear} className="underline">
            Clear Filter
          </Button>
          <div className="flex flex-row gap-2">
            <Button onClick={() => setDialogOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleApply}>
              <Funnel />
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
