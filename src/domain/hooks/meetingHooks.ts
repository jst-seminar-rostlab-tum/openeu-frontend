'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import {
  IMeetingContext,
  MeetingContext,
} from '@/components/calendar/MeetingContext';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { GetMeetingsParams } from '@/domain/entities/calendar/generated-types';
import { meetingRepository } from '@/repositories/meetingRepository';

export type GetMeetingsQueryParams = GetMeetingsParams;

export const useMeetings = (props: GetMeetingsQueryParams, enabled = true) =>
  useQuery<Meeting[]>({
    queryKey: ['meetings', props],
    queryFn: () => meetingRepository.getMeetings(props),
    enabled,
  });

export function useMeetingContext(): IMeetingContext {
  const context = useContext(MeetingContext);
  if (context === undefined)
    throw new Error('useCalendar must be used within a MeetingProvider.');
  return context;
}
