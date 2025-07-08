'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { z } from 'zod';

import { CompletionForm } from '@/components/forms/CompletionFormInner';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';
import { completionSchema } from '@/domain/schemas/OnboardingForm';

export const Step4Completion = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (_data: z.infer<typeof completionSchema>) => {
    setIsSubmitting(true);
    try {
      // For now, we'll just simulate saving the newsletter preference
      // In a real implementation, you would save this to the user's profile
      // Newsletter frequency: _data.newsletterFrequency

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to final step
      nextStep();
    } catch (_error) {
      // Handle error silently for demo
    } finally {
      setIsSubmitting(false);
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
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription className="text-lg">
            Just a few final preferences to personalize your experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CompletionForm
        onSubmit={handleSubmit}
        onBack={prevStep}
        isSubmitting={isSubmitting}
      />
    </Card>
  );
};
