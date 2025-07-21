import { useQuery } from '@tanstack/react-query';

import {
  LegislativeFilesParams,
  LegislativeSuggestionsParams,
} from '@/domain/entities/monitor/generated-types';
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

export const useLegislativeUniqueValues = () =>
  useQuery({
    queryKey: ['legislative-unique-values'],
    queryFn: () => legislationRepository.getLegislativeUniqueValues(),
  });
