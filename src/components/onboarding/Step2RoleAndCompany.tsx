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
import { Textarea } from '@/components/ui/textarea';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import { staggerContainer, staggerItem } from '@/lib/animations';

import { useOnboarding } from './OnboardingContext';

export const Step2RoleAndCompany: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (
      profileData.userType &&
      profileData.companyName &&
      profileData.companyStage
    ) {
      nextStep();
    }
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate">
      <Card className="w-full max-w-2xl mx-auto">
        <motion.div variants={staggerItem}>
          <CardHeader>
            <CardTitle>Tell us about your role</CardTitle>
            <CardDescription>
              This helps us understand your perspective and needs
            </CardDescription>
          </CardHeader>
        </motion.div>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>What best describes your role?</Label>
            <div className="space-y-2">
              {[
                { value: 'founder', label: 'Founder / Co-founder' },
                { value: 'startup_employee', label: 'Startup Employee' },
                { value: 'consultant', label: 'Business Consultant' },
                { value: 'investor', label: 'Investor / VC' },
                { value: 'other', label: 'Other' },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option.value}
                    name="userType"
                    value={option.value}
                    checked={profileData.userType === option.value}
                    onChange={(e) =>
                      updateProfileData({
                        userType: e.target.value as ProfileData['userType'],
                      })
                    }
                    className="h-4 w-4"
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Enter your company name"
                value={profileData.companyName || ''}
                onChange={(e) =>
                  updateProfileData({ companyName: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyStage">Company Stage</Label>
              <Select
                value={profileData.companyStage || ''}
                onValueChange={(value) =>
                  updateProfileData({
                    companyStage: value as ProfileData['companyStage'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your company stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series_a">Series A</SelectItem>
                  <SelectItem value="series_b">Series B+</SelectItem>
                  <SelectItem value="growth">Growth Stage</SelectItem>
                  <SelectItem value="established">
                    Established Company
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                value={profileData.companySize || ''}
                onValueChange={(value) =>
                  updateProfileData({
                    companySize: value as ProfileData['companySize'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Just me</SelectItem>
                  <SelectItem value="2-10">2-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="200+">200+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">
                Brief Company Description
              </Label>
              <Textarea
                id="companyDescription"
                placeholder="What does your company do? (2-3 sentences)"
                value={profileData.companyDescription || ''}
                onChange={(e) =>
                  updateProfileData({ companyDescription: e.target.value })
                }
                rows={3}
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
                !profileData.userType ||
                !profileData.companyName ||
                !profileData.companyStage
              }
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
