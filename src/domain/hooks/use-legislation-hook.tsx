'use client';

import { useQuery } from '@tanstack/react-query';

import { legislationRepository } from '@/repositories/legislationRepository';

export const useLegislations = () =>
  useQuery({
    queryKey: ['legislations'],
    queryFn: () => legislationRepository.getLegislations(),
  });
