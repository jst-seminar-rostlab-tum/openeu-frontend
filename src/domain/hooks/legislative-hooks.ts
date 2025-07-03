import { useQuery } from '@tanstack/react-query';

import {
  LegislativeFilesParams,
  LegislativeSuggestionsParams,
} from '@/domain/entities/monitor/generated-types';
import { legislationRepository } from '@/repositories/legislationRepository';

export function useLegislativeFiles(params?: LegislativeFilesParams) {
  return useQuery({
    queryKey: ['legislative-files', params],
    queryFn: () => legislationRepository.getLegislativeFiles(params),
  });
}

export function useLegislativeSuggestions(
  params: LegislativeSuggestionsParams,
) {
  return useQuery({
    queryKey: ['legislative-suggestions', params],
    queryFn: () => legislationRepository.getLegislationSuggestions(params),
    enabled: params.query.length >= 2,
  });
}
