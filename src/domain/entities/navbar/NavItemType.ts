interface NavItemContent {
  title: string;
  href: string;
  description?: string;
}

interface NavItemWithContent extends NavItemContent {
  items?: NavItemContent[];
}

export type NavItemType = NavItemContent | NavItemWithContent;
