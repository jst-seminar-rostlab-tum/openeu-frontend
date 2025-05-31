import { Search, SquarePen } from 'lucide-react';

import { SidebarGroupData } from '@/domain/entities/chat/Sidebar';
import { type ChatSession } from '@/repositories/chatRepository';

export default class ChatSidebarOperations {
  static getSidebarGroups(
    sessions: ChatSession[] = [],
    onNewChat?: () => void,
    onSessionClick?: (sessionId: string) => void,
  ): SidebarGroupData[] {
    return [
      {
        label: 'Actions',
        items: [
          {
            icon: SquarePen,
            title: 'New Chat',
            onClick: () => {
              onNewChat?.();
            },
          },
          {
            icon: Search,
            title: 'Search',
            onClick: () => {
              console.log('Search functionality - to be implemented');
            },
          },
        ],
      },
      {
        label: 'Templates',
        items: [
          {
            title:
              'Comprehensive EU Legislation Analysis and Impact Assessment Framework',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
          {
            title:
              'Policy Impact Assessment with Cross-Border Considerations and Stakeholder Analysis',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
          {
            title: 'Member State Comparison',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
          {
            title:
              'Complete Guide to EU Funding Mechanisms and Grant Application Procedures 2024-2027',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
          {
            title: 'Regulatory Compliance',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
          {
            title:
              'European Green Deal Implementation Projects and Environmental Impact Studies',
            onClick: () => {
              console.log('Template functionality - to be implemented');
            },
          },
        ],
      },
      {
        label: 'Chats',
        items: sessions.map((session) => ({
          title: session.title,
          onClick: () => {
            onSessionClick?.(session.id.toString());
          },
        })),
      },
    ];
  }
}
