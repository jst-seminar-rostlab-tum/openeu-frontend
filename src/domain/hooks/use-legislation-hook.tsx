'use client';

import { useQuery } from '@tanstack/react-query';

import { legislationRepository } from '@/repositories/legislationRepository';

export const useMeetings = () =>
  useQuery({
    queryKey: ['legislations'],
    queryFn: () => legislationRepository.getLegislations(),
  });
