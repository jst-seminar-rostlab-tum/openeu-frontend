'use client';

import React, { useEffect, useState } from 'react';

import { CalendarBody } from '@/components/CalendarBody/CalendarBody';
import { CalendarProvider } from '@/components/CalendarHeader/calendarContext';
import { CalendarHeader } from '@/components/CalendarHeader/CalendarHeader';
import FilterModal from '@/components/FilterModal/FilterModal';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { FilterModalState } from '@/domain/entities/FilterModalState';
import { getEvents } from '@/operations/meeting/calendarHelpers';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function CalendarPage() {
  const [filterState, setFilterState] = useState<FilterModalState>({
    startDate: new Date(),
    endDate: new Date(),
    country: '',
    topics: [],
  });

  const [events, setEvents] = useState<MeetingData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 20));
        const eventsData = await getEvents();
        setEvents(eventsData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFilterStateChange = (newState: typeof filterState) => {
    setFilterState(newState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
