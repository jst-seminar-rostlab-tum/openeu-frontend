import { Home } from 'lucide-react';

type IconType = typeof Home;

interface SidebarItem {
  title: string;
  icon?: IconType;
  onClick: () => void;
}

export interface SidebarGroupData {
  label: string;
  items: SidebarItem[];
}
