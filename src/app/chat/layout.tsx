import React from 'react';

import ChatSidebar from '@/app/chat/components/ChatSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
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
    <SidebarProvider className="h-[calc(100vh-3rem)] !min-h-0">
      <ChatSidebar variant="inset" className="mt-12 h-[calc(100vh-3rem)]" />
      <SidebarInset className="p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle (⌘B)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
