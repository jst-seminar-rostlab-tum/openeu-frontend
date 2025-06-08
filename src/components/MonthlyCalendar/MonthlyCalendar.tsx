'use client';

import React from 'react';

import { CalendarBody } from '@/components/CalendarBody/CalendarBody';
import { CalendarProvider } from '@/components/CalendarHeader/CalendarContext';
import { CalendarHeader } from '@/components/CalendarHeader/CalendarHeader';

export default function Calendar() {
  return (
    <div className="p-4">
      <CalendarProvider view="month">
        <div className="w-full border rounded-xl ">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </CalendarProvider>
    </div>
  );
}
