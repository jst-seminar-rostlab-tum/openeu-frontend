'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import {
  bounceIn,
  scaleIn,
  sparkleEffect,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';
import { profileRepository } from '@/repositories/profileRepository';

import ActionItems from './ActionItems';
import { useOnboarding } from './OnboardingContext';

export const Step6Preview: React.FC = () => {
  const { profileData, updateProfileData, prevStep } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Add final onboarding flag
      const finalData = {
        ...profileData,
        onboardingCompleted: true,
        id: 'temp-id', // This should come from auth context
      };

      await profileRepository.createProfile(finalData as ProfileData);
      setIsCompleted(true);

      // Go to next step in the form
      setTimeout(() => {
        // Redirect to demo page after a short delay
        window.location.href = '/';
      }, 2000);
      // Handle error (could show toast or error state)
    } catch (_error) {
      // Failed to save profile
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto relative overflow-hidden">
          {/* Celebration sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${10 + (i % 3) * 20}%`,
                }}
                variants={sparkleEffect}
                initial="initial"
                animate="animate"
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>

          <CardContent className="pt-8 text-center relative z-10">
            <motion.div
              className="flex justify-center mb-4"
              variants={bounceIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 text-green-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle className="text-2xl mb-2">
                🎉 Welcome to OpenEU!
              </CardTitle>
              <CardDescription className="text-lg">
                Your personalized experience is ready. Redirecting you now...
              </CardDescription>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div variants={scaleIn} initial="initial" animate="animate">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Almost Done!
            </CardTitle>
            <CardDescription>
              Set your preferences and complete your OpenEU setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Newsletter Frequency</Label>
              <Select
                value={profileData.newsletterFrequency || 'weekly'}
                onValueChange={(value) =>
                  updateProfileData({
                    newsletterFrequency:
                      value as ProfileData['newsletterFrequency'],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select newsletter frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">
                    Daily - Stay on top of everything
                  </SelectItem>
                  <SelectItem value="weekly">
                    Weekly - Curated highlights
                  </SelectItem>
                  <SelectItem value="none">
                    None - Browse when you want
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                🎯 Your Personalized OpenEU Experience
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-3 text-sm"
              >
                <motion.div
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Smart Regulatory Feed:</span>{' '}
                    Only see updates relevant to {profileData.primaryIndustry}{' '}
                    companies in {profileData.geographicFocus?.join(', ')}
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Contextual Insights:</span>{' '}
                    Understand how regulations impact {profileData.companyStage}{' '}
                    stage {profileData.businessModel} businesses
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">
                      Tailored Chat Responses:
                    </span>{' '}
                    Get answers specific to your industry and regulatory
                    complexity level
                  </div>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Priority Notifications:</span>{' '}
                    Focus on{' '}
                    {profileData.keyRegulatoryAreas?.slice(0, 3).join(', ')} and
                    other key areas
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                You can always update these preferences later in your profile
                settings.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Action Items Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <motion.h2
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            🚀 What&apos;s Waiting for You
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Based on your profile, we&apos;ve already found relevant content and
            opportunities for your business
          </motion.p>
          <motion.div
            className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm font-medium text-primary">
              ✨ Your personalized dashboard is ready with{' '}
              {profileData.primaryIndustry} specific insights
            </p>
          </motion.div>
        </div>
        <ActionItems profile={profileData} />
      </motion.div>
    </div>
  );
};
