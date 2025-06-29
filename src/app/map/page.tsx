'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/map/Map';
import { SuggestedSearch } from '@/components/SuggestedSearch/SuggestedSearch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MeetingSuggestion } from '@/domain/entities/calendar/generated-types';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';
import { dateRangeToString, formatTopicsForDisplay } from '@/lib/formatters';
import { getInstitutionFromSourceTable } from '@/operations/meeting/CalendarHelpers';
import { meetingRepository } from '@/repositories/meetingRepository';

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching, filters } =
    useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <div className="absolute right-4 top-16 z-10 flex flex-col-reverse items-end md:flex-row md:items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {(() => {
            const topicDisplay = formatTopicsForDisplay(filters.topics);
            if (!topicDisplay) return null;

            return (
              <Badge
                variant="secondary"
                className="text-xs py-1 px-2 outline-1 outline-gray"
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
            const institutionsDisplay = formatTopicsForDisplay(institutions);

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
          {filters.start && filters.end && (
            <Badge
              variant="secondary"
              className="text-xs py-1 px-1 outline-1 outline-gray"
            >
              {dateRangeToString(
                new Date(filters.start),
                new Date(filters.end),
              )}
            </Badge>
          )}
        </div>
        <Card className="flex flex-row gap-2 p-2">
          <SuggestedSearch<MeetingSuggestion>
            value={displayValue}
            onValueChange={setDisplayValue}
            onSearch={setSearchQuery}
            isLoading={isFetching}
            placeholder="Search meetings..."
            fetchSuggestions={meetingRepository.getMeetingSuggestions}
            getDisplayText={(meeting) => meeting.title}
            getSelectValue={(meeting) => meeting.title}
            onSelect={(meeting) => setSearchQuery(meeting.title)}
          />
          <FilterModal showCountryDropdown={false} topics={topicLabels} />
        </Card>
      </div>
    </div>
  );
}
