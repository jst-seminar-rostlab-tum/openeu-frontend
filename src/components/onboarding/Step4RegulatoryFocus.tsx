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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProfileData } from '@/domain/entities/profile/ProfileData';

import { useOnboarding } from './OnboardingContext';

const REGULATORY_AREAS = [
  'GDPR & Data Protection',
  'Financial Services (PSD2, MiFID)',
  'Digital Services Act (DSA)',
  'Digital Markets Act (DMA)',
  'AI Regulation',
  'Cybersecurity (NIS2)',
  'Environmental Regulations',
  'Labor & Employment Law',
  'Tax & VAT Compliance',
  'Medical Device Regulation (MDR)',
  'Consumer Protection',
  'Competition Law',
  'Intellectual Property',
  'Import/Export Regulations',
  'Industry-specific regulations',
];

export const Step4RegulatoryFocus: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (
      profileData.regulatoryComplexity &&
      profileData.keyRegulatoryAreas?.length
    ) {
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Regulatory Focus</CardTitle>
        <CardDescription>
          Help us understand which regulations matter most to you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>How complex are your regulatory requirements?</Label>
          <Select
            value={profileData.regulatoryComplexity || ''}
            onValueChange={(value) =>
              updateProfileData({
                regulatoryComplexity:
                  value as ProfileData['regulatoryComplexity'],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select complexity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="space-y-1">
                  <div className="font-medium">Low</div>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="space-y-1">
                  <div className="font-medium">Medium</div>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="space-y-1">
                  <div className="font-medium">High</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Key Regulatory Areas (Select all that apply)</Label>
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
            <MultiSelect
              options={REGULATORY_AREAS.map((area) => ({
                label: area,
                value: area,
              }))}
              onValueChange={(values) =>
                updateProfileData({
                  keyRegulatoryAreas: values,
                })
              }
              defaultValue={profileData.keyRegulatoryAreas || []}
              placeholder="Select regulatory areas..."
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">💡 Why this matters</h4>
          <p className="text-sm text-muted-foreground">
            By understanding your regulatory focus, we can prioritize relevant
            updates, filter out noise, and provide contextual insights about how
            new regulations might impact your specific business operations.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              !profileData.regulatoryComplexity ||
              !profileData.keyRegulatoryAreas?.length
            }
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
