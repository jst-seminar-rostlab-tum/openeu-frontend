'use client';

import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

import {
  IProfileContext,
  ProfileContext,
} from '@/components/profile/ProfileContext';
import { ProfileData } from '@/domain/entities/profile/generated-types';
import { profileRepository } from '@/repositories/profileRepository';

export const useProfile = (userId?: string, enabled?: boolean) =>
  useQuery<ProfileData | false>({
    queryKey: ['profile', userId],
    queryFn: () => profileRepository.getProfile(userId),
    enabled: enabled ?? false,
  });

export function useProfileContext(): IProfileContext {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider.');
  return context;
}
