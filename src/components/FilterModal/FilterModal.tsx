'use client';

import { Funnel } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { getCurrentMonthRange } from '@/app/dateRange';
import { MotionButton } from '@/components/CalendarHeader/CalendarHeader';
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
import { buttonHover } from '@/domain/animations';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { useCalendar } from '@/domain/hooks/meetingHooks';
import FilterModalOperations from '@/operations/filter-modal/FilterModalOperations';
import { filterByCountry } from '@/operations/meeting/CalendarHelpers';
const { now } = getCurrentMonthRange();
interface FilterModalProps {
  topics?: string[];
  showCountryDropdown?: boolean;
  showDateDropdown?: boolean;
}

export default function FilterModal({
  topics = [],
  showCountryDropdown = true,
  showDateDropdown = true,
}: FilterModalProps) {
  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: now,
    endDate: now,
    country: '',
    topics: [],
  });
  const { events, setEvents } = useCalendar();
  const initialEventsRef = useRef<MeetingData[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [localState, setLocalState] = useState<FilterModalState>(
    FilterModalOperations.getDefaultState(),
  );
  const multiSelectRef = useRef<MultiSelectRef>(null);
  const countries = FilterModalOperations.getCountries();
  const topicOptions = topics!.map((topic) => ({
    label: topic,
    value: topic,
  }));

  useEffect(() => {
    if (dialogOpen) {
      setLocalState(filterState);
    }
  }, [dialogOpen, filterState]);

  useEffect(() => {
    if (events.length && initialEventsRef.current.length === 0) {
      initialEventsRef.current = events;
    }
  }, [events]);

  const updateLocalState = (updates: Partial<FilterModalState>) => {
    setLocalState((prev) => ({ ...prev, ...updates }));
  };

  const handleStartDateChange = (newStartDate: Date) => {
    const updates: Partial<FilterModalState> = { startDate: newStartDate };

    if ((localState.endDate ?? newStartDate) <= newStartDate) {
      updates.endDate = newStartDate;
    }
    if (localState.endDate && localState.endDate <= newStartDate) {
      updates.endDate = newStartDate;
    }
    updateLocalState(updates);
  };

  const handleEndDateChange = (newEndDate: Date) => {
    if (
      !localState.startDate ||
      !newEndDate ||
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
    setEvents(initialEventsRef.current);
  };

  const handleApply = () => {
    setFilterState(localState);
    const filtered = filterByCountry(
      initialEventsRef.current,
      localState.country ?? '',
    );
    setEvents(filtered);
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
        >
          <Funnel className="h-5 w-5" />
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
              <DatePicker
                date={localState.startDate}
                onSelect={handleStartDateChange}
              />
              <DatePicker
                date={localState.endDate}
                onSelect={handleEndDateChange}
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
