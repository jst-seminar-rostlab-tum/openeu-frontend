'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { PathDecisionForm } from '@/components/forms/PathDecisionFormInner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updatePathDecision } from '@/domain/actions/onboarding';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';

export const Step1PathDecision = () => {
  const { nextStep } = useOnboardingNavigation();

  const handleSubmit = async (data: {
    userCategory: 'entrepreneur' | 'politician';
  }) => {
    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', data.userCategory);

    // Call server action
    const result = await updatePathDecision(formData);

    if (result.success) {
      // Navigate to next step
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
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription className="text-lg">
            Help us personalize your OpenEU experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <PathDecisionForm onSubmit={handleSubmit} />
    </Card>
  );
};
