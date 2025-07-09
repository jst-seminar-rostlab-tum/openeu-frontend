import { redirect } from 'next/navigation';
import React from 'react';

import { PoliticalRoleForm } from '@/components/forms/PoliticalRoleForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateRoleDetails } from '@/domain/actions/onboarding';
import { ToastOperations } from '@/operations/toast/toastOperations';

async function submitPoliticalRole(formData: FormData) {
  'use server';

  // Add userCategory to the form data
  formData.append('userCategory', 'politician');

  // Call the existing server action
  const result = await updateRoleDetails(formData);

  if (result.success) {
    redirect('/onboarding/3');
  } else {
    ToastOperations.showError({
      title: 'Role Update Failed',
      message:
        'Failed to update your political role details. Please try again.',
    });
  }
  // If there are errors, they will be handled by the form
}

async function goBack() {
  'use server';
  redirect('/onboarding/1');
}

export const Step2PoliticalRoleDetails = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your role</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your political work and expertise
        </CardDescription>
      </CardHeader>

      <PoliticalRoleForm action={submitPoliticalRole} backAction={goBack} />
    </Card>
  );
};
