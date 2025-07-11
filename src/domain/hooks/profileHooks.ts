'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  Profile,
  ProfileCreate,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { profileRepository } from '@/repositories/profileRepository';

interface UseProfileMutationOptions {
  onSuccess?: (data: Profile) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}

export const useProfile = (userId: string, enabled = true) =>
  useQuery<Profile>({
    queryKey: ['profile', userId],
    queryFn: () => profileRepository.getProfile(userId),
    enabled: !!userId && enabled,
  });

export const useProfileCreateMutation = (
  options?: UseProfileMutationOptions,
) => {
  return useMutation({
    mutationFn: (data: ProfileCreate) => profileRepository.createProfile(data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useProfileUpdateMutation = (
  options?: UseProfileMutationOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: ProfileUpdate }) =>
      profileRepository.updateProfile(userId, data),

    onMutate: async ({ userId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['profile', userId] });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(['profile', userId]);

      // Optimistically update the cache
      queryClient.setQueryData(['profile', userId], (old: Profile) => ({
        ...old,
        ...data,
      }));

      // Return context with snapshot
      return { previousProfile };
    },

    onError: (error, { userId }, context) => {
      // Rollback to previous value on error
      if (context?.previousProfile) {
        queryClient.setQueryData(['profile', userId], context.previousProfile);
      }

      options?.onError?.(error);
    },

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onSettled: (data, error, { userId }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });

      options?.onSettled?.();
    },
  });
};
