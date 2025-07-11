'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { PoliticalRoleForm } from '@/components/profile/forms/PoliticalRoleForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { onboardingSchema } from '@/domain/schemas/profile';

interface Step2PoliticalRoleDetailsProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function Step2PoliticalRoleDetails({
  form,
}: Step2PoliticalRoleDetailsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Tell us about your role</CardTitle>
        <CardDescription className="text-lg">
          Help us understand your political work and expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PoliticalRoleForm form={form} />
      </CardContent>
    </Card>
  );
}
