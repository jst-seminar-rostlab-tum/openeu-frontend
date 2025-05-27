interface InboxItem {
  id: string;
  title: string;
  date: string;
  country: string;
  relevanceScore: number;
}

interface InboxItemProps {
  regulation: InboxItem;
  isSelected: boolean;
  onSelect: () => void;
}

export type { InboxItem, InboxItemProps };
