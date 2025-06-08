'use client';

import { useEffect, useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';
import Map from '@/components/Map/Map';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { Card } from '@/components/ui/card';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { useMeetings } from '@/domain/hooks/meetingHooks';
import useMeetingFilter from '@/domain/hooks/useMeetingsFilter';
import MapOperations from '@/operations/map/MapOperations';
import { useMeetingCountByCountry } from '@/operations/map/MeetingsPerCountry';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function MapPage() {
  const { startDate, endDate } = MapOperations.getCurrentWeekRange();
  const { filters, setFilters } = useMeetingFilter();
  const [filterState, setFilterState] = useState<FilterModalState>(() => {
    return {
      startDate: startDate,
      endDate: endDate,
      country: '',
      topics: [],
    };
  });

  const meetingsQuery = useMeetings(filters.start, filters.end, filters.query);
  const meetings: MeetingData[] = meetingsQuery.data ?? [];

  const meetingCountByCountry = useMeetingCountByCountry(meetings);

  useEffect(() => {
    const newStartDate = MapOperations.isoStringToDate(filters.start);
    const newEndDate = MapOperations.isoStringToDate(filters.end);

    setFilterState((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  }, [filters.start, filters.end]);

  const handleFilterStateChange = (newState: FilterModalState) => {
    setFilterState(newState);

    const newStartIso = MapOperations.dateToISOString(newState.startDate);
    const newEndIso = MapOperations.dateToISOString(newState.endDate);

    setFilters({
      start: newStartIso,
      end: newEndIso,
      query: filters.query,
    });
  };

  const [inputBuffer, setInputBuffer] = useState<string>(filters.query ?? '');

  useEffect(() => {
    if (inputBuffer === '' && (filters.query ?? '') !== '') {
      setFilters({
        start: filters.start,
        end: filters.end,
        query: '',
      });
    }
  }, [inputBuffer, filters.query, filters.start, filters.end, setFilters]);

  const handleSearchInput = (newText: string) => {
    setInputBuffer(newText);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputBuffer !== filters.query) {
      setFilters({
        start: filters.start,
        end: filters.end,
        query: inputBuffer,
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
          showTopicDropdown={false}
        />
      </Card>
    </div>
  );
}
