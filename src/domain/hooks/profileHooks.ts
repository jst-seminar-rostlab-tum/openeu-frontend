'use client';

import { useQuery } from '@tanstack/react-query';

import type { Profile } from '@/domain/entities/profile/generated-types';
import { profileRepository } from '@/repositories/profileRepository';

export const useProfile = (userId: string, enabled = true) =>
  useQuery<Profile>({
    queryKey: ['profile', userId],
    queryFn: () => profileRepository.getProfile(userId),
    enabled: !!userId && enabled,
  });
