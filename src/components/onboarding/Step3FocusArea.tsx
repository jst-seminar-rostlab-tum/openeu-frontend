import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { FocusAreaForm } from '@/components/profile/forms/FocusAreaForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { focusAreaSchema, onboardingSchema } from '@/domain/schemas/profile';

interface Step3FocusAreaProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function Step3FocusArea({ form }: Step3FocusAreaProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Focus Areas</CardTitle>
        <CardDescription className="text-lg">
          Tell us what topics and regions you&apos;re most interested in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FocusAreaForm
          form={
            form as unknown as UseFormReturn<z.infer<typeof focusAreaSchema>>
          }
        />
      </CardContent>
    </Card>
  );
}
