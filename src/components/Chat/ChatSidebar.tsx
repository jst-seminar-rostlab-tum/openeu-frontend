'use client';

import { Trash } from 'lucide-react';
import { type ComponentProps, useMemo, useState } from 'react';

import { useChatContext } from '@/app/chat/ChatContext';
import { SearchBar } from '@/components/SearchBar/SearchBar';
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
import { cn } from '@/lib/utils';
import ChatSidebarOperations from '@/operations/chat/ChatSidebarOperations';

export default function ChatSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { data: chatSessions, isLoading, error } = useChatSessions();
  const { createNewChat, sendTemplate, switchToSession, currentSessionId } =
    useChatContext();

  // Memoized filtered chat sessions for optimal performance
  const filteredChatSessions = useMemo(() => {
    if (!chatSessions || !searchQuery.trim()) {
      return chatSessions;
    }

    return chatSessions.filter((session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }, [chatSessions, searchQuery]);

  // Get sidebar groups from operations
  const staticGroups = ChatSidebarOperations.getSidebarGroups({
    handleNewChat: createNewChat,
    handleTemplateClick: sendTemplate,
  });

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
                      className="truncate text-left"
                    >
                      {'icon' in item && item.icon && <item.icon />}
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Chat Sessions */}
        {user && (
          <SidebarGroup>
            <SidebarGroupLabel>Chat Sessions</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-1 mb-2">
                <SearchBar
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  placeholder="Search chats..."
                />
              </div>
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

                {!isLoading && chatSessions && chatSessions.length === 0 && (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>
                      No chat sessions yet
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {filteredChatSessions?.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      onClick={() => switchToSession(session.id)}
                      className={cn(
                        'truncate',
                        currentSessionId === session.id && 'bg-accent',
                      )}
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
