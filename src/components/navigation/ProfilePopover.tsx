'use client';

import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { extractInitials } from '@/lib/utils';

export function ProfilePopover() {
  // These values will be replaced with session data later
  const userName = 'Test User';
  const userEmail = 'user@example.com';
  const userImage = '/avatar.png';
  const userInitials = extractInitials(userName);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar>
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
        <Separator />
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" className="justify-start" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </Button>
        </div>
        <Separator />
        <Button size="sm">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
