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
import { Checkbox } from '@/components/ui/checkbox';
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
import { Textarea } from '@/components/ui/textarea';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import {
  INDUSTRIES,
  POLICY_AREAS,
  POLITICAL_ROLES,
} from '@/operations/onboarding/OnboardingOperations';

import { useOnboarding } from './OnboardingContext';

export const Step3RoleDetails: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    const isEntrepreneur = profileData.userCategory === 'entrepreneur';
    const isPolitician = profileData.userCategory === 'politician';

    if (isEntrepreneur) {
      // Check entrepreneur required fields
      if (
        profileData.userType &&
        profileData.companyStage &&
        profileData.companySize &&
        profileData.primaryIndustry &&
        profileData.companyDescription
      ) {
        nextStep();
      }
    } else if (isPolitician) {
      // Check politician required fields
      if (
        profileData.politicalRole &&
        profileData.institution &&
        profileData.areaOfExpertise &&
        profileData.areaOfExpertise.length > 0
      ) {
        nextStep();
      }
    }
  };

  const handleMultiSelectChange = (name: string, values: string[]) => {
    updateProfileData({ [name]: values });
  };

  const isFormValid = () => {
    const isEntrepreneur = profileData.userCategory === 'entrepreneur';
    const isPolitician = profileData.userCategory === 'politician';

    if (isEntrepreneur) {
      return !!(
        profileData.userType &&
        profileData.companyStage &&
        profileData.companySize &&
        profileData.primaryIndustry &&
        profileData.companyDescription
      );
    } else if (isPolitician) {
      return !!(
        profileData.politicalRole &&
        profileData.institution &&
        profileData.areaOfExpertise &&
        profileData.areaOfExpertise.length > 0
      );
    }
    return false;
  };

  if (profileData.userCategory === 'entrepreneur') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Tell us about your business
            </CardTitle>
            <CardDescription className="text-lg">
              Help us understand your company and industry
            </CardDescription>
          </CardHeader>
        </motion.div>

        <CardContent className="space-y-6">
          {/* Role Description */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Role Description</Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'founder', label: 'Founder / Co-founder' },
                { value: 'startup_employee', label: 'Startup Employee' },
                { value: 'consultant', label: 'Business Consultant' },
                { value: 'investor', label: 'Investor / VC' },
                { value: 'other', label: 'Other' },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50"
                >
                  <Checkbox
                    id={option.value}
                    checked={profileData.userType === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateProfileData({
                          userType: option.value as ProfileData['userType'],
                        });
                      }
                    }}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Stage and Size Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Stage</Label>
              <Select
                value={profileData.companyStage || ''}
                onValueChange={(value) =>
                  updateProfileData({
                    companyStage: value as ProfileData['companyStage'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                  <SelectItem value="seed">Seed</SelectItem>
                  <SelectItem value="series_a">Series A</SelectItem>
                  <SelectItem value="series_b">Series B</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="established">Established</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Company Size</Label>
              <Select
                value={profileData.companySize || ''}
                onValueChange={(value) =>
                  updateProfileData({
                    companySize: value as ProfileData['companySize'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
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
          </div>

          {/* Industry Selector */}
          <div className="space-y-2">
            <Label>Primary Industry</Label>
            <Select
              value={profileData.primaryIndustry || ''}
              onValueChange={(value) =>
                updateProfileData({ primaryIndustry: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Company Description */}
          <div className="space-y-2">
            <Label>Brief Company Description</Label>
            <Textarea
              placeholder="Tell us about your company, what you do, and your goals..."
              value={profileData.companyDescription || ''}
              onChange={(e) =>
                updateProfileData({ companyDescription: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="flex justify-between pt-6">
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
          </div>
        </CardContent>
      </Card>
    );
  }

  // Politician Path
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Tell us about your role</CardTitle>
          <CardDescription className="text-lg">
            Help us understand your political work and expertise
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        {/* Role Description */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Role Description</Label>
          <div className="grid grid-cols-1 gap-3">
            {POLITICAL_ROLES.map((role) => (
              <div
                key={role.value}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50"
              >
                <Checkbox
                  id={role.value}
                  checked={profileData.politicalRole === role.value}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateProfileData({
                        politicalRole:
                          role.value as ProfileData['politicalRole'],
                      });
                    }
                  }}
                />
                <Label htmlFor={role.value} className="cursor-pointer">
                  {role.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <Label>Organization/Institution/Political Party</Label>
          <Input
            placeholder="e.g., European Parliament, Ministry of Finance, Democratic Party..."
            value={profileData.institution || ''}
            onChange={(e) => updateProfileData({ institution: e.target.value })}
          />
        </div>

        {/* Area of Expertise - Multi-Select */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Area of Expertise</Label>
          <MultiSelect
            options={POLICY_AREAS.map((area) => ({ label: area, value: area }))}
            onValueChange={(values) =>
              handleMultiSelectChange('areaOfExpertise', values)
            }
            defaultValue={profileData.areaOfExpertise || []}
            placeholder="Select areas of expertise..."
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          {profileData.areaOfExpertise &&
            profileData.areaOfExpertise.length > 0 && (
              <div className="text-xs text-muted-foreground">
                {profileData.areaOfExpertise.length} area
                {profileData.areaOfExpertise.length !== 1 ? 's' : ''} selected
              </div>
            )}
        </div>

        {/* Further Information */}
        <div className="space-y-2">
          <Label>Further Information</Label>
          <Textarea
            placeholder="Tell us more about your work, responsibilities, and policy interests..."
            value={profileData.companyDescription || ''} // Reusing this field for additional info
            onChange={(e) =>
              updateProfileData({ companyDescription: e.target.value })
            }
            rows={4}
          />
        </div>

        <div className="flex justify-between pt-6">
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
        </div>
      </CardContent>
    </Card>
  );
};
