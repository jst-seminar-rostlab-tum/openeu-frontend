'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FiFilter } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface MultiSelectRef {
  clearHandler: () => void;
}

export interface FilterModalStateProps {
  startDate: Date;
  endDate: Date;
  country: string;
  topics: string[];
}

interface FilterModalProps {
  topics: string[];
  filterState: FilterModalStateProps;
  setFilterState: (newState: FilterModalStateProps) => void;
}

const countries = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

export default function FilterModal({
  topics,
  filterState,
  setFilterState,
}: FilterModalProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localState, setLocalState] =
    useState<FilterModalStateProps>(filterState);

  const multiSelectRef = useRef<MultiSelectRef>(null);

  useEffect(() => {
    if (!dialogOpen) {
      return;
    }
    setLocalState(filterState);
  }, [dialogOpen, filterState]);

  const handleApply = () => {
    setFilterState(localState);
    setDialogOpen(false);
  };

  const topicOptions = topics.map((topic) => ({
    label: topic,
    value: topic,
  }));

  const handleTopicChange = (updatedTopics: string[]) => {
    setLocalState({ ...localState, topics: updatedTopics });
  };

  const handleCountryChange = (newCountry: string) => {
    setLocalState({ ...localState, country: newCountry });
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleClear = () => {
    const clearedState: FilterModalStateProps = {
      startDate: new Date(),
      endDate: new Date(),
      country: '',
      topics: [],
    };

    if (multiSelectRef.current) {
      multiSelectRef.current.clearHandler();
    }

    setLocalState(clearedState);
  };

  const handleStartDateChange = (newStartDate: Date) => {
    setLocalState((prevState) => ({ ...prevState, startDate: newStartDate }));

    if (localState.endDate <= newStartDate) {
      setLocalState((prevState) => ({ ...prevState, endDate: newStartDate }));
    }
  };

  const handleEndDateChange = (newEndDate: Date) => {
    if (newEndDate <= localState.startDate) {
      alert('End date must be after start date.');
      return;
    }

    setLocalState((prevState) => ({ ...prevState, endDate: newEndDate }));
  };

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-[36px]">
            <FiFilter />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-[38vw] min-w-lg">
          <DialogHeader>
            <DialogTitle>Filter events</DialogTitle>
            <DialogDescription>
              Filter all events and meetings by your preference profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 pb-[0px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <div
                className="w-[280px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <DatePicker
                  date={localState.startDate}
                  onSelect={handleStartDateChange}
                />
              </div>
              <div
                className="w-[280px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <DatePicker
                  date={localState.endDate}
                  onSelect={handleEndDateChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="w-[280px] h-[40px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <Select
                  onValueChange={handleCountryChange}
                  value={localState.country}
                >
                  <SelectTrigger className="w-[280px] !h-[40px] dark:bg-black dark:text-white py-0">
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
              </div>
              <div
                className="w-[280px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <MultiSelect
                  ref={multiSelectRef}
                  className="w-[280px]"
                  options={topicOptions}
                  value={localState.topics}
                  defaultValue={localState.topics}
                  onValueChange={handleTopicChange}
                  placeholder="Topics"
                  variant="inverted"
                  maxCount={1}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button className="w-[80px]" variant="link" onClick={handleClear}>
                Clear Filter
              </Button>
              <div className="flex flex-row gap-2">
                <Button
                  className="w-[60px] bg-background border-1 border-slate-200 text-black hover:bg-black hover:text-white font-normal dark:bg-black dark:text-white dark:hover:bg-slate-800 dark:hover:text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="w-[85px] font-normal dark:bg-white dark:text-black"
                  onClick={handleApply}
                >
                  <FiFilter />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
