import { Progress } from '@/components/ui/progress';

interface OnboardingProgressProps {
  currentStep: number;
}

export default function OnboardingProgress({
  currentStep,
}: OnboardingProgressProps) {
  const TOTAL_STEPS = 5;
  return (
    <div>
      <div className="flex justify-between items-center mb-2 text-sm font-medium text-muted-foreground">
        <p>
          Step {currentStep} of {TOTAL_STEPS}
        </p>
        <p>{Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete</p>
      </div>
      <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
    </div>
  );
}
