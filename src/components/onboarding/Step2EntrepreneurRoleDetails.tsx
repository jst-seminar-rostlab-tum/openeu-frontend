'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import z from 'zod';

import { EntrepreneurRoleForm } from '@/components/profile/forms/EntrepreneurRoleForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Profile } from '@/domain/entities/profile/generated-types';
import { useProfileUpdateMutation } from '@/domain/hooks/profileHooks';
import { entrepreneurRoleSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { Spinner } from '../ui/spinner';

interface Step2EntrepreneurRoleDetailsProps {
  initialData?: Profile;
  userId: string;
}

export default function Step2EntrepreneurRoleDetails({
  initialData,
  userId,
}: Step2EntrepreneurRoleDetailsProps) {
  const router = useRouter();
  const profileMutation = useProfileUpdateMutation({
    onSuccess: () => {
      ToastOperations.showSuccess({
        title: 'Profile Updated',
        message: 'Your information has been saved successfully.',
      });
      router.push('/onboarding/3');
    },
    onError: () => {
      ToastOperations.showError({
        title: 'Profile Update Failed',
        message: 'Failed to update your profile. Please try again.',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof entrepreneurRoleSchema>) =>
    profileMutation.mutate({ userId: userId, data });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your business</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your company and industry
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EntrepreneurRoleForm initialData={initialData} onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push('/onboarding/1')}>
          Back
        </Button>
        <Button
          type="submit"
          form="entrepreneur-role-form"
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
