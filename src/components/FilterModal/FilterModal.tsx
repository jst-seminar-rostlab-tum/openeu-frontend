'use client';

import React, { useEffect, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterModalStateProps {
  startDate: Date;
  endDate: Date;
  country: string;
  topic: string;
}

interface FilterModalProps {
  topics: string[];
  filterState: FilterModalStateProps;
  setFilterState: () => void;
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

  const handleApply = () => {
    setFilterState(localState);
    setDialogOpen(false);
  };

  const handleTopicChange = (newTopic: string) => {
    const updatedState = { ...localState, topic: newTopic };
    setLocalState(updatedState);
  };

  const handleCountryChange = (newCountry: string) => {
    const updatedState = { ...localState, country: newCountry };
    setLocalState(updatedState);
  };

  const handleCancel = () => {
    setLocalState(filterState);
    setDialogOpen(false);
  };

  const clearFilter = () => {
    const clearedState = {
      startDate: new Date(),
      endDate: new Date(),
      country: '',
      topic: '',
    };

    setLocalState(clearedState);
    setFilterState(clearedState);
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

  useEffect(() => {
    setLocalState(filterState);
  }, [filterState]);
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
                  onChange={handleStartDateChange}
                />
              </div>
              <div
                className="w-[280px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <DatePicker
                  date={localState.endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="w-[280px] rounded-md dark:bg-black dark:text-white"
                style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}
              >
                <Select
                  onValueChange={handleCountryChange}
                  value={localState.country}
                >
                  <SelectTrigger className="w-[280px] dark:bg-black dark:text-white">
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
                <Select
                  onValueChange={handleTopicChange}
                  value={localState.topic}
                >
                  <SelectTrigger className="w-[280px] dark:bg-black dark:text-white">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-black dark:text-white">
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-between">
              <Button className="w-[80px]" variant="link" onClick={clearFilter}>
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
