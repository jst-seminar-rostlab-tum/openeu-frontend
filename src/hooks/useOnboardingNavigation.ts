'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

export interface OnboardingNavigation {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  userCategory?: 'entrepreneur' | 'politician';
  nextStep: (additionalParams?: Record<string, string>) => void;
  prevStep: () => void;
  goToStep: (step: number, params?: Record<string, string>) => void;
}

export function useOnboardingNavigation(): OnboardingNavigation {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const currentStep = parseInt(params.step as string, 10);
  const totalSteps = 5;
  const userCategory = searchParams.get('userCategory') as
    | 'entrepreneur'
    | 'politician'
    | undefined;

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const buildUrl = (
    step: number,
    additionalParams?: Record<string, string>,
  ) => {
    const url = new URL(`/onboarding/${step}`, window.location.origin);

    // Preserve userCategory
    if (userCategory) {
      url.searchParams.set('userCategory', userCategory);
    }

    // Add additional params
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    return url.pathname + url.search;
  };

  const nextStep = (additionalParams?: Record<string, string>) => {
    if (!isLastStep) {
      router.push(buildUrl(currentStep + 1, additionalParams));
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      router.push(buildUrl(currentStep - 1));
    }
  };

  const goToStep = (
    step: number,
    additionalParams?: Record<string, string>,
  ) => {
    if (step >= 1 && step <= totalSteps) {
      router.push(buildUrl(step, additionalParams));
    }
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    userCategory,
    nextStep,
    prevStep,
    goToStep,
  };
}
