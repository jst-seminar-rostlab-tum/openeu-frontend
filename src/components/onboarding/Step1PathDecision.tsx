'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import z from 'zod';

import { PathDecisionForm } from '@/components/profile/forms/PathDecisionForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Profile } from '@/domain/entities/profile/generated-types';
import { useProfileUpdateMutation } from '@/domain/hooks/profileHooks';
import { pathDecisionSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

interface Step1PathDecisionProps {
  initialData?: Profile;
  userId: string;
}

export default function Step1PathDecision({
  initialData,
  userId,
}: Step1PathDecisionProps) {
  const router = useRouter();
  const profileMutation = useProfileUpdateMutation({
    onSuccess: () => {
      ToastOperations.showSuccess({
        title: 'Path Decision Successful',
        message: 'Your path decision has been saved successfully.',
      });
      router.push('/onboarding/2');
    },
    onError: () => {
      ToastOperations.showError({
        title: 'Profile Update Failed',
        message: 'Failed to update your profile. Please try again.',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof pathDecisionSchema>) =>
    profileMutation.mutate({ userId: userId, data });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
        <CardDescription className="text-lg">
          Help us personalize your OpenEU experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PathDecisionForm onSubmit={onSubmit} initialData={initialData} />
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          type="submit"
          form="path-decision-form"
          disabled={profileMutation.isPending}
        >
          {profileMutation.isPending ? (
            <Spinner className="text-white dark:text-black" size="small" />
          ) : (
            'Next'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
