import { SquarePen } from 'lucide-react';

interface SidebarItem {
  title: string;
  onClick: () => void;
  icon?: React.ComponentType;
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

interface ChatSidebarOperationsConfig {
  handleNewChat: () => void;
  handleTemplateClick: (message: string) => void;
}

const TEMPLATES = [
  {
    title: 'Last 3 Meetings',
    message: 'Show me the last 3 meetings',
  },
];

class ChatSidebarOperations {
  static getTemplates() {
    return TEMPLATES;
  }

  static getSidebarGroups(config: ChatSidebarOperationsConfig): SidebarGroup[] {
    return [
      {
        label: 'Actions',
        items: [
          {
            title: 'New Chat',
            onClick: config.handleNewChat,
            icon: SquarePen,
          },
        ],
      },
      {
        label: 'Quick Questions',
        items: TEMPLATES.map((template) => ({
          title: template.title,
          onClick: () => config.handleTemplateClick(template.message),
        })),
      },
    ];
  }
}

export default ChatSidebarOperations;
