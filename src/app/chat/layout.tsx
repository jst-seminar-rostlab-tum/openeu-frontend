import React from 'react';

import ChatSidebar from '@/app/chat/components/ChatSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="h-[calc(100vh-3rem)] !min-h-0 p-4">
      <ChatSidebar variant="sidebar" className="mt-12 h-[calc(100vh-3rem)]" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle (⌘B)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex-1 relative">{children}</div>
    </SidebarProvider>
  );
}
