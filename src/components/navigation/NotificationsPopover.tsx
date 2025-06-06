'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationsPopoverOperations from '@/operations/notifications/NotificationsPopoverOperations';

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-[12px] top-[8px] h-1.5 w-1.5 rounded-full bg-blue-500 outline outline-background" />
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-70">
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col gap-1.5 p-2">
                {NotificationsPopoverOperations.getMockNotifications().map(
                  (notification) => (
                    <div key={notification.id}>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm">{notification.title}</span>
                        {!notification.isRead && (
                          <span
                            className={`h-2 w-2 mr-2 rounded-full ${
                              notification.type === 'info'
                                ? 'bg-blue-500'
                                : 'bg-orange-500'
                            }`}
                          />
                        )}
                      </div>
                      <Separator />
                    </div>
                  ),
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="archive" className="mt-0">
            <ScrollArea className="h-[300px]">
              <div className="text-sm text-muted-foreground text-center py-4">
                No archived notifications
              </div>
            </ScrollArea>
          </TabsContent>
          <Link className="w-full" href="/inbox">
            <Button variant="outline" className="w-full">
              Check Inbox
            </Button>
          </Link>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
