import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import Step1PathDecision from '@/components/onboarding/Step1PathDecision';
import Step2EntrepreneurRoleDetails from '@/components/onboarding/Step2EntrepreneurRoleDetails';
import Step2PoliticalRoleDetails from '@/components/onboarding/Step2PoliticalRoleDetails';
import { Step3FocusArea } from '@/components/onboarding/Step3FocusArea';
import { Step4Completion } from '@/components/onboarding/Step4Completion';
import { Step5Preview } from '@/components/onboarding/Step5Preview';
import { Section } from '@/components/section';
import { Progress } from '@/components/ui/progress';
import { getUser } from '@/lib/dal';
import { profileRepository } from '@/repositories/profileRepository';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Complete your OpenEU profile setup',
  keywords: ['onboarding', 'openeu', 'profile', 'setup'],
};

interface OnboardingStepPageProps {
  params: Promise<{
    step: string;
  }>;
}

const VALID_STEPS = ['1', '2', '3', '4', '5'];
const TOTAL_STEPS = 5;

export default async function OnboardingStepPage({
  params,
}: OnboardingStepPageProps) {
  const { step } = await params;

  // Validate step parameter
  if (!VALID_STEPS.includes(step)) {
    notFound();
  }

  const currentStep = parseInt(step, 10);

  const user = await getUser();

  // TODO: find a better way to handle this
  if (!user) {
    throw new Error('User not authenticated. Please log in to continue.');
  }

  // TODO: find a better way to handle this too
  let profile = undefined;
  try {
    profile = await profileRepository.getProfile(user.id);
  } catch (error) {
    console.warn('Profile not found, assuming new user:', error);
  }

  // Render the appropriate step component
  const renderStep = async () => {
    switch (currentStep) {
      case 1:
        return <Step1PathDecision initialData={profile} userId={user.id} />;
      case 2: {
        // Get user's profile to determine which Step2 component to show
        const userType = profile?.user_type;

        if (userType === 'politician') {
          return (
            <Step2PoliticalRoleDetails initialData={profile} userId={user.id} />
          );
        } else {
          // Default to entrepreneur if no category set or if entrepreneur
          return (
            <Step2EntrepreneurRoleDetails
              initialData={profile}
              userId={user.id}
            />
          );
        }
      }
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
    <Section className="space-y-6">
      {/* Progress indicator */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
          </span>
        </div>
        <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
      </div>
      {/* Step content */}
      {await renderStep()}
    </Section>
  );
}
