'use client';

import { User } from '@supabase/supabase-js';
import { createContext } from 'react';

import {
  ProfileData,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { profileRepository } from '@/repositories/profileRepository';

export interface IProfileContext {
  isLoadingUser: boolean;
  user: User | null;
  isLoadingProfile: boolean;
  profile: ProfileData | false;
  updatePassword: (newPassword: string) => void;
  linkGoogleAccount: () => void;
  unlinkGoogleAccount: () => void;
  updateProfile: (data: ProfileUpdate) => Promise<void>;
}

export const ProfileContext = createContext<IProfileContext | undefined>(
  undefined,
);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading: isLoadingUser, user } = useAuth();
  const client = createClient();
  const { data: profile, isLoading: isLoadingProfile } = useProfile(user?.id);

  const updatePassword = async (password: string) => {
    await client.auth.updateUser({ password });
  };

  const linkGoogleAccount = async () => {
    const { error } = await client.auth.linkIdentity({ provider: 'google' });
    if (error) {
      ToastOperations.showError({
        title: 'Error',
        message: error.message ?? 'Unknown error',
      });
    }
  };

  const unlinkGoogleAccount = async () => {
    // retrieve all identities linked to a user
    const { data: identities, error: identitiesError } =
      await client.auth.getUserIdentities();
    if (!identitiesError) {
      // find the google identity linked to the user
      const googleIdentity = identities.identities.find(
        (identity) => identity.provider === 'google',
      );
      if (googleIdentity) {
        // unlink the google identity from the user
        await client.auth.unlinkIdentity(googleIdentity);
        ToastOperations.showSuccess({
          title: 'Success',
          message: 'Your google account was successfully unlinked!',
        });
        await client.auth.refreshSession();
        return;
      }
    }
    ToastOperations.showError({
      title: 'Error',
      message: identitiesError?.message ?? 'Unknown error',
    });
  };

  const updateProfile = async (data: ProfileUpdate) => {
    if (!user?.id) return;

    const profile = await profileRepository.updateProfile(user?.id, data);
    if (!profile) return;

    await client.auth.refreshSession();
  };

  const value: IProfileContext = {
    isLoadingUser,
    user,
    isLoadingProfile,
    profile: profile ?? false,
    updatePassword,
    linkGoogleAccount,
    unlinkGoogleAccount,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
