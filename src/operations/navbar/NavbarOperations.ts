import { NavItemType } from '@/domain/entities/navbar/NavItemType';

export default class NavbarOperations {
  static getNavItems(): NavItemType[] {
    return [
      {
        title: 'Calendar',
        href: '/calendar',
      },
      {
        title: 'Map',
        href: '/map',
      },
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Test',
        href: '/',
        items: [
          {
            title: 'TestItem1',
            href: '/test1',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
          },
          {
            title: 'TestItem2',
            href: '/test2',
            description:
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
          },
        ],
      },
    ];
  }
}
