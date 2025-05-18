import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { NavItemType } from '@/domain/entities/navbar/NavItemType';
import { cn } from '@/lib/utils';

function MobileNavLink({ item }: { item: NavItemType }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'w-full !justify-start',
        buttonVariants({ variant: 'ghost' }),
      )}
    >
      <span>{item.title}</span>
    </Link>
  );
}

export function MobileNavItem({ item }: { item: NavItemType }) {
  if ('items' in item && item.items) {
    return (
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between !px-4">
            <span>{item.title}</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6">
          {item.items.map((subItem) => (
            <MobileNavLink key={subItem.title} item={subItem} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return <MobileNavLink item={item} />;
}
