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

export default function ChatSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const sidebarGroups = ChatSidebarOperations.getSidebarGroups();

  return (
    <Sidebar {...props}>
      <SidebarContent className="scrollbar-custom">
        {sidebarGroups.map((group) => (
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
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
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
