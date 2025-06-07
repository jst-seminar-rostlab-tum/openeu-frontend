'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Clock, Info } from 'lucide-react';
import { useState } from 'react';

import FeatureCard from '@/components/home/features/FeatureCard';
import { Badge } from '@/components/ui/badge';
import NotificationOperations from '@/operations/features/NotificationOperations';

export default function InboxFeature() {
  const [selectedTab, setSelectedTab] = useState<'urgent' | 'info'>('urgent');

  const notifications = NotificationOperations.getInboxNotifications();
  const counts = NotificationOperations.getNotificationCounts(notifications);
  const filteredNotifications =
    NotificationOperations.filterNotificationsByType(
      notifications,
      selectedTab,
    ).slice(0, 2); // Limit to 2 messages per tab

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <FeatureCard
      icon={Bell}
      title="Smart Inbox"
      description="Prioritized notifications for EU regulatory changes"
    >
      <div className="space-y-3">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'urgent', label: 'Urgent', count: counts.urgent },
            { key: 'info', label: 'Info', count: counts.info },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as 'urgent' | 'info')}
              className={`px-2 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === tab.key
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Notifications List - Limited to 2 per tab */}
        <div className="space-y-2">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-2 border rounded-lg cursor-pointer transition-all ${
                notification.unread
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              } hover:shadow-md`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className={`font-medium text-sm ${
                        notification.unread
                          ? 'text-black dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {notification.title}
                    </h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs py-0 px-1">
                      {notification.country}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FeatureCard>
  );
}
