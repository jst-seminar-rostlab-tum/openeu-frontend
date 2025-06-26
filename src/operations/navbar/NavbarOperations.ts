import { NavItemType } from '@/domain/entities/navbar/NavItemType';

export default class NavbarOperations {
  static getNavItems(): NavItemType[] {
    return [
      {
        title: 'Map',
        href: '/map',
      },
      {
        title: 'Calendar',
        href: '/calendar',
      },

      {
        title: 'Chat',
        href: '/chat',
      },
      {
        title: 'Inbox',
        href: '/inbox',
      },
      {
        title: 'Monitor',
        href: '/monitor',
      },
    ];
  }
}
