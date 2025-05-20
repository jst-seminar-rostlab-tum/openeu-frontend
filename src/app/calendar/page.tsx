'use client';

import React, { useState } from 'react';

import FilterModal from '@/components/FilterModal/FilterModal';

const topics = ['topic 1', 'topic 2', 'topic 3', 'topic 4'];

export default function CalendarPage() {
  const [filterState, setFilterState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    country: '',
    topic: '',
  });

  const handleFilterStateChange = (newState: typeof filterState) => {
    setFilterState(newState);
    console.log('Updated Filter State:', newState);
  };

  return (
    <div>
      <h1 className="font-bold">Calendar</h1>
      <FilterModal
        topics={topics}
        filterState={filterState}
        setFilterState={handleFilterStateChange}
      />
      <div>
        <h2>Current Filter State:</h2>
        <pre>{JSON.stringify(filterState, null, 2)}</pre>
      </div>
    </div>
  );
}
