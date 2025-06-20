'use client';

import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

import { useAuth } from '@/domain/hooks/useAuth';

export interface IProfileContext {
  user: User | null;
  isLoading: boolean;
}

export const ProfileContext = createContext<IProfileContext | undefined>(
  undefined,
);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();

  const value: IProfileContext = {
    user: user,
    isLoading: loading,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
