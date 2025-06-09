'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/domain/hooks/notificationsHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export function NotificationsPopover() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { data: notifications } = useNotifications(
    {
      userId: user?.id || '',
    },
    !!user,
  );

  // Get top 10 notifications sorted by date (most recent first)
  // TODO: Sort by relevance score when backend provides it
  const topNotifications =
    notifications
      ?.slice()
      .sort(
        (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime(),
      )
      .slice(0, 10) || [];

  const handleCheckInboxClick = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications && notifications.length > 0 && (
            <span className="absolute right-[12px] top-[8px] h-1.5 w-1.5 rounded-full bg-blue-500 outline outline-background" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <Link href="/inbox" onClick={handleCheckInboxClick}>
          <Button variant="outline" size="sm" className="w-full">
            Check Inbox
          </Button>
        </Link>

        <ScrollArea className="h-[300px] mt-2">
          <div className="flex flex-col gap-1 px-2">
            {topNotifications.length > 0 ? (
              topNotifications.map((notification) => (
                <div key={notification.id}>
                  <div className="flex items-center justify-between py-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {notification.type ?? 'No title'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.sent_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="h-2 w-2 ml-2 rounded-full bg-blue-600 flex-shrink-0" />
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No notifications
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
