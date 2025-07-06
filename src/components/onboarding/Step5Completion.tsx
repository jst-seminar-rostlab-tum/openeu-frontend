'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Building2,
  CheckCircle,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { staggerContainer, staggerItem } from '@/lib/animations';

import { useOnboarding } from './OnboardingContext';

export const Step5Completion: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProfile = async () => {
    if (!profileData.newsletterFrequency) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically submit to your backend
      // await createProfile(profileData);

      // Simulate profile creation delay
      setTimeout(() => {
        setIsSubmitting(false);
        nextStep();
      }, 1500);
    } catch (_error) {
      setIsSubmitting(false);
      // Handle error appropriately in production
    }
  };

  const isFormValid = () => {
    return !!profileData.newsletterFrequency;
  };

  const renderPersonalizedCard = () => {
    const isEntrepreneur = profileData.userCategory === 'entrepreneur';
    const isPolitician = profileData.userCategory === 'politician';

    return (
      <motion.div
        className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-lg p-6"
        variants={staggerItem}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="font-semibold text-lg">
            Your Personalized OpenEU Experience
          </h3>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {/* User Profile Summary */}
          <motion.div variants={staggerItem} className="flex items-start gap-3">
            <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Profile:</span>{' '}
              <span className="text-muted-foreground">
                {profileData.name} {profileData.surname} •{' '}
                {isEntrepreneur ? 'Entrepreneur' : 'Politician/Policy Maker'}
                {isEntrepreneur && profileData.userType && (
                  <> • {profileData.userType.replace('_', ' ')}</>
                )}
              </span>
            </div>
          </motion.div>

          {/* Company/Organization Info */}
          {isEntrepreneur &&
            (profileData.companyName || profileData.primaryIndustry) && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Business:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.primaryIndustry}
                    {profileData.companyStage && (
                      <> • {profileData.companyStage.replace('_', ' ')} stage</>
                    )}
                    {profileData.companySize && (
                      <> • {profileData.companySize} employees</>
                    )}
                  </span>
                </div>
              </motion.div>
            )}

          {isPolitician &&
            (profileData.politicalRole || profileData.institution) && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Role:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.politicalRole?.replace('_', ' ')}
                    {profileData.institution && (
                      <> at {profileData.institution}</>
                    )}
                  </span>
                </div>
              </motion.div>
            )}

          {/* Geographic Focus */}
          {profileData.geographicFocus &&
            profileData.geographicFocus.length > 0 && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Geographic Focus:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.geographicFocus.slice(0, 3).join(', ')}
                    {profileData.geographicFocus.length > 3 &&
                      ` +${profileData.geographicFocus.length - 3} more`}
                  </span>
                </div>
              </motion.div>
            )}

          {/* Areas of Interest/Expertise */}
          {((isPolitician &&
            profileData.areaOfExpertise &&
            profileData.areaOfExpertise.length > 0) ||
            (profileData.keyRegulatoryAreas &&
              profileData.keyRegulatoryAreas.length > 0)) && (
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3"
            >
              <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">
                  {isPolitician
                    ? 'Areas of Expertise:'
                    : 'Key Regulatory Areas:'}
                </span>{' '}
                <span className="text-muted-foreground">
                  {isPolitician
                    ? profileData.areaOfExpertise?.slice(0, 3).join(', ')
                    : profileData.keyRegulatoryAreas?.slice(0, 3).join(', ')}
                  {((isPolitician &&
                    profileData.areaOfExpertise &&
                    profileData.areaOfExpertise.length > 3) ||
                    (profileData.keyRegulatoryAreas &&
                      profileData.keyRegulatoryAreas.length > 3)) &&
                    ` +${(isPolitician ? profileData.areaOfExpertise?.length : profileData.keyRegulatoryAreas?.length)! - 3} more`}
                </span>
              </div>
            </motion.div>
          )}

          {/* Personalization Benefits */}
          <div className="pt-2 border-t border-primary/20">
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Smart Filtering:
                </span>{' '}
                Get updates relevant to your{' '}
                {isEntrepreneur
                  ? 'industry and business stage'
                  : 'policy areas and expertise'}
              </div>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3 mt-2"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Contextual Insights:
                </span>{' '}
                Understand regulatory impact specific to your work
              </div>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3 mt-2"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Priority Notifications:
                </span>{' '}
                Focus on{' '}
                {profileData.geographicFocus?.slice(0, 2).join(' and ')}{' '}
                legislation
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
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
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription className="text-lg">
            Set your preferences and finalize your OpenEU experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {/* Notification Frequency */}
          <motion.div variants={staggerItem} className="space-y-3">
            <Label className="text-base font-semibold">
              Notification Frequency
            </Label>
            <Select
              value={profileData.newsletterFrequency || ''}
              onValueChange={(value) =>
                updateProfileData({
                  newsletterFrequency: value as 'daily' | 'weekly' | 'none',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="How often would you like to receive updates?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Daily</span>
                    <span className="text-xs text-muted-foreground">
                      Stay on top of everything
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="weekly">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">Weekly</span>
                    <span className="text-xs text-muted-foreground">
                      Curated highlights and summaries
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="none">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">None</span>
                    <span className="text-xs text-muted-foreground">
                      Browse when you want, no emails
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Personalized Expertise Card */}
          {renderPersonalizedCard()}

          {/* Info Note */}
          <motion.div
            variants={staggerItem}
            className="bg-muted p-4 rounded-lg text-center"
          >
            <p className="text-sm text-muted-foreground">
              You can update these preferences anytime in your profile settings.
            </p>
          </motion.div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
            Back
          </Button>
          <Button
            onClick={handleCreateProfile}
            disabled={!isFormValid() || isSubmitting}
            className="px-8"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Creating Profile...
              </>
            ) : (
              'Create Profile'
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
