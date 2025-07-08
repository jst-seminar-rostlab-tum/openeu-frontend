import { Notification } from '@/domain/entities/notifications/generated-types';
import { fetchBackendNotifications } from '@/repositories/notificationRepository';

import { useSuspenseQuery } from './useSuspenseQuery';

export interface AlertQueryParams {
  userId: string;
  limit?: number;
}

export const useNotifications = (props: AlertQueryParams, enabled = true) =>
  useSuspenseQuery<Notification[]>({
    queryKey: ['notifications', props.userId],
    queryFn: () => fetchBackendNotifications(props.userId),
    enabled: enabled && !!props.userId,
  });
