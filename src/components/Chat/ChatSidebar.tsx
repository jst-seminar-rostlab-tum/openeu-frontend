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
import { useChatSessions } from '@/domain/hooks/chat-hooks';
import { useAuth } from '@/domain/hooks/useAuth';
import ChatSidebarOperations from '@/operations/chat/ChatSidebarOperations';

export default function ChatSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const staticGroups = ChatSidebarOperations.getSidebarGroups();
  const { user } = useAuth();
  const { data: chatSessions, isLoading, error } = useChatSessions();

  return (
    <Sidebar {...props}>
      <SidebarContent className="scrollbar-custom">
        {/* Static groups (Actions, Templates) */}
        {staticGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={item.onClick}
                      className="truncate"
                    >
                      {item.icon && <item.icon />}
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Dynamic chat sessions */}
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Chat Sessions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {isLoading && (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>
                      Loading sessions...
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {error && (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>
                      Error loading sessions
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {chatSessions && chatSessions.length === 0 && !isLoading && (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>
                      No chat sessions yet
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {chatSessions?.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      onClick={() => {
                        // TODO: Navigate to specific chat session
                        console.log('Navigate to session:', session.id);
                      }}
                      className="truncate"
                    >
                      {session.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                // TODO: Implement clear conversations
                console.log('Clear conversations clicked');
              }}
            >
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
