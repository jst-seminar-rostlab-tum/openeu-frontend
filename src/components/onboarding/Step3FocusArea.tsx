'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { z } from 'zod';

import { FocusAreaForm } from '@/components/forms/FocusAreaFormInner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateFocusArea } from '@/domain/actions/onboarding';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';
import { focusAreaSchema } from '@/domain/schemas/OnboardingForm';

export const Step3FocusArea = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  const handleSubmit = async (data: z.infer<typeof focusAreaSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    data.topicList.forEach((topic) => formData.append('topicList', topic));
    data.geographicFocus.forEach((focus) =>
      formData.append('geographicFocus', focus),
    );
    data.keyRegulatoryAreas.forEach((area) =>
      formData.append('keyRegulatoryAreas', area),
    );

    // Call server action
    const result = await updateFocusArea(formData);

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
          <CardTitle className="text-2xl">Focus Areas</CardTitle>
          <CardDescription className="text-lg">
            Tell us what topics and regions you&apos;re most interested in
          </CardDescription>
        </CardHeader>
      </motion.div>

      <FocusAreaForm onSubmit={handleSubmit} onBack={prevStep} />
    </Card>
  );
};
