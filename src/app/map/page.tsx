'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching } = useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <Card className="absolute flex flex-row right-4 top-16 gap-2 z-10 p-2">
        <SearchBar
          value={displayValue}
          onValueChange={setDisplayValue}
          onSearch={setSearchQuery}
          isFetching={isFetching}
          placeholder="Search meetings..."
        />
        <FilterModal topics={topicLabels} showCountryDropdown={false} />
      </Card>
    </div>
  );
}
