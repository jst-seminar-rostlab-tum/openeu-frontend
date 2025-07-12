import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import {
  LegislativeFilesParams,
  LegislativeSuggestionsParams,
} from '@/domain/entities/monitor/generated-types';
import { ToastOperations } from '@/operations/toast/toastOperations';
import { legislationRepository } from '@/repositories/legislationRepository';

export const useLegislativeFiles = (params?: LegislativeFilesParams) =>
  useQuery({
    queryKey: ['legislative-files', params],
    queryFn: () => legislationRepository.getLegislativeFiles(params),
  });

export const useLegislativeSuggestions = (
  params: LegislativeSuggestionsParams,
) =>
  useQuery({
    queryKey: ['legislative-suggestions', params],
    queryFn: () => legislationRepository.getLegislationSuggestions(params),
    enabled: params.query.length >= 2,
  });
export const useSubscribeToLegislationMutation = () =>
  useMutation({
    mutationFn: ({
      userId,
      legislationId,
    }: {
      userId: string;
      legislationId: string;
    }) => legislationRepository.subscribeToLegislation(userId, legislationId),
    onSuccess: () => {
      ToastOperations.showSuccess({
        title: 'Subscription successful',
        message: 'You have successfully subscribed to this legislation.',
      });
    },
    onError: () => {
      ToastOperations.showError({
        title: 'Subscription failed',
        message: 'Failed to subscribe to legislation. Please try again later.',
      });
    },
  });
