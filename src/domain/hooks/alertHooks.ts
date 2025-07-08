import { useEffect, useRef } from 'react';

import { fetchBackendAlerts } from '@/repositories/alertRepository';

import { Alert } from '../entities/alerts/generated-types';
import { useSuspenseQuery } from './useSuspenseQuery';
export interface AlertQueryParams {
  userId: string;
  enabled?: boolean;
}

export const useAlerts = (props: AlertQueryParams, enabled = true) => {
  return useSuspenseQuery<Alert[]>({
    queryKey: ['alerts', props.userId],
    queryFn: () => fetchBackendAlerts(props.userId),
    enabled,
  });
};

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
