'use client';

import { useQuery } from '@tanstack/react-query';

import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';
import { DragDropContext, DragDropProvider } from '@/components/MonthViewCalendar/DragDropContex';
import { useContext } from 'react';


export const useMeetings = (enabled = true) =>
  useQuery<MeetingData[]>({
    queryKey: ['meetings'],
    queryFn: meetingRepository.getMeetings,
    enabled,
  });

  export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (context === undefined) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}