'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import {
  IMeetingContext,
  MeetingContext,
} from '@/components/calendar/MeetingContext';
import { MeetingData } from '@/domain/entities/calendar/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export interface GetMeetingsQueryParams {
  limit?: number;
  /** @description Start datetime (ISO8601) */
  start?: string | null;
  /** @description End datetime (ISO8601) */
  end?: string | null;
  /** @description Search query using semantic similarity */
  query?: string | null;
  /** @description Filter by country (e.g., 'Austria', 'European Union') */
  country?: string | null;
  /** @description List of topic names (repeat or comma-separated) */
  topics?: string[] | null;
}

export const useMeetings = (props: GetMeetingsQueryParams, enabled = true) =>
  useQuery<MeetingData[]>({
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
