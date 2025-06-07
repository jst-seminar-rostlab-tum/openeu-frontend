interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'urgent' | 'info';
  country: string;
  time: string;
  unread: boolean;
}

export default class NotificationOperations {
  static getInboxNotifications(): Notification[] {
    return [
      {
        id: 1,
        title: 'New GDPR Amendment - Article 13',
        description: 'Updates to consent requirements for data processing',
        type: 'urgent',
        country: 'EU-Wide',
        time: '2 hours ago',
        unread: true,
      },
      {
        id: 2,
        title: 'Digital Services Act Implementation',
        description: 'New compliance requirements for digital platforms',
        type: 'info',
        country: 'Germany',
        time: '5 hours ago',
        unread: true,
      },
      {
        id: 3,
        title: 'AI Regulation Draft Update',
        description: 'Review period extended for public comments',
        type: 'info',
        country: 'France',
        time: '1 day ago',
        unread: false,
      },
      {
        id: 4,
        title: 'Green Deal Taxonomy Changes',
        description: 'Environmental criteria updates for financial products',
        type: 'urgent',
        country: 'Netherlands',
        time: '2 days ago',
        unread: false,
      },
    ];
  }

  static filterNotificationsByType(
    notifications: Notification[],
    type: 'all' | 'urgent' | 'info',
  ): Notification[] {
    if (type === 'all') return notifications;
    return notifications.filter((notification) => notification.type === type);
  }

  static getNotificationCounts(
    notifications: Notification[],
  ): Record<string, number> {
    return {
      all: notifications.length,
      urgent: notifications.filter((n) => n.type === 'urgent').length,
      info: notifications.filter((n) => n.type === 'info').length,
    };
  }
}

export type { Notification };
