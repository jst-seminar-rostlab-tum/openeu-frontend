import { Search, SquarePen } from 'lucide-react';

import { SidebarGroupData } from '@/domain/entities/chat/Sidebar';

export default class ChatSidebarOperations {
  static getSidebarGroups(): SidebarGroupData[] {
    return [
      {
        label: 'Actions',
        items: [
          {
            icon: SquarePen,
            title: 'New Chat',
            onClick: () => {
              // TODO: Implement new chat functionality
              console.log('New chat clicked');
            },
          },
          {
            icon: Search,
            title: 'Search',
            onClick: () => {
              // TODO: Implement search functionality
              console.log('Search clicked');
            },
          },
        ],
      },
      {
        label: 'Templates',
        items: [
          {
            title: 'EU Legislation Analysis',
            onClick: () => {
              // TODO: Implement template functionality
              console.log('Template clicked: EU Legislation Analysis');
            },
          },
          {
            title: 'Policy Impact Assessment',
            onClick: () => {
              console.log('Template clicked: Policy Impact Assessment');
            },
          },
          {
            title: 'Regulatory Compliance',
            onClick: () => {
              console.log('Template clicked: Regulatory Compliance');
            },
          },
        ],
      },
    ];
  }
}
