import { ChevronsUpDown, Menu } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { NotificationsPopover } from './NotificationsPopover';
import { SettingsPopover } from './SettingsPopover';

interface NavItemContent {
  title: string;
  href: string;
  description?: string;
}

interface NavItemWithContent extends NavItemContent {
  items?: NavItemContent[];
}

type NavItem = NavItemContent | NavItemWithContent;

const navItems: NavItem[] = [
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

function NavItem({ item }: { item: NavItem }) {
  if ('items' in item && item.items) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    href={subItem.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      {subItem.title}
                    </div>
                    {subItem.description && (
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {subItem.description}
                      </p>
                    )}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
        <Link href={item.href}>{item.title}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  if ('items' in item && item.items) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-accent-foreground">
          {item.title}
          <ChevronsUpDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 space-y-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              href={subItem.href}
              className="block text-sm text-muted-foreground hover:text-accent-foreground"
            >
              {subItem.title}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href}
      className="block py-2 text-sm font-medium hover:text-accent-foreground"
    >
      {item.title}
    </Link>
  );
}

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b h-12">
      <div className="px-4 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-accent-foreground transition-colors italic"
          >
            OpenEU
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-2">
          <SettingsPopover />
          <NotificationsPopover />
          <Avatar className="h-9 w-9 hidden md:flex">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>TU</AvatarFallback>
          </Avatar>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6">
                {navItems.map((item) => (
                  <MobileNavItem key={item.title} item={item} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
