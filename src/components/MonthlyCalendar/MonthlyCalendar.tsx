'use client';

import React from 'react';

import { CalendarBody } from '@/components/CalendarBody/CalendarBody';
import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';
import { CalendarHeader } from '@/components/CalendarHeader/CalendarHeader';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';

interface CalendarClientProps {
  events: MeetingData[];
}

export default function Calendar({ events }: CalendarClientProps) {
  return (
    <div className="p-4">
      <CalendarProvider events={events} view="month">
        <div className="w-full border rounded-xl ">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </CalendarProvider>
    </div>
  );
}
