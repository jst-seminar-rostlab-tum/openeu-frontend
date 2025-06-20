'use client';

import { useContext } from 'react';

import {
  IProfileContext,
  ProfileContext,
} from '@/components/profile/ProfileContext';

export function useProfileContext(): IProfileContext {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error('useProfile must be used within a ProfileProvider.');
  return context;
}
