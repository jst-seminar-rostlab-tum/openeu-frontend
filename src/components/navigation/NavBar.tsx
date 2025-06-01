import { Menu } from 'lucide-react';
import Link from 'next/link';

import { AuthAwareNavContent } from '@/components/navigation/AuthAwareNavContent';
import { AuthAwareNavItems } from '@/components/navigation/AuthAwareNavItems';
import { MobileNavItem } from '@/components/navigation/MobileNav';
import { Button } from '@/components/ui/button';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { verifySession } from '@/lib/dal';
import NavbarOperations from '@/operations/navbar/NavbarOperations';

export default async function NavBar() {
  const navItems = NavbarOperations.getNavItems();

  // Get server-side auth state
  const session = await verifySession();
  const isAuthenticated = !!session;

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

          {/* Desktop Navigation - Only show when authenticated */}
          <NavigationMenu className="hidden sm:block">
            <AuthAwareNavItems
              navItems={navItems}
              initialIsAuthenticated={isAuthenticated}
            />
          </NavigationMenu>
        </div>

        {/* Right side navigation */}
        <AuthAwareNavContent initialIsAuthenticated={isAuthenticated} />

        {/* Mobile Navigation - Only show when authenticated */}
        {isAuthenticated && (
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
        )}
      </div>
    </div>
  );
}
