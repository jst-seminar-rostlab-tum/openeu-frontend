'use client';

import React from 'react';

import { useMeetings } from '@/domain/hooks/meetingHooks';
import { getCurrentMonthRange } from '@/operations/meeting/CalendarHelpers';

export default function MeetingList() {
  const { startDate, endDate } = getCurrentMonthRange();
  const {
    data: meetings,
    isLoading,
    isError,
  } = useMeetings(startDate, endDate);

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
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-4xl">
            <ul className="space-y-2 flex flex-col md:flex-row md:space-x-5 md:space-y-0">
              {meetings.slice(0, 3).map((meeting, index) => (
                <li
                  key={`meeting-${index}`}
                  className="flex-1 p-4 border rounded-md shadow-sm bg-gray-50 dark:bg-gray-800"
                >
                  <h3 className="text-lg font-semibold">{meeting.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {meeting.tags}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {meeting.meeting_start_datetime}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-right text-gray-500 dark:text-gray-400 mt-2">
              + {meetings.length - 3} more meetings planned
            </p>
          </div>
        </div>
      ) : (
        <p>No meetings available.</p>
      )}
    </div>
  );
}
