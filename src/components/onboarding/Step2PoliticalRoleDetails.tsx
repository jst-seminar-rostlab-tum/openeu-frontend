'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import z from 'zod';

import { PoliticalRoleForm } from '@/components/profile/forms/PoliticalRoleForm';
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
import { politicianRoleSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

interface Step2PoliticalRoleDetailsProps {
  initialData?: Profile;
  userId: string;
}

export default function Step2PoliticalRoleDetails({
  initialData,
  userId,
}: Step2PoliticalRoleDetailsProps) {
  const router = useRouter();
  const profileMutation = useProfileUpdateMutation({
    onSuccess: () => {
      ToastOperations.showSuccess({
        title: 'Profile Updated',
        message: 'Your information has been saved successfully.',
      });
      router.push('/onboarding/step/3');
    },
    onError: () => {
      ToastOperations.showError({
        title: 'Profile Update Failed',
        message: 'Failed to update your profile. Please try again.',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof politicianRoleSchema>) =>
    profileMutation.mutate({ userId: userId, data });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your role</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your political work and expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PoliticalRoleForm onSubmit={onSubmit} initialData={initialData} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/onboarding/step/1')}
        >
          Back
        </Button>
        <Button
          type="submit"
          form="political-role-form"
          disabled={profileMutation.isPending}
        >
          {profileMutation.isPending ? 'Saving...' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
}
