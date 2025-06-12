'use client';

import React from 'react';

import { CalendarBody } from '@/components/calendar/CalendarBody/CalendarBody';
import { CalendarHeader } from '@/components/calendar/CalendarHeader/CalendarHeader';
import { MeetingProvider } from '@/components/calendar/MeetingContext';

export default function Calendar() {
  return (
    <div className="p-4">
      <MeetingProvider view="month">
        <div className="w-full border rounded-xl ">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </MeetingProvider>
    </div>
  );
}
