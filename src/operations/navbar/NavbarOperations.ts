import { NavItemType } from '@/domain/entities/navbar/NavItemType';

export default class NavbarOperations {
  static getNavItems(): NavItemType[] {
    return [
      {
        title: 'About',
        href: '/about',
      },
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
    ];
  }
}
