'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { meetingsPerCountry } from '@/domain/entities/MeetingData';
import useMeetingFilters from '@/domain/hooks/useMeetingsFilter';
import { getMeetingCountPerCountry } from '@/operations/mapIndicator/MeetingsPerCountry';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const [searchValue, setSearchValue] = useState('');
  // const [filteredMeetings, setDateRange] = useFilteredMeetings(
  //   meetings || undefined,
  // );
  const [meetingCountByCountry, setMeetingCountByCountry] =
    useState(meetingsPerCountry);

  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: new Date(),
    endDate: new Date(),
    country: '',
    topics: [],
  });

  useMeetingFilters(filterState.startDate, filterState.endDate);

  const handleFilterStateChange = async (newState: typeof filterState) => {
    setFilterState(newState);
    // setMeetingCountByCountry(getMeetingCountPerCountry(filterState.startDate, filterState.endDate));
    try {
      const counts = await getMeetingCountPerCountry(
        new Date(newState.startDate),
        new Date(newState.endDate),
      );
      setMeetingCountByCountry(counts);
    } catch (err) {
      console.error('Failed to fetch meeting counts:', err);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    const { startDate, endDate } = filterState;
    if (startDate || endDate) {
      // setMeetingCountByCountry(getMeetingCountPerCountry(filterState.startDate, filterState.endDate));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('start', filterState.startDate.toISOString());
    params.set('end', filterState.endDate.toISOString());
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [filterState]);

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
          {Object.entries(meetingCountByCountry).map(([country, count]) => (
            <li key={country}>
              {country}: {count}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
