'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { meetingsPerCountry } from '@/domain/entities/MeetingData';
import useMeetingFilters from '@/domain/hooks/useMeetingsFilter';
import FilterModalOperations from '@/operations/filter-modal/FilterModalOperations';
import MapOperations from '@/operations/map/MapOperations';
import { getMeetingCountPerCountry } from '@/operations/map/MeetingsPerCountry';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const [searchValue, setSearchValue] = useState('');
  const [meetingCountByCountry, setMeetingCountByCountry] =
    useState(meetingsPerCountry);
  const todayRange = FilterModalOperations.initDateRange();

  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: todayRange.startDate,
    endDate: todayRange.endDate,
    country: '',
    topics: [],
  });

  const startIso = MapOperations.dateToISOString(filterState.startDate);
  const endIso = MapOperations.dateToISOString(filterState.endDate);

  useMeetingFilters(startIso, endIso);

  const handleFilterStateChange = async (newState: typeof filterState) => {
    setFilterState(newState);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    async function fetchCounts() {
      try {
        const counts = await getMeetingCountPerCountry(startIso, endIso);
        setMeetingCountByCountry(counts);
      } catch (err) {
        console.error('Failed to fetch meeting counts:', err);
      }
    }
    fetchCounts();
  }, [startIso, endIso]);

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map meetingCountByCountry={meetingCountByCountry} />
      <Card className="absolute flex flex-row right-4 top-16 gap-2 z-10 p-2">
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
        <ul>
          {Array.from(meetingCountByCountry.entries()).map(
            ([country, count]) => (
              <li key={country}>
                {country}: {count}
              </li>
            ),
          )}
        </ul>
      </Card>
    </div>
  );
}
