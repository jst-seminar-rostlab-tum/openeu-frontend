/* eslint-disable simple-import-sort/imports */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { useQuery } from '@tanstack/react-query';
import { meetingRepository } from '@/repositories/meetingRepository';
import { MeetingData } from '@/domain/entities/MeetingData';

export const useMeetings = (enabled = true) =>
  useQuery<MeetingData[]>({
    queryKey: ['meetings'],
    queryFn: meetingRepository.getMeetings,
    enabled,
  });
