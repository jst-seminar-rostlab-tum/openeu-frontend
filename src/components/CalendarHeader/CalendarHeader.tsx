'use client';

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { motion } from 'framer-motion';
import {
  CalendarRange,
  Columns,
  Grid2X2,
  Grid3X3,
  LayoutList,
  List,
  Search,
} from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { DateNavigator } from '@/components/CalendarHeader/DateNavigator';
import { TodayButton } from '@/components/CalendarHeader/TodayButton';
import FilterModal from '@/components/FilterModal/FilterModal';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
  buttonHover,
  slideFromLeft,
  slideFromRight,
  transition,
} from '@/domain/animations';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import {
  GetMeetingsQueryParams,
  useCalendar,
} from '@/domain/hooks/meetingHooks';
import { TCalendarView } from '@/domain/types/calendar/types';
import { useFilteredEvents } from '@/operations/meeting/CalendarHelpers';

export const MotionButton = motion.create(Button);

export function CalendarHeader() {
  const { view, setView, filters, setFilters, selectedDate } = useCalendar();
  const events = useFilteredEvents();
  const [searchInput, setSearchInput] = useState(filters.query ?? '');

  const calculateStartDate = (start: Date, view: TCalendarView): Date => {
    switch (view) {
      case 'day':
        return startOfDay(start);
      case 'week':
        return startOfWeek(start);
      case 'month':
      default:
        return startOfMonth(start);
    }
  };

  const calculateEndDate = (start: Date, view: TCalendarView): Date => {
    switch (view) {
      case 'day':
        return endOfDay(start);
      case 'week':
        return endOfWeek(start);
      case 'month':
      default:
        return endOfMonth(start);
    }
  };

  const startDate = calculateStartDate(selectedDate, view);
  const endDate = calculateEndDate(selectedDate, view);

  const modalState: FilterModalState = {
    startDate,
    endDate,
    country: filters.country ?? undefined,
    topics: [],
  };

  const onModalChange = (newState: FilterModalState) => {
    const newFilters: GetMeetingsQueryParams = {
      ...filters,
      country: newState.country,
    };
    setFilters(newFilters);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const newFilters: GetMeetingsQueryParams = {
      ...filters,
      query: searchInput,
    };
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        className="flex items-center gap-3"
        variants={slideFromLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <TodayButton />
        <DateNavigator view={view} event={events} />
      </motion.div>

      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5"
        variants={slideFromRight}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <div className="options flex-wrap flex items-center gap-4 md:gap-2">
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search"
              className="pl-8"
              value={searchInput}
              onChange={onInputChange}
              onKeyDown={onSearch}
            />
            <Search className="absolute left-2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
          <FilterModal
            topics={[]}
            filterState={modalState}
            setFilterState={onModalChange}
          />
          <MotionButton
            variant="outline"
            asChild
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          ></MotionButton>

          <MotionButton
            variant="outline"
            onClick={() => setView('agenda')}
            asChild
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <Toggle className="relative">
              {view === 'agenda' ? (
                <>
                  <CalendarRange />
                  <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-400" />
                </>
              ) : (
                <LayoutList />
              )}
            </Toggle>
          </MotionButton>
          <ButtonGroup className="flex">
            <MotionButton
              variant={view === 'day' ? 'default' : 'outline'}
              aria-label="View by day"
              onClick={() => {
                setView('day');
              }}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <List className="h-4 w-4" />
            </MotionButton>

            <MotionButton
              variant={view === 'week' ? 'default' : 'outline'}
              aria-label="View by week"
              onClick={() => setView('week')}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Columns className="h-4 w-4" />
            </MotionButton>

            <MotionButton
              variant={view === 'month' ? 'default' : 'outline'}
              aria-label="View by month"
              onClick={() => setView('month')}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Grid3X3 className="h-4 w-4" />
            </MotionButton>
            <MotionButton
              variant={view === 'year' ? 'default' : 'outline'}
              aria-label="View by year"
              onClick={() => setView('year')}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Grid2X2 className="h-4 w-4" />
            </MotionButton>
          </ButtonGroup>
        </div>
      </motion.div>
    </div>
  );
}
