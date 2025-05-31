'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

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
import { clearAllConversations } from '@/domain/action/chatActions';
import { useUserSessions } from '@/domain/hooks/chatHooks';

// TODO: Replace with actual user ID from auth
const USER_ID = 'user-123';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const {
    data: sessions = [],
    isLoading: isLoadingSessions,
    error: sessionsError,
  } = useUserSessions(USER_ID);

  const handleNewChat = () => {
    router.push('/chat');
  };

  const handleSessionClick = (sessionId: string) => {
    router.push(`/chat?session=${sessionId}`);
  };

  const handleClearConversations = () => {
    startTransition(async () => {
      try {
        await clearAllConversations(USER_ID);
        toast.success('Conversations cleared successfully');
        router.push('/chat');
      } catch (error) {
        toast.error('Failed to clear conversations');
        console.error('Error clearing conversations:', error);
      }
    });
  };

  if (sessionsError) {
    console.error('Error loading sessions:', sessionsError);
  }

  return (
    <SidebarProvider className="h-[calc(100vh-3rem)] !min-h-0">
      <ChatSidebar
        variant="sidebar"
        className="mt-12 h-[calc(100vh-3rem)]"
        sessions={sessions}
        isLoading={isLoadingSessions}
        onNewChat={handleNewChat}
        onSessionClick={handleSessionClick}
        onClearConversations={handleClearConversations}
      />
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
