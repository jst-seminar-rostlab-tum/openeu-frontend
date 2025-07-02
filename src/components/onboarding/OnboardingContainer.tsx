'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { fadeInUp } from '@/lib/animations';

import { OnboardingProvider, useOnboarding } from './OnboardingContext';
import { ProgressIndicator } from './ProgressIndicator';
import { Step1Welcome } from './Step1Welcome';
import { Step2PoliticalRole } from './Step2PoliticalRole';
import { Step2RoleAndCompany } from './Step2RoleAndCompany';
import { Step3BusinessDetails } from './Step3BusinessDetails';
import { Step3PolicyFocus } from './Step3PolicyFocus';
import { Step4RegulatoryFocus } from './Step4RegulatoryFocus';
import { Step5Completion } from './Step5Completion';

const OnboardingFlow: React.FC = () => {
  const { currentStep, totalSteps, userCategory } = useOnboarding();

  const renderStep = () => {
    // Step 1 is always the same - Welcome with user category selection
    if (currentStep === 1) {
      return <Step1Welcome />;
    }

    // Different flows based on user category
    if (userCategory === 'politician') {
      const politicianSteps: Record<number, React.ReactElement> = {
        2: <Step2PoliticalRole />,
        3: <Step3PolicyFocus />,
        4: <Step4RegulatoryFocus />,
        5: <Step5Completion />,
      };
      return politicianSteps[currentStep] || <Step1Welcome />;
    } else {
      // Entrepreneur flow (default)
      const entrepreneurSteps: Record<number, React.ReactElement> = {
        2: <Step2RoleAndCompany />,
        3: <Step3BusinessDetails />,
        4: <Step4RegulatoryFocus />,
        5: <Step5Completion />,
      };
      return entrepreneurSteps[currentStep] || <Step1Welcome />;
    }
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
