'use client';

import { Trash } from 'lucide-react';
import { type ComponentProps } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import ChatSidebarOperations from '@/operations/chat/ChatSidebarOperations';
import { type ChatSession } from '@/repositories/chatRepository';

interface ChatSidebarProps extends ComponentProps<typeof Sidebar> {
  sessions?: ChatSession[];
  isLoading?: boolean;
  onNewChat?: () => void;
  onSessionClick?: (sessionId: string) => void;
  onClearConversations?: () => void;
}

export default function ChatSidebar({
  sessions = [],
  isLoading = false,
  onNewChat,
  onSessionClick,
  onClearConversations,
  ...props
}: ChatSidebarProps) {
  const sidebarGroups = ChatSidebarOperations.getSidebarGroups(
    sessions,
    onNewChat,
    onSessionClick,
  );

  return (
    <Sidebar {...props}>
      <SidebarContent className="scrollbar-custom">
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">
            Loading chats...
          </div>
        ) : (
          sidebarGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.length === 0 && group.label === 'Chats' ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      No chats yet
                    </div>
                  ) : (
                    group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={item.onClick}
                          className="truncate"
                        >
                          {item.icon && <item.icon />}
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onClearConversations}>
              <Trash />
              Clear conversations
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
