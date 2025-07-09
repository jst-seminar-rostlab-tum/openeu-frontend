import { redirect } from 'next/navigation';
import React from 'react';

import { FocusAreaForm } from '@/components/forms/FocusAreaForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateFocusArea } from '@/domain/actions/onboarding';
import { ToastOperations } from '@/operations/toast/toastOperations';

async function submitFocusArea(formData: FormData) {
  'use server';

  // Call the existing server action
  const result = await updateFocusArea(formData);

  if (result.success) {
    redirect('/onboarding/4');
  }
  // If there are errors, they will be handled by the form
  else {
    ToastOperations.showError({
      title: 'Focus Area Update Failed',
      message: 'Failed to update your focus areas. Please try again.',
    });
  }
}

async function goBack() {
  'use server';
  redirect('/onboarding/2');
}

export const Step3FocusArea = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Focus Areas</CardTitle>
        <CardDescription className="text-lg">
          Tell us what topics and regions you&apos;re most interested in
        </CardDescription>
      </CardHeader>

      <FocusAreaForm action={submitFocusArea} backAction={goBack} />
    </Card>
  );
};
