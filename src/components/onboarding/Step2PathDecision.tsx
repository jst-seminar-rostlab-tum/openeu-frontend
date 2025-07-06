'use client';

import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
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

import { useOnboarding } from './OnboardingContext';

export const Step2PathDecision: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const handleNext = () => {
    if (profileData.userCategory) {
      nextStep();
    }
  };

  const handleUserCategoryChange = (
    category: 'entrepreneur' | 'politician',
  ) => {
    updateProfileData({ userCategory: category });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription className="text-lg">
            Help us personalize your OpenEU experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="space-y-4">
            <Label className="text-base font-semibold">I am a:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    profileData.userCategory === 'entrepreneur'
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleUserCategoryChange('entrepreneur')}
                >
                  <CardContent className="p-6 text-center">
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Entrepreneur</h3>
                    <p className="text-sm text-muted-foreground">
                      Building or running a business, startup, or company
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    profileData.userCategory === 'politician'
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleUserCategoryChange('politician')}
                >
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">
                      Politician/Policy Maker
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Working in politics, policy making, or public service
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
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
            disabled={!profileData.userCategory}
            className="px-8"
          >
            Continue
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
