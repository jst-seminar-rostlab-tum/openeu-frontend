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
import { staggerContainer, staggerItem } from '@/lib/animations';

import { useOnboarding } from './OnboardingContext';

const POLITICAL_ROLES = [
  { value: 'mep', label: 'Member of European Parliament (MEP)' },
  { value: 'national_mp', label: 'National Member of Parliament' },
  { value: 'local_representative', label: 'Local Representative/Councillor' },
  { value: 'policy_advisor', label: 'Policy Advisor' },
  { value: 'civil_servant', label: 'Civil Servant' },
  { value: 'other', label: 'Other' },
];

export const Step2PoliticalRole: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (profileData.politicalRole && profileData.institution) {
      nextStep();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <Card className="w-full max-w-2xl mx-auto">
        <motion.div variants={staggerItem}>
          <CardHeader>
            <CardTitle>Tell us about your political role</CardTitle>
            <CardDescription>
              This helps us understand your legislative focus and
              responsibilities
            </CardDescription>
          </CardHeader>
        </motion.div>

        <CardContent className="space-y-6">
          <motion.div variants={staggerItem} className="space-y-2">
            <Label htmlFor="politicalRole">Your Role</Label>
            <Select
              value={profileData.politicalRole || ''}
              onValueChange={(value) =>
                updateProfileData({
                  politicalRole: value as ProfileData['politicalRole'],
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your political role" />
              </SelectTrigger>
              <SelectContent>
                {POLITICAL_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-2">
            <Label htmlFor="institution">Institution/Organization</Label>
            <Input
              id="institution"
              placeholder="e.g., European Parliament, UK Parliament, City Council"
              value={profileData.institution || ''}
              onChange={(e) =>
                updateProfileData({ institution: e.target.value })
              }
            />
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-2">
            <Label htmlFor="politicalParty">Political Party (Optional)</Label>
            <Input
              id="politicalParty"
              placeholder="Your political party or affiliation"
              value={profileData.politicalParty || ''}
              onChange={(e) =>
                updateProfileData({ politicalParty: e.target.value })
              }
            />
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex justify-between pt-4"
          >
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!profileData.politicalRole || !profileData.institution}
            >
              Continue
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
