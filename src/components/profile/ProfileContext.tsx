'use client';

import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

import { useAuth } from '@/domain/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';

export interface IProfileContext {
  user: User | null;
  isLoading: boolean;
  updatePassword: (newPassword: string) => void;
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
  const client = createClient();

  const updatePassword = async (password: string) => {
    await client.auth.updateUser({ password });
  };

  const value: IProfileContext = {
    user,
    isLoading: loading,
    updatePassword,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
