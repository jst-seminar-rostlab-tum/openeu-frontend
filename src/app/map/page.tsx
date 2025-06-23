'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/map/Map';
import { SuggestedSearch } from '@/components/SuggestedSearch/SuggestedSearch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';
import { dateRangeToString, formatTopicsForDisplay } from '@/lib/formatters';

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching, filters } =
    useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <Card className="absolute flex flex-row right-4 top-16 gap-2 z-10 p-2">
        <SuggestedSearch
          value={displayValue}
          onValueChange={setDisplayValue}
          onSearch={setSearchQuery}
          isLoading={isFetching}
          placeholder="Search meetings..."
        />
        <FilterModal showCountryDropdown={false} topics={topicLabels} />
      </Card>
      <div className="absolute top-16 left-4 right-4 z-10 flex justify-end items-center px-2 gap-2">
        <div className="flex flex-wrap gap-2">
          {(() => {
            const topicDisplay = formatTopicsForDisplay(filters.topics);
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
          {filters.start && filters.end && (
            <Badge
              variant="secondary"
              className="text-xs py-1 px-1 z-10 outline-1 outline-gray"
            >
              {dateRangeToString(
                new Date(filters.start),
                new Date(filters.end),
              )}
            </Badge>
          )}
        </div>


      </div>
    </div>
  );
}
