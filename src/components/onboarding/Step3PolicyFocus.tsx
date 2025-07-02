'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  EU_COUNTRIES,
  POLICY_AREAS,
} from '@/operations/onboarding/OnboardingOperations';

import { useOnboarding } from './OnboardingContext';

export const Step3PolicyFocus: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (
      profileData.areaOfExpertise?.length &&
      profileData.geographicFocus?.length
    ) {
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Policy Focus Areas</CardTitle>
        <CardDescription>
          Help us understand your areas of expertise and geographic focus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Areas of Expertise (Select all that apply)</Label>
          <MultiSelect
            options={POLICY_AREAS.map((area) => ({
              label: area,
              value: area,
            }))}
            onValueChange={(values) =>
              updateProfileData({ areaOfExpertise: values })
            }
            defaultValue={profileData.areaOfExpertise || []}
            placeholder="Select policy areas..."
            variant="secondary"
          />
        </div>

        <div className="space-y-3">
          <Label>Geographic Focus (Select all that apply)</Label>
          <MultiSelect
            options={EU_COUNTRIES.map((country) => ({
              label: country,
              value: country,
            }))}
            onValueChange={(values) =>
              updateProfileData({ geographicFocus: values })
            }
            defaultValue={profileData.geographicFocus || []}
            placeholder="Select countries..."
            variant="secondary"
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !profileData.areaOfExpertise?.length ||
              !profileData.geographicFocus?.length
            }
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
