'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { fadeInUp } from '@/lib/animations';

import { OnboardingProvider, useOnboarding } from './OnboardingContext';
import { ProgressIndicator } from './ProgressIndicator';
import { Step1Welcome } from './Step1Welcome';
import { Step2PathDecision } from './Step2PathDecision';
import { Step3RoleDetails } from './Step3RoleDetails';
import { Step4FocusArea } from './Step4FocusArea';
import { Step5Completion } from './Step5Completion';
import { Step6Preview } from './Step6Preview';

const OnboardingFlow: React.FC = () => {
  const { currentStep, totalSteps } = useOnboarding();

  const renderStep = () => {
    const steps: Record<number, React.ReactElement> = {
      1: <Step1Welcome />, // Registration form
      2: <Step2PathDecision />, // Path decision
      3: <Step3RoleDetails />, // Role details (both paths)
      4: <Step4FocusArea />, // Focus areas
      5: <Step5Completion />, // Complete profile
      6: <Step6Preview />, // Complete profile
    };
    return steps[currentStep] || <Step1Welcome />;
  };

  return (
    <motion.div
      className="min-h-screen bg-background p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const OnboardingContainer: React.FC = () => {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
};
