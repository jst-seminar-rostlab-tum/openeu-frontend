'use client';

import NavItem from '@/components/navigation/NavItem';
import { NavigationMenuList } from '@/components/ui/navigation-menu';
import { NavItemType } from '@/domain/entities/navbar/NavItemType';
import { useAuth } from '@/domain/hooks/useAuth';

interface AuthAwareNavItemsProps {
  navItems: NavItemType[];
  initialIsAuthenticated: boolean;
}

export function AuthAwareNavItems({
  navItems,
  initialIsAuthenticated,
}: AuthAwareNavItemsProps) {
  const { user, loading } = useAuth();

  const isAuthenticated = loading ? initialIsAuthenticated : !!user;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <NavigationMenuList>
      {navItems.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </NavigationMenuList>
  );
}
