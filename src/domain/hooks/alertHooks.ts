import { useQuery } from '@tanstack/react-query';

import { fetchBackendAlerts } from '@/repositories/alertRepository';

import { Alert } from '../entities/alerts/generated-types';

export const useAlerts = (userId: string, enabled: boolean) => {
  return useQuery<Alert[]>({
    queryKey: ['alerts', userId],
    queryFn: () => fetchBackendAlerts(userId),
    enabled,
  });
};
