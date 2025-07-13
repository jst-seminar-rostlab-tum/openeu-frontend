import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { PathDecisionForm } from '@/components/profile/forms/PathDecisionForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { onboardingSchema } from '@/domain/schemas/profile';

interface Step1PathDecisionProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function Step1PathDecision({ form }: Step1PathDecisionProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
        <CardDescription className="text-lg">
          Help us personalize your OpenEU experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PathDecisionForm form={form} />
      </CardContent>
    </Card>
  );
}
