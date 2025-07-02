'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import {
  BUSINESS_MODELS,
  EU_COUNTRIES,
  INDUSTRIES,
} from '@/operations/onboarding/OnboardingOperations';

import { useOnboarding } from './OnboardingContext';

export const Step3BusinessDetails: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();
  const [customIndustry, setCustomIndustry] = useState('');

  const handleIndustryChange = (industry: string) => {
    if (industry === 'Other') {
      // Show custom input
      updateProfileData({ primaryIndustry: '' });
    } else {
      updateProfileData({ primaryIndustry: industry });
      setCustomIndustry('');
    }
  };

  const handleNext = () => {
    const industry = profileData.primaryIndustry || customIndustry;
    if (
      industry &&
      profileData.businessModel &&
      profileData.geographicFocus?.length
    ) {
      updateProfileData({ primaryIndustry: industry });
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Help us understand your business model and market focus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="industry">Primary Industry</Label>
          <Select
            value={profileData.primaryIndustry || ''}
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your primary industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(!profileData.primaryIndustry ||
            profileData.primaryIndustry === '') &&
            INDUSTRIES.indexOf(customIndustry) === -1 && (
              <Input
                placeholder="Enter your industry"
                value={customIndustry}
                onChange={(e) => setCustomIndustry(e.target.value)}
              />
            )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessModel">Business Model</Label>
          <Select
            value={profileData.businessModel || ''}
            onValueChange={(value) =>
              updateProfileData({
                businessModel: value as ProfileData['businessModel'],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your business model" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Geographic Focus (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-2">
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
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !(profileData.primaryIndustry || customIndustry) ||
              !profileData.businessModel ||
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
