'use client';

import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/domain/hooks/useAuth';
import { extractInitials, getDisplayName } from '@/lib/utils';

export function ProfilePopover() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Button
        variant="ghost"
        className="relative h-9 w-9 rounded-full p-0"
        disabled
      >
        <Avatar>
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  if (!user) {
    return null;
  }

  const userData = {
    email: user.email,
    name: getDisplayName(user),
    image: user.user_metadata?.avatar_url as string | undefined,
  };

  const userInitials = extractInitials(userData.name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          <Avatar>
            <AvatarImage src={userData.image} alt={userData.name} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-sm text-muted-foreground">{userData.email}</p>
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
        <Button size="sm" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
