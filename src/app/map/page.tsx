'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import SelectedFilterBadge from '@/components/FilterModal/SelectedFilterBadge';
import Map from '@/components/map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useTopics } from '@/domain/hooks/topicHook';
import { FilterData } from '@/operations/filter-modal/FilterModalOperations';

export default function MapPage() {
  const { searchQuery, setSearchQuery, isFetching } = useMeetingContext();
  const [displayValue, setDisplayValue] = useState(searchQuery);
  const [filterData, setFilterData] = useState<FilterData>({
    country: '',
    dateRange: '',
    topics: '',
  });

  const handleFilterSelectForBadge = (newData: FilterData) => {
    setFilterData(newData);
  };

  const { data: topicsData = [] } = useTopics();
  const topicLabels = topicsData.map((topic) => topic.topic);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <div className="absolute top-16 left-4 right-4 z-10 flex justify-end items-center px-2 gap-2">
        <div className="flex flex-wrap gap-2">
          {filterData &&
            Object.entries(filterData).map(([key, value]) => {
              if (value == '') return null;

              return <SelectedFilterBadge key={key} value={value} />;
            })}
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
            onSelect={handleFilterSelectForBadge}
          />
        </Card>
      </div>
    </div>
  );
}
