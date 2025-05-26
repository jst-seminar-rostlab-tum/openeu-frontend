'use client';

import { Funnel } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
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
import { FilterModalState } from '@/domain/entities/FilterModalState';
import FilterModalOperations from '@/operations/filter-modal/FilterModalOperations';

interface FilterModalProps {
  topics: string[];
  filterState: FilterModalState;
  setFilterState: (newState: FilterModalState) => void;
  showCountryDropdown?: boolean;
}

export default function FilterModal({
  topics,
  filterState,
  setFilterState,
  showCountryDropdown = true,
}: FilterModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localState, setLocalState] = useState<FilterModalState>(filterState);
  const multiSelectRef = useRef<MultiSelectRef>(null);

  const countries = FilterModalOperations.getCountries();
  const topicOptions = topics.map((topic) => ({
    label: topic,
    value: topic,
  }));

  useEffect(() => {
    if (dialogOpen) {
      setLocalState(filterState);
    }
  }, [dialogOpen, filterState]);

  const updateLocalState = (updates: Partial<FilterModalState>) => {
    setLocalState((prev) => ({ ...prev, ...updates }));
  };

  const handleStartDateChange = (newStartDate: Date) => {
    const updates: Partial<FilterModalState> = { startDate: newStartDate };

    if (localState.endDate <= newStartDate) {
      updates.endDate = newStartDate;
    }

    updateLocalState(updates);
  };

  const handleEndDateChange = (newEndDate: Date) => {
    if (
      !FilterModalOperations.validateDateRange(localState.startDate, newEndDate)
    ) {
      console.error('End date must be after start date.');
      return;
    }

    updateLocalState({ endDate: newEndDate });
  };

  const handleTopicsChange = (selectedTopics: string[]) => {
    updateLocalState({ topics: selectedTopics });
  };

  const handleClear = () => {
    multiSelectRef.current?.clearHandler();
    setLocalState(FilterModalOperations.getDefaultState());
  };

  const handleApply = () => {
    setFilterState(localState);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Funnel />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Filter events</DialogTitle>
          <DialogDescription>
            Filter all events and meetings by your preference profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            date={localState.startDate}
            onSelect={handleStartDateChange}
          />
          <DatePicker
            date={localState.endDate}
            onSelect={handleEndDateChange}
          />
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
