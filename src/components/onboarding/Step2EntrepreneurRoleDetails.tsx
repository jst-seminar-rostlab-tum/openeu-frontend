'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { z } from 'zod';

import { EntrepreneurRoleForm } from '@/components/forms/EntrepreneurRoleFormInner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateRoleDetails } from '@/domain/actions/onboarding';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';
import { entrepreneurRoleSchema } from '@/domain/schemas/OnboardingForm';

export const Step2EntrepreneurRoleDetails = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  const handleSubmit = async (data: z.infer<typeof entrepreneurRoleSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', 'entrepreneur');

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else {
        formData.append(key, String(value));
      }
    });

    // Call server action
    const result = await updateRoleDetails(formData);

    if (result.success) {
      nextStep();
    } else if (result.fieldErrors) {
      // Handle server validation errors - could show toast or other UI feedback
      // For now, the form will handle validation on the client side
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Tell us about your business
          </CardTitle>
          <CardDescription className="text-lg">
            Help us understand your company and industry
          </CardDescription>
        </CardHeader>
      </motion.div>

      <EntrepreneurRoleForm onSubmit={handleSubmit} onBack={prevStep} />
    </Card>
  );
};
