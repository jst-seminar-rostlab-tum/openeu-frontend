'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import MapOperations from '@/operations/map/MapOperations';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching, filters } =
    useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);

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
        <FilterModal
          topics={topics}
          initFilterState={{
            startDate: MapOperations.isoStringToDate(filters.start || ''),
            endDate: MapOperations.isoStringToDate(filters.end || ''),
            country: '',
            topics: [],
          }}
          showCountryDropdown={false}
          showTopicDropdown={false}
        />
      </Card>
    </div>
  );
}
