'use client';

import { useParams, useRouter } from 'next/navigation';

export interface OnboardingNavigation {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export function useOnboardingNavigation(): OnboardingNavigation {
  const router = useRouter();
  const params = useParams();

  const currentStep = parseInt(params.step as string, 10);
  const totalSteps = 5;

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const nextStep = () => {
    if (!isLastStep) {
      router.push(`/onboarding/${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      router.push(`/onboarding/${currentStep - 1}`);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      router.push(`/onboarding/${step}`);
    }
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
  };
}
