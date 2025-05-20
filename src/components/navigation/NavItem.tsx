import Link from 'next/link';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import type { NavItemType } from '@/domain/entities/navbar/NavItemType';

export default function NavItem({ item }: { item: NavItemType }) {
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
