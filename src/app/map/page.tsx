'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { meetingsPerCountry } from '@/domain/entities/MeetingData';
import useMeetingFilter from '@/domain/hooks/useMeetingsFilter';
import MapOperations from '@/operations/map/MapOperations';
import { getMeetingCountPerCountry } from '@/operations/map/MeetingsPerCountry';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const { filters, setFilters } = useMeetingFilter();
  const [filterState, setFilterState] = useState<FilterModalState>(() => {
    return {
      startDate: new Date(),
      endDate: new Date(),
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
          filters.search,
        );
        setMeetingCountByCountry(counts);
      } catch (err) {
        console.error('Failed to fetch meeting counts:', err);
      }
    }
    fetchCounts();
  }, [filters.start, filters.end, filters.search]);

  const handleFilterStateChange = (newState: FilterModalState) => {
    setFilterState(newState);

    const newStartIso = MapOperations.dateToISOString(newState.startDate);
    const newEndIso = MapOperations.dateToISOString(newState.endDate);

    setFilters({
      start: newStartIso,
      end: newEndIso,
      search: filters.search,
    });
  };

  const [inputBuffer, setInputBuffer] = useState<string>(filters.search ?? '');

  useEffect(() => {
    if (inputBuffer === '' && (filters.search ?? '') !== '') {
      setFilters({
        start: filters.start,
        end: filters.end,
        search: '',
      });
    }
  }, [inputBuffer, filters.search, filters.start, filters.end, setFilters]);

  const handleSearchInput = (newText: string) => {
    setInputBuffer(newText);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputBuffer !== filters.search) {
      setFilters({
        start: filters.start,
        end: filters.end,
        search: inputBuffer,
      });
    }
  };

  return (
    <div className="fixed inset-0 pt-12 w-full h-full">
      <Map meetingCountByCountry={meetingCountByCountry} />
      <Card className="absolute flex flex-row right-4 top-16 gap-2 z-10 p-2">
        <form onSubmit={handleSearchSubmit}>
          <SearchBar
            value={inputBuffer}
            onValueChange={handleSearchInput}
            placeholder="Search"
          />
        </form>
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
