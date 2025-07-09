import { redirect } from 'next/navigation';
import React from 'react';

import { CompletionForm } from '@/components/forms/CompletionForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function submitCompletion(_formData: FormData) {
  'use server';

  // For now, we'll just simulate saving the newsletter preference
  // In a real implementation, you would save this to the user's profile

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Navigate to final step
  redirect('/onboarding/5');
}

async function goBack() {
  'use server';
  redirect('/onboarding/3');
}

export const Step4Completion = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription className="text-lg">
          Just a few final preferences to personalize your experience
        </CardDescription>
      </CardHeader>

      <CompletionForm action={submitCompletion} backAction={goBack} />
    </Card>
  );
};
