'use client';

import React, { useState } from 'react';

import { CalendarBody } from '@/components/CalendarBody/CalendarBody';
import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';
import { CalendarHeader } from '@/components/CalendarHeader/CalendarHeader';
import FilterModal from '@/components/FilterModal/FilterModal';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { FilterModalState } from '@/domain/entities/FilterModalState';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

interface CalendarClientProps {
  events: MeetingData[];
}

export default function Calendar({ events }: CalendarClientProps) {
  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: new Date(),
    endDate: new Date(),
    country: '',
    topics: [],
  });

  const handleFilterStateChange = (newState: typeof filterState) => {
    setFilterState(newState);
  };

  return (
    <div>
      <h1 className="font-bold">Calendar</h1>
      <FilterModal
        topics={topics}
        filterState={filterState}
        setFilterState={handleFilterStateChange}
      />
      <div className="m-4">
        <CalendarProvider events={events} view="month">
          <div className="w-full border rounded-xl ">
            <CalendarHeader />
            <CalendarBody />
          </div>
        </CalendarProvider>
      </div>
    </div>
  );
}
