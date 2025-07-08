'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { z } from 'zod';

import { PoliticalRoleForm } from '@/components/forms/PoliticalRoleFormInner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateRoleDetails } from '@/domain/actions/onboarding';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';
import { politicianRoleSchema } from '@/domain/schemas/OnboardingForm';

export const Step2PoliticalRoleDetails = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  const handleSubmit = async (data: z.infer<typeof politicianRoleSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', 'politician');

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
          <CardTitle className="text-2xl">Tell us about your role</CardTitle>
          <CardDescription className="text-lg">
            Help us understand your political work and expertise
          </CardDescription>
        </CardHeader>
      </motion.div>

      <PoliticalRoleForm onSubmit={handleSubmit} onBack={prevStep} />
    </Card>
  );
};
