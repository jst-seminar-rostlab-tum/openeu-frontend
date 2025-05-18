import { PopoverNotification } from '@/domain/entities/notifications/Notification';

export default class NotificationsPopoverOperations {
  static getMockNotifications(): PopoverNotification[] {
    return [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: String(i),
        title: `Test notification ${i}`,
        isRead: i % 2 === 0,
        type: Math.random() > 0.5 ? 'info' : ('warning' as 'info' | 'warning'),
      })),
    ];
  }
}
