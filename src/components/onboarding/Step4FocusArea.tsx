'use client';

import { motion } from 'framer-motion';
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
  REGULATORY_AREAS,
} from '@/operations/onboarding/OnboardingOperations';

import { useOnboarding } from './OnboardingContext';

export const Step4FocusArea: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (
      profileData.topicList &&
      profileData.topicList.length > 0 &&
      profileData.geographicFocus &&
      profileData.geographicFocus.length > 0 &&
      profileData.keyRegulatoryAreas &&
      profileData.keyRegulatoryAreas.length > 0
    ) {
      nextStep();
    }
  };

  const handleMultiSelectChange = (name: string, values: string[]) => {
    updateProfileData({ [name]: values });
  };

  const isFormValid = () => {
    return !!(
      profileData.topicList &&
      profileData.topicList.length > 0 &&
      profileData.geographicFocus &&
      profileData.geographicFocus.length > 0 &&
      profileData.keyRegulatoryAreas &&
      profileData.keyRegulatoryAreas.length > 0
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Focus Areas</CardTitle>
          <CardDescription className="text-lg">
            Tell us what topics and regions you&apos;re most interested in
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-8">
        {/* Areas of Interest (Topics) */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Label className="text-base font-semibold">Areas of Interest</Label>
          <p className="text-sm text-muted-foreground">
            Select the topics that matter most to you
          </p>
          <MultiSelect
            options={POLICY_AREAS.map((area) => ({ label: area, value: area }))}
            onValueChange={(values) =>
              handleMultiSelectChange('topicList', values)
            }
            defaultValue={profileData.topicList || []}
            placeholder="Select areas of interest..."
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          {profileData.topicList && profileData.topicList.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {profileData.topicList.length} topic
              {profileData.topicList.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </motion.div>

        {/* Geographic Focus */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Label className="text-base font-semibold">Geographic Focus</Label>
          <p className="text-sm text-muted-foreground">
            Select the countries/regions you work with
          </p>
          <MultiSelect
            options={EU_COUNTRIES.map((country) => ({
              label: country,
              value: country,
            }))}
            onValueChange={(values) =>
              handleMultiSelectChange('geographicFocus', values)
            }
            defaultValue={profileData.geographicFocus || []}
            placeholder="Select countries/regions..."
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          {profileData.geographicFocus &&
            profileData.geographicFocus.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {profileData.geographicFocus.length} countr
                {profileData.geographicFocus.length !== 1 ? 'ies' : 'y'}{' '}
                selected
              </div>
            )}
        </motion.div>

        {/* Legislative Areas */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Label className="text-base font-semibold">Legislative Areas</Label>
          <p className="text-sm text-muted-foreground">
            Select the regulatory areas most relevant to you
          </p>
          <MultiSelect
            options={REGULATORY_AREAS.map((area) => ({
              label: area,
              value: area,
            }))}
            onValueChange={(values) =>
              handleMultiSelectChange('keyRegulatoryAreas', values)
            }
            defaultValue={profileData.keyRegulatoryAreas || []}
            placeholder="Select regulatory areas..."
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          {profileData.keyRegulatoryAreas &&
            profileData.keyRegulatoryAreas.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {profileData.keyRegulatoryAreas.length} area
                {profileData.keyRegulatoryAreas.length !== 1 ? 's' : ''}{' '}
                selected
              </div>
            )}
        </motion.div>

        <motion.div
          className="flex justify-between pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid()}
            className="px-8"
          >
            Continue
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
