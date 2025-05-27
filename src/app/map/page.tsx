'use client';

import { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { FilterModalState } from '@/domain/entities/FilterModalState';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const [searchValue, setSearchValue] = useState('');

  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: new Date(),
    endDate: new Date(),
    country: '',
    topics: [],
  });

  const handleFilterStateChange = (newState: typeof filterState) => {
    setFilterState(newState);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      <Map />
      <Card className="absolute flex flex-row right-4 top-4 gap-2 z-10 p-2">
        <SearchBar
          value={searchValue}
          onValueChange={handleSearchChange}
          placeholder="Search"
        />
        <FilterModal
          topics={topics}
          filterState={filterState}
          setFilterState={handleFilterStateChange}
          showCountryDropdown={false}
        />
      </Card>
    </div>
  );
}
