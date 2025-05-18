'use client';

import { useQuery } from '@tanstack/react-query';

import { MeetingData } from '@/domain/entities/MeetingData';
import { meetingRepository } from '@/repositories/meetingRepository';

export const useMeetings = (enabled = true) =>
  useQuery<MeetingData[]>({
    queryKey: ['meetings'],
    queryFn: meetingRepository.getMeetings,
    enabled,
  });
