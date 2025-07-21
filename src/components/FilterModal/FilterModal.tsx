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
  useWeekDefault?: boolean;
}

export default function FilterModal({
  topics = [],
  showCountryDropdown = true,
  showTopicDropdown = true,
  showDateDropdown = true,
  useWeekDefault = false,
}: FilterModalProps) {
  const {
    selectedCountries,
    selectedTopics,
    setSelectedTopics,
    selectedInstitutions,
    setSelectedCountries,
    setSelectedInstitutions,
    setFilters,
    filters,
  } = useMeetingContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localState, setLocalState] = useState<FilterModalState>({
    startDate: now,
    endDate: now,
    countries: [],
    topics: [],
    institutions: [],
  });
  const multiSelectRef = useRef<MultiSelectRef>(null);
  const multiSelectRefInstitutions = useRef<MultiSelectRef>(null);
  const multiSelectRefCountries = useRef<MultiSelectRef>(null);
  const countries = FilterModalOperations.getCountries();
  const topicOptions = topics!.map((topic) => ({
    label: topic,
    value: topic,
  }));
  const countryOptions = countries!.map((country) => ({
    label: country,
    value: country,
  }));
  const institutions = FilterModalOperations.getInstitutions();

  useEffect(() => {
    if (dialogOpen) {
      // Sync localState with current context filters when dialog opens
      setLocalState({
        startDate: filters.start ? new Date(filters.start) : now,
        endDate: filters.end ? new Date(filters.end) : now,
        countries: selectedCountries || [],
        topics: selectedTopics || [],
        institutions: selectedInstitutions,
      });
    }
  }, [
    dialogOpen,
    selectedCountries,
    selectedInstitutions,
    selectedTopics,
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

  const handleCountriesChange = (selectedCountries: string[]) => {
    updateLocalState({ countries: selectedCountries });
  };

  const handleInstitutionsChange = (selectedInstitutions: string[]) => {
    updateLocalState({ institutions: selectedInstitutions });
  };

  const handleClear = () => {
    multiSelectRef.current?.clearHandler();
    multiSelectRefInstitutions.current?.clearHandler();
    multiSelectRefCountries.current?.clearHandler();
    const defaultState = FilterModalOperations.getDefaultState(useWeekDefault);
    setLocalState(defaultState);
    setSelectedCountries([]);
    setSelectedTopics([]);
    setSelectedInstitutions([]);

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
        topics: undefined,
        source_table: undefined,
      });
    }
  };

  const handleApply = () => {
    setSelectedCountries(localState.countries || []);
    console.log('selected countries: ', localState.countries);
    setSelectedTopics(localState.topics || []);
    setSelectedInstitutions(localState.institutions || []);
    // Update CalendarContext filters with new date range
    if (localState.startDate && localState.endDate && showDateDropdown) {
      setFilters({
        ...filters,
        start: localState.startDate.toISOString(),
        end: localState.endDate.toISOString(),
        country: localState.countries?.length
          ? localState.countries
          : undefined,
        topics: localState.topics?.length ? localState.topics : undefined,
        source_table: localState.institutions?.length
          ? localState.institutions.map(getSourceTableFromInstitution)
          : undefined,
      });
    } else {
      setFilters({
        ...filters,
        country: localState.countries?.length
          ? localState.countries
          : undefined,
        topics: localState.topics?.length ? localState.topics : undefined,
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
            <MultiSelect
              ref={multiSelectRefCountries}
              options={countryOptions}
              value={localState.countries}
              defaultValue={localState.countries}
              onValueChange={handleCountriesChange}
              placeholder="Countries"
              variant="inverted"
              maxCount={1}
              className={showTopicDropdown ? '' : '!w-full'}
              modalPopover={true}
            />
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
