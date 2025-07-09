import { useQuery } from '@tanstack/react-query';

import { Notification } from '@/domain/entities/notifications/generated-types';
import { fetchBackendNotifications } from '@/repositories/notificationRepository';

export interface AlertQueryParams {
  userId: string;
  limit?: number;
}

export const useNotifications = (props: AlertQueryParams, enabled = true) =>
  useQuery<Notification[]>({
    queryKey: ['notifications', props.userId],
    queryFn: () => fetchBackendNotifications(props.userId),
    enabled: enabled && !!props.userId,
  });
