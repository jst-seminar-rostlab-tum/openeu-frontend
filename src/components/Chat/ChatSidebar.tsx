'use client';

import { Trash } from 'lucide-react';
import { type ComponentProps, useMemo, useState } from 'react';

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
import ChatSidebarOperations from '@/operations/chat/ChatSidebarOperations';

export default function ChatSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = useState('');
  const staticGroups = ChatSidebarOperations.getSidebarGroups();
  const { user } = useAuth();
  const { data: chatSessions, isLoading, error } = useChatSessions();

  // Memoized filtered chat sessions for optimal performance
  const filteredChatSessions = useMemo(() => {
    if (!chatSessions || !searchQuery.trim()) {
      return chatSessions;
    }

    return chatSessions.filter((session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }, [chatSessions, searchQuery]);

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

                {!isLoading &&
                  filteredChatSessions &&
                  filteredChatSessions.length === 0 &&
                  chatSessions &&
                  chatSessions.length > 0 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton disabled>
                        No chats match your search
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                {filteredChatSessions?.map((session) => (
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
