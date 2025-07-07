import { notFound, redirect } from 'next/navigation';
import React from 'react';

import { Step1PathDecision } from '@/components/onboarding/Step1PathDecision';
import { Step2EntrepreneurRoleDetails } from '@/components/onboarding/Step2EntrepreneurRoleDetails';
import { Step2PoliticalRoleDetails } from '@/components/onboarding/Step2PoliticalRoleDetails';
import { Step3FocusArea } from '@/components/onboarding/Step3FocusArea';
import { Step4Completion } from '@/components/onboarding/Step4Completion';
import { Step5Preview } from '@/components/onboarding/Step5Preview';

interface OnboardingStepPageProps {
  params: Promise<{
    step: string;
  }>;
  searchParams: Promise<{
    userCategory?: 'entrepreneur' | 'politician';
  }>;
}

const VALID_STEPS = ['1', '2', '3', '4', '5'];
const TOTAL_STEPS = 5;

export default async function OnboardingStepPage({
  params,
  searchParams,
}: OnboardingStepPageProps) {
  const { step } = await params;
  const { userCategory } = await searchParams;

  // Validate step parameter
  if (!VALID_STEPS.includes(step)) {
    notFound();
  }

  const currentStep = parseInt(step, 10);

  // For step 2 and beyond, userCategory is required
  if (currentStep > 1 && !userCategory) {
    redirect('/onboarding/1');
  }

  // Render the appropriate step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PathDecision />;
      case 2:
        if (userCategory === 'entrepreneur') {
          return <Step2EntrepreneurRoleDetails />;
        } else if (userCategory === 'politician') {
          return <Step2PoliticalRoleDetails />;
        } else {
          redirect('/onboarding/1');
        }
        break;
      case 3:
        return <Step3FocusArea />;
      case 4:
        return <Step4Completion />;
      case 5:
        return <Step5Preview />;
      default:
        notFound();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div>{renderStep()}</div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_STEPS.map((step) => ({
    step,
  }));
}
