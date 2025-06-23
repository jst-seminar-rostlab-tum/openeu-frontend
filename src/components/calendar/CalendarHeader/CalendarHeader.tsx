'use client';

import { motion } from 'framer-motion';
import { CalendarRange, Columns, Grid2X2, Grid3X3, Search } from 'lucide-react';
import * as React from 'react';

import { DateNavigator } from '@/components/calendar/CalendarHeader/DateNavigator';
import { TodayButton } from '@/components/calendar/CalendarHeader/TodayButton';
import ExportModal from '@/components/ExportModal/ExportModal';
import FilterModal from '@/components/FilterModal/FilterModal';
import PersonalizeSwitch from '@/components/PersonalizeSwitch/PersonalizeSwitch';
import { MotionButton, TooltipButton } from '@/components/TooltipMotionButton';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  buttonHover,
  slideFromLeft,
  slideFromRight,
  transition,
} from '@/domain/animations';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';

export function CalendarHeader() {
  const { view, setView, searchQuery, setSearchQuery } = useMeetingContext();
  const [localSearchText, setLocalSearchText] = React.useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

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
          <PersonalizeSwitch />
          <FilterModal showDateDropdown={false} topics={topicLabels} />

          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Agenda View</p>
            </TooltipContent>
          </Tooltip>

          <ButtonGroup>
            <TooltipButton
              tooltipContent="Month View"
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
            </TooltipButton>

            <TooltipButton
              tooltipContent="Week View"
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
            </TooltipButton>

            <TooltipButton
              tooltipContent="Day View"
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
            </TooltipButton>
          </ButtonGroup>
          <ExportModal />
        </div>
      </motion.div>
    </div>
  );
}
