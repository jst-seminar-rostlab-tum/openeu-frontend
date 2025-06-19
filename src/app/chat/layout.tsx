import type { Metadata } from 'next';

import { ChatProvider } from '@/app/chat/ChatContext';
import ChatScrollContainer from '@/components/Chat/ChatScrollContainer';
import ChatSidebar from '@/components/Chat/ChatSidebar';
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

export const metadata: Metadata = {
  title: 'Chat - OpenEU',
  description: 'AI-powered chat interface',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-[calc(100vh-3rem)] !min-h-0">
      <ChatProvider>
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
          <ChatScrollContainer>{children}</ChatScrollContainer>
        </SidebarInset>
      </ChatProvider>
    </SidebarProvider>
  );
}
