'use client';

import { CheckCircle2, Rss } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  useSubscribeToLegislationMutation,
  useUnsubscribeToLegislationMutation,
} from '@/domain/hooks/legislative-hooks';
import { useAuth } from '@/domain/hooks/useAuth';

import { Spinner } from '../ui/spinner';

interface SubscribeButtonProps {
  legislationId: string;
  subscribed?: boolean;
}

export function SubscribeButton({
  legislationId,
  subscribed,
}: SubscribeButtonProps) {
  const router = useRouter();

  const { user } = useAuth();

  const subscribeToLegislation = useSubscribeToLegislationMutation();
  const unsubscribeToLegislation = useUnsubscribeToLegislationMutation();

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

  const handleUnsubscribe = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    unsubscribeToLegislation.mutate({
      userId: user.id,
      legislationId,
    });
  };

  const isPending =
    subscribeToLegislation.isPending || unsubscribeToLegislation.isPending;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={subscribed ? handleUnsubscribe : handleSubscribe}
      disabled={isPending}
    >
      {subscribed ? (
        <>
          <CheckCircle2 className="h-3 w-3" />
          Unsubscribe from Legislation
        </>
      ) : (
        <>
          <Rss className="h-3 w-3" />
          Subscribe to Legislation
        </>
      )}
      {isPending && <Spinner size="xsmall" show />}
    </Button>
  );
}
