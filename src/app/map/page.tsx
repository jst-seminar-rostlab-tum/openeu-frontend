'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { meetingsPerCountry } from '@/domain/entities/MeetingData';
import useMeetingFilter from '@/domain/hooks/useMeetingsFilter';
import FilterModalOperations from '@/operations/filter-modal/FilterModalOperations';
import MapOperations from '@/operations/map/MapOperations';
import { getMeetingCountPerCountry } from '@/operations/map/MeetingsPerCountry';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const { filters, setFilters } = useMeetingFilter();
  const [filterState, setFilterState] = useState<FilterModalState>(() => {
    const todayRange = FilterModalOperations.initDateRange();
    return {
      startDate: filters.start
        ? MapOperations.isoStringToDate(filters.start)
        : todayRange.startDate,
      endDate: filters.end
        ? MapOperations.isoStringToDate(filters.end)
        : todayRange.endDate,
      country: '',
      topics: [],
    };
  });

  useEffect(() => {
    const newStartDate = MapOperations.isoStringToDate(filters.start);
    const newEndDate = MapOperations.isoStringToDate(filters.end);

    setFilterState((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  }, [filters.start, filters.end]);

  const [meetingCountByCountry, setMeetingCountByCountry] =
    useState(meetingsPerCountry);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const counts = await getMeetingCountPerCountry(
          filters.start,
          filters.end,
        );
        setMeetingCountByCountry(counts);
      } catch (err) {
        console.error('Failed to fetch meeting counts:', err);
      }
    }
    fetchCounts();
  }, [filters.start, filters.end]);

  const handleFilterStateChange = (newState: FilterModalState) => {
    setFilterState(newState);

    const newStartIso = MapOperations.dateToISOString(newState.startDate);
    const newEndIso = MapOperations.dateToISOString(newState.endDate);

    setFilters({ start: newStartIso, end: newEndIso });
  };

  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

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
      </Card>
    </div>
  );
}
