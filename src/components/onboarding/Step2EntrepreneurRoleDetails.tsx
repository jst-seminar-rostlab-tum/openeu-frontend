import { redirect } from 'next/navigation';
import React from 'react';

import { EntrepreneurRoleForm } from '@/components/forms/EntrepreneurRoleForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateRoleDetails } from '@/domain/actions/onboarding';

async function submitEntrepreneurRole(formData: FormData) {
  'use server';

  // Add userCategory to the form data
  formData.append('userCategory', 'entrepreneur');

  // Call the existing server action
  const result = await updateRoleDetails(formData);

  if (result.success) {
    redirect('/onboarding/3');
  }
  // If there are errors, they will be handled by the form
}

async function goBack() {
  'use server';
  redirect('/onboarding/1');
}

export const Step2EntrepreneurRoleDetails = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your business</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your company and industry
        </CardDescription>
      </CardHeader>

      <EntrepreneurRoleForm
        action={submitEntrepreneurRole}
        backAction={goBack}
      />
    </Card>
  );
};
