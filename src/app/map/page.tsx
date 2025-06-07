'use client';

import { useState } from 'react';

import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';
import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map />
      <Card className="absolute flex flex-row right-4 top-16 gap-2 z-10 p-2">
        <SearchBar
          value={searchValue}
          onValueChange={handleSearchChange}
          placeholder="Search"
        />
        <CalendarProvider>
          <FilterModal topics={topics} showCountryDropdown={false} />
        </CalendarProvider>
      </Card>
    </div>
  );
}
