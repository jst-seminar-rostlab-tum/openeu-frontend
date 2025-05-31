'use client';

import { useRouter } from 'next/navigation';

import { NotificationsPopover } from '@/components/navigation/NotificationsPopover';
import { ProfilePopover } from '@/components/navigation/ProfilePopover';
import { SettingsPopover } from '@/components/navigation/SettingsPopover';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/domain/hooks/useAuth';

interface AuthAwareNavContentProps {
  initialIsAuthenticated: boolean;
}

export function AuthAwareNavContent({
  initialIsAuthenticated,
}: AuthAwareNavContentProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAuthenticated = loading ? initialIsAuthenticated : !!user;

  const handleSignIn = () => {
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-md" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button variant="default" size="sm" onClick={handleSignIn}>
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <SettingsPopover />
      <NotificationsPopover />
      <ProfilePopover />
    </div>
  );
}
