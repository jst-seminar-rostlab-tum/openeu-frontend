import { NavItemType } from '@/types/navbar';

export const navItems: NavItemType[] = [
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
  {
    title: 'Test2',
    href: '/',
    items: [
      {
        title: 'TestItem3',
        href: '/test3',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
      },
      {
        title: 'TestItem4',
        href: '/test4',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
      },
    ],
  },
];
