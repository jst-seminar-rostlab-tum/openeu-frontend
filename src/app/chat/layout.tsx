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
      <ChatSidebar variant="sidebar" className="mt-12 h-[calc(100vh-3rem)]" />
      <SidebarInset>
        <header className="z-10 flex items-center h-10 px-2">
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
        </header>
        <div className="flex-1 relative overflow-y-auto scrollbar-custom p-4 pb-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
