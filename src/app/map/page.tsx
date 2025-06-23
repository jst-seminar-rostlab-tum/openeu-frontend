'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';
import { dateRangeToString } from '@/lib/formatters';

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching, filters } =
    useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <div className="absolute top-16 left-4 right-4 z-10 flex justify-end items-center px-2 gap-2">
        <div className="flex flex-wrap gap-2">
          {filters.topics &&
            Object.entries(filters.topics).map(([key, value]) => {
              if (value === undefined) return null;

              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="text-xs py-1 px-2 z-10 outline-1 outline-gray"
                >
                  {value}
                </Badge>
              );
            })}
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

        <Card className="flex flex-row gap-2 p-2">
          <SearchBar
            value={displayValue}
            onValueChange={setDisplayValue}
            onSearch={setSearchQuery}
            isFetching={isFetching}
            placeholder="Search meetings..."
          />
          <FilterModal
            topics={topicLabels}
            showCountryDropdown={false}
            useWeekDefault={true}
          />
        </Card>
      </div>
    </div>
  );
}
