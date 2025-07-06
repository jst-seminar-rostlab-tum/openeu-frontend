'use client';

import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import { ProfileData } from '@/domain/entities/profile/ProfileData';

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  profileData: Partial<ProfileData>;
  updateProfileData: (data: Partial<ProfileData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  userCategory: 'entrepreneur' | 'politician';
  userId?: string;
  setUserId: (id: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
  initialData?: Partial<ProfileData>;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  initialData = {},
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] =
    useState<Partial<ProfileData>>(initialData);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  // Determine total steps based on user category
  const userCategory = profileData.userCategory;
  const totalSteps = 6;

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        profileData,
        updateProfileData,
        nextStep,
        prevStep,
        isLastStep,
        isFirstStep,
        userCategory:
          (userCategory as 'entrepreneur' | 'politician') || 'undefined',
        userId,
        setUserId,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
