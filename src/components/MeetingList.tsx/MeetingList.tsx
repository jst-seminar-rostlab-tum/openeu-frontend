'use client';

import React from 'react';

import { useMeetings } from '@/domain/hooks/meetingHooks';

export default function MeetingList() {
  const { data: meetings, isLoading, isError } = useMeetings();

  if (isLoading) {
    return <p>Loading meetings...</p>;
  }

  if (isError) {
    return <p>Failed to load meetings. Please try again later.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Meetings</h2>
      {meetings && meetings.length > 0 ? (
        <ul className="space-y-2">
          {meetings.map((meeting) => (
            <li
              key={meeting.date}
              className="p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
            >
              <h3 className="text-lg font-semibold">{meeting.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{meeting.tags}</p>
              <p className="text-gray-600 dark:text-gray-400">{meeting.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meetings available.</p>
      )}
    </div>
  );
}
