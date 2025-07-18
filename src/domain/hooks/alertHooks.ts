import { useQuery } from '@tanstack/react-query';

import { fetchBackendAlerts } from '@/repositories/alertRepository';

import { Alert } from '../entities/alerts/generated-types';
export interface AlertQueryParams {
  userId: string;
  enabled?: boolean;
}

export const useAlerts = (props: AlertQueryParams) => {
  return useQuery<Alert[]>({
    queryKey: ['alerts', props.userId],
    queryFn: () => fetchBackendAlerts(props.userId),
  });
};
