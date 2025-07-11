import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { useProfileCreateMutation } from '@/domain/hooks/profileHooks';
import { onboardingSchema } from '@/domain/schemas/profile';
import { cn } from '@/lib/utils';
import { ToastOperations } from '@/operations/toast/toastOperations';

interface OnboardingNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  userId: string;
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function OnboardingNavigation({
  currentStep,
  setCurrentStep,
  userId,
  form,
}: OnboardingNavigationProps) {
  const createProfileMutation = useProfileCreateMutation({
    onSuccess: () => {
      ToastOperations.showSuccess({
        title: 'Profile created successfully',
        message: 'Your OpenEU experience is now personalized',
      });
      setCurrentStep(5);
    },
    onError: (error) => {
      ToastOperations.showError({
        title: 'Error creating profile',
        message: `${error.message}. Please try again later.`,
      });
    },
  });

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['user_type', 'name', 'surname'];
      case 2: {
        const userType = form.getValues().user_type;
        if (userType === 'entrepreneur') {
          return [
            'company.role',
            'company.name',
            'company.company_stage',
            'company.company_size',
            'company.industry',
          ];
        } else if (userType === 'politician') {
          return [
            'politician.role',
            'politician.institution',
            'politician.area_of_expertise',
          ];
        }
        return [];
      }
      case 3:
        return ['topic_ids', 'countries'];
      case 4:
        return ['newsletter_frequency'];
      default:
        return [];
    }
  };

  const handleFinalSubmission = async (
    data: z.infer<typeof onboardingSchema>,
  ) => {
    createProfileMutation.mutate({ id: userId, ...data });
    //await createProfile({ id: userId, ...data });
  };

  const handleNext = async () => {
    if (currentStep === 4) {
      const isValid = await form.trigger();
      if (isValid) {
        await form.handleSubmit(handleFinalSubmission)();
      }
    } else {
      // Get fields to validate for current step
      const fieldsToValidate = getFieldsForStep(currentStep);

      // Trigger validation for current step fields - this will show error messages
      const isValid = await form.trigger(
        fieldsToValidate as Array<keyof z.infer<typeof onboardingSchema>>,
      );

      if (isValid) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  return (
    <div
      className={cn('flex justify-between', currentStep === 1 && 'justify-end')}
    >
      {currentStep > 1 && (
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
      )}
      <Button onClick={handleNext}>
        {currentStep === 4 ? 'Create Profile' : 'Next'}
      </Button>
    </div>
  );
}
