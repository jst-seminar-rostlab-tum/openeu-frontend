'use client';

import { motion } from 'framer-motion';
import { CalendarRange, Columns, Grid2X2, Grid3X3, Search } from 'lucide-react';
import * as React from 'react';

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
import { useCalendar } from '@/domain/hooks/meetingHooks';

export const MotionButton = motion.create(Button);

export function CalendarHeader() {
  const { view, setView, searchQuery, setSearchQuery } = useCalendar();
  const [localSearchText, setLocalSearchText] = React.useState(searchQuery);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchQuery(localSearchText);
    }
  };

  React.useEffect(() => {
    setLocalSearchText(searchQuery);
  }, [searchQuery]);

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
        <DateNavigator view={view} />
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
              value={localSearchText}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
            <Search className="absolute left-2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
          <FilterModal showDateDropdown={false} />

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
                <CalendarRange />
              )}
            </Toggle>
          </MotionButton>

          <ButtonGroup>
            <MotionButton
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
              asChild
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Toggle>
                <Grid3X3 />
              </Toggle>
            </MotionButton>
            <MotionButton
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
              asChild
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Toggle>
                <Columns />
              </Toggle>
            </MotionButton>
            <MotionButton
              variant={view === 'day' ? 'default' : 'outline'}
              onClick={() => setView('day')}
              asChild
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
            >
              <Toggle>
                <Grid2X2 />
              </Toggle>
            </MotionButton>
          </ButtonGroup>
        </div>
      </motion.div>
    </div>
  );
}
