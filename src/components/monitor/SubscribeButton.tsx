'use client';

import { Rss } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useSubscribeToLegislationMutation } from '@/domain/hooks/legislative-hooks';
import { useAuth } from '@/domain/hooks/useAuth';

import { Spinner } from '../ui/spinner';

interface SubscribeButtonProps {
  legislationId: string;
}

export function SubscribeButton({ legislationId }: SubscribeButtonProps) {
  const router = useRouter();

  const { user } = useAuth();

  const subscribeToLegislation = useSubscribeToLegislationMutation();

  const handleSubscribe = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    subscribeToLegislation.mutate({
      userId: user.id,
      legislationId,
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSubscribe}
      disabled={subscribeToLegislation.isPending}
    >
      <Rss className="h-3 w-3" />
      Subscribe to Legislation
      {subscribeToLegislation.isPending && <Spinner size="xsmall" show />}
    </Button>
  );
}
