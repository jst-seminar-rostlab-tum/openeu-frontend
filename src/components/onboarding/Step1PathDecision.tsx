import { redirect } from 'next/navigation';
import React from 'react';

import { PathDecisionForm } from '@/components/forms/PathDecisionForm';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updatePathDecision } from '@/domain/actions/onboarding';

async function submitPathDecision(formData: FormData) {
  'use server';
  // Call the existing server action
  const result = await updatePathDecision(formData);
  if (result.success) {
    // Get the user category to determine which step 2 to redirect to
    const userCategory = formData.get('userCategory') as string;

    if (userCategory === 'entrepreneur') {
      redirect('/onboarding/2'); // Goes to Step2EntrepreneurRoleDetails
    } else if (userCategory === 'politician') {
      redirect('/onboarding/2'); // Goes to Step2PoliticalRoleDetails
    }
  }
  // If there are errors, they will be handled by the form
}

export const Step1PathDecision = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
        <CardDescription className="text-lg">
          Help us personalize your OpenEU experience
        </CardDescription>
      </CardHeader>

      <PathDecisionForm action={submitPathDecision} />
    </Card>
  );
};
