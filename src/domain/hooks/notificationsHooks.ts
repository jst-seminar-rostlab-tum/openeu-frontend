import { useQuery } from '@tanstack/react-query';

import { Notification } from '@/domain/entities/notifications/generated-types';
import { fetchBackendNotifications } from '@/repositories/notificationRepository';

export interface NotificationQueryParams {
  userId: string;
  limit?: number;
}

export const useNotifications = (
  props: NotificationQueryParams,
  enabled = true,
) =>
  useQuery<Notification[]>({
    queryKey: ['notifications', props],
    queryFn: () => fetchBackendNotifications(props.userId),
    enabled: enabled && !!props.userId,
  });
