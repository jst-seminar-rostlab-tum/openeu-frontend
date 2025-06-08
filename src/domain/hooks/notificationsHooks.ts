import { useQuery } from '@tanstack/react-query';

import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';
import { fetchNotifications } from '@/repositories/notificationRepository';

export const useNotifications = (userId: string, enabled = true) =>
  useQuery<InboxItem[]>({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotifications(userId),
    enabled: enabled && !!userId, // Only fetch if userId exists
  });
