'use client';

import { CheckCircle2, Rss } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  subscribeToLegislation,
  unsubscribeFromLegislation,
} from '@/domain/actions/monitor';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { Spinner } from '../ui/spinner';

interface SubscribeButtonProps {
  legislationId: string;
  subscribed: boolean;
}

export function SubscribeButton({
  legislationId,
  subscribed,
}: SubscribeButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleSubscribe = async () => {
    setIsPending(true);
    try {
      await subscribeToLegislation(legislationId);
      ToastOperations.showSuccess({
        title: 'Subscription Successful',
        message: `You have successfully subscribed to legislation ${legislationId}.`,
      });
    } catch (error) {
      ToastOperations.showError({
        title: 'Subscription Failed',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsPending(true);
    try {
      await unsubscribeFromLegislation(legislationId);
      ToastOperations.showSuccess({
        title: 'Unsubscription Successful',
        message: `You have successfully unsubscribed from legislation ${legislationId}.`,
      });
    } catch (error) {
      ToastOperations.showError({
        title: 'Unsubscription Failed',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsPending(false);
    }
  };

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
