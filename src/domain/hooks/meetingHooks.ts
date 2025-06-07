'use client';

import { useQuery } from '@tanstack/react-query';

import { Meeting } from '@/domain/entities/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export const useMeetings = (
  startDate?: string,
  endDate?: string,
  enabled = true,
) =>
  useQuery<Meeting[]>({
    queryKey: ['meetings', startDate, endDate],
    queryFn: () => meetingRepository.getMeetings(startDate, endDate),
    enabled,
  });
