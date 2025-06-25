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
import { Checkbox } from '@/components/ui/checkbox';
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

  const handleRegulatoryAreaChange = (area: string, checked: boolean) => {
    const currentAreas = profileData.keyRegulatoryAreas || [];
    if (checked) {
      updateProfileData({
        keyRegulatoryAreas: [...currentAreas, area],
      });
    } else {
      updateProfileData({
        keyRegulatoryAreas: currentAreas.filter((a) => a !== area),
      });
    }
  };

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
          Help us understand which regulations matter most to your business
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
                  <div className="text-xs text-muted-foreground">
                    Basic compliance, standard business regulations
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="space-y-1">
                  <div className="font-medium">Medium</div>
                  <div className="text-xs text-muted-foreground">
                    Some specialized regulations, moderate compliance burden
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="space-y-1">
                  <div className="font-medium">High</div>
                  <div className="text-xs text-muted-foreground">
                    Heavily regulated industry, complex compliance requirements
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Key Regulatory Areas (Select all that apply)</Label>
          <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
            {REGULATORY_AREAS.map((area) => (
              <div key={area} className="flex items-center space-x-3">
                <Checkbox
                  id={area}
                  checked={
                    profileData.keyRegulatoryAreas?.includes(area) || false
                  }
                  onCheckedChange={(checked) =>
                    handleRegulatoryAreaChange(area, checked as boolean)
                  }
                />
                <Label htmlFor={area} className="text-sm leading-5">
                  {area}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {profileData.keyRegulatoryAreas?.length || 0} areas
          </p>
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
