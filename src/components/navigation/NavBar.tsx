import { Menu } from 'lucide-react';
import Link from 'next/link';

import { MobileNavItem } from '@/components/navigation/MobileNav';
import NavItem from '@/components/navigation/NavItem';
import { NotificationsPopover } from '@/components/navigation/NotificationsPopover';
import { ProfilePopover } from '@/components/navigation/ProfilePopover';
import { SettingsPopover } from '@/components/navigation/SettingsPopover';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navItems } from '@/data/navbar';

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b h-12">
      <div className="px-4 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-accent-foreground transition-colors italic"
          >
            OpenEU
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden sm:block">
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
          <ProfilePopover />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-10 w-10" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col px-2">
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
