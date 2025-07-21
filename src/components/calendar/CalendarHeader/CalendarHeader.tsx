'use client';

import { motion } from 'framer-motion';
import { Columns, Grid2X2, Grid3X3 } from 'lucide-react';
import * as React from 'react';

import { DateNavigator } from '@/components/calendar/CalendarHeader/DateNavigator';
import { TodayButton } from '@/components/calendar/CalendarHeader/TodayButton';
import ExportModal from '@/components/ExportModal/ExportModal';
import FilterModal from '@/components/FilterModal/FilterModal';
import PersonalizeMeetingSwitch from '@/components/PersonalizeSwitch/PersonalizeMeetingSwitch';
import { SuggestedSearch } from '@/components/SuggestedSearch/SuggestedSearch';
import { TooltipButton } from '@/components/TooltipMotionButton';
import { Badge } from '@/components/ui/badge';
import { ButtonGroup } from '@/components/ui/button-group';
import { Toggle } from '@/components/ui/toggle';
import {
  buttonHover,
  slideFromLeft,
  slideFromRight,
  transition,
} from '@/domain/animations';
import { MeetingSuggestion } from '@/domain/entities/calendar/generated-types';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';
import { formatSelectionForDisplay } from '@/lib/formatters';
import { getInstitutionFromSourceTable } from '@/operations/meeting/CalendarHelpers';
import { meetingRepository } from '@/repositories/meetingRepository';

export function CalendarHeader() {
  const { view, setView, searchQuery, setSearchQuery, filters } =
    useMeetingContext();
  const [localSearchText, setLocalSearchText] = React.useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

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
          <div className="flex flex-wrap gap-2">
            {(() => {
              const countryDisplay = formatSelectionForDisplay(filters.country);
              if (!countryDisplay) return null;

              return (
                <Badge
                  variant="secondary"
                  className="text-xs py-1 px-2 z-10 outline-1 outline-gray"
                >
                  {countryDisplay.displayText}
                </Badge>
              );
            })()}
            {(() => {
              const topicDisplay = formatSelectionForDisplay(filters.topics);
              if (!topicDisplay) return null;

              return (
                <Badge
                  variant="secondary"
                  className="text-xs py-1 px-2 z-10 outline-1 outline-gray"
                >
                  {topicDisplay.displayText}
                </Badge>
              );
            })()}
            {(() => {
              if (!filters.source_table || filters.source_table.length === 0) {
                return null;
              }

              const institutions: string[] = [];
              for (const sourceTable of filters.source_table) {
                institutions.push(getInstitutionFromSourceTable(sourceTable));
              }
              const institutionsDisplay =
                formatSelectionForDisplay(institutions);

              if (!institutionsDisplay) return null;
              return (
                <Badge
                  variant="secondary"
                  className="text-xs py-1 px-2 z-10 outline-1 outline-gray"
                >
                  {institutionsDisplay.displayText}
                </Badge>
              );
            })()}
          </div>
          <SuggestedSearch<MeetingSuggestion>
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onSearch={(val) => setSearchQuery(val)}
            placeholder="Search meetings..."
            fetchSuggestions={meetingRepository.getMeetingSuggestions}
            getDisplayText={(meeting) => meeting.title}
            getSelectValue={(meeting) => meeting.title}
            onSelect={(meeting) => setSearchQuery(meeting.title)}
          />
          <FilterModal showDateDropdown={false} topics={topicLabels} />
          <PersonalizeMeetingSwitch />

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
