'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import OnboardingNavigation from '@/components/onboarding/OnboardingNavigation';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import Step1PathDecision from '@/components/onboarding/Step1PathDecision';
import Step2EntrepreneurRoleDetails from '@/components/onboarding/Step2EntrepreneurRoleDetails';
import Step2PoliticalRoleDetails from '@/components/onboarding/Step2PoliticalRoleDetails';
import Step3FocusArea from '@/components/onboarding/Step3FocusArea';
import Step4Completion from '@/components/onboarding/Step4Completion';
import Step5Preview from '@/components/onboarding/Step5Preview';
import { onboardingSchema } from '@/domain/schemas/profile';

interface OnboardingLayoutProps {
  userId: string;
}

export default function OnboardingLayout({ userId }: OnboardingLayoutProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      user_type: undefined,
      name: '',
      surname: '',
      company: undefined,
      politician: undefined,
      topic_ids: [],
      countries: [],
      newsletter_frequency: 'weekly',
    },
  });

  // Watch for user_type changes and initialize the appropriate object
  const userType = form.watch('user_type');

  useEffect(() => {
    if (userType === 'entrepreneur' && !form.getValues().company) {
      form.setValue('company', {
        role: '',
        name: '',
        description: '',
        company_stage: '',
        company_size: '',
        industry: '',
      });
    } else if (userType === 'politician' && !form.getValues().politician) {
      form.setValue('politician', {
        role: '',
        institution: '',
        area_of_expertise: [],
        further_information: '',
      });
    }
  }, [userType, form]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PathDecision form={form} />;
      case 2: {
        const userType = form.getValues().user_type;

        if (userType === 'politician') {
          return <Step2PoliticalRoleDetails form={form} />;
        } else {
          return <Step2EntrepreneurRoleDetails form={form} />;
        }
      }
      case 3:
        return <Step3FocusArea form={form} />;
      case 4:
        return <Step4Completion form={form} />;
      case 5:
        return <Step5Preview />;
      default:
        notFound();
    }
  };

  return (
    <FormProvider {...form}>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <OnboardingProgress currentStep={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <OnboardingNavigation
          currentStep={currentStep}
          userId={userId}
          form={form}
          setCurrentStep={setCurrentStep}
        />
      </motion.div>
    </FormProvider>
  );
}
