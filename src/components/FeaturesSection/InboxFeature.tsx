'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Clock, Info } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FeaturesOperations from '@/operations/features/FeaturesOperations';

export default function InboxFeature() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'urgent' | 'info'>(
    'all',
  );

  const notifications = FeaturesOperations.getInboxNotifications();
  const counts = FeaturesOperations.getNotificationCounts(notifications);
  const filteredNotifications = FeaturesOperations.filterNotificationsByType(
    notifications,
    selectedTab,
  );

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
    <Card className="h-full border-2 border-black dark:border-white bg-white dark:bg-gray-900">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-8 h-8 text-white dark:text-black" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-black dark:text-white">
              Smart Inbox
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Prioritized notifications for EU regulatory changes
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All', count: counts.all },
              { key: 'urgent', label: 'Urgent', count: counts.urgent },
              { key: 'info', label: 'Info', count: counts.info },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setSelectedTab(tab.key as 'all' | 'urgent' | 'info')
                }
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedTab === tab.key
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  notification.unread
                    ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                } hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
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
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
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
      </CardContent>
    </Card>
  );
}
