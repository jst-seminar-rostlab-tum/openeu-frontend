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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProfileData } from '@/domain/entities/profile/ProfileData';

import { useOnboarding } from './OnboardingContext';

const EU_COUNTRIES = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

const INDUSTRIES = [
  'FinTech',
  'HealthTech',
  'EdTech',
  'CleanTech',
  'E-commerce',
  'SaaS',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Cybersecurity',
  'Gaming',
  'Media & Entertainment',
  'Travel & Tourism',
  'Food & Beverage',
  'Fashion',
  'Real Estate',
  'Transportation',
  'Energy',
  'Manufacturing',
  'Other',
];

const BUSINESS_MODELS = [
  { value: 'b2b', label: 'B2B (Business to Business)' },
  { value: 'b2c', label: 'B2C (Business to Consumer)' },
  { value: 'b2b2c', label: 'B2B2C (Business to Business to Consumer)' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'saas', label: 'Software as a Service (SaaS)' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'other', label: 'Other' },
];

export const Step3BusinessDetails: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();
  const [customIndustry, setCustomIndustry] = useState('');

  const handleGeographicFocusChange = (country: string, checked: boolean) => {
    const currentFocus = profileData.geographicFocus || [];
    if (checked) {
      updateProfileData({
        geographicFocus: [...currentFocus, country],
      });
    } else {
      updateProfileData({
        geographicFocus: currentFocus.filter((c) => c !== country),
      });
    }
  };

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
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
            {EU_COUNTRIES.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={country}
                  checked={
                    profileData.geographicFocus?.includes(country) || false
                  }
                  onCheckedChange={(checked) =>
                    handleGeographicFocusChange(country, checked as boolean)
                  }
                />
                <Label htmlFor={country} className="text-sm">
                  {country}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {profileData.geographicFocus?.length || 0} countries
          </p>
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
