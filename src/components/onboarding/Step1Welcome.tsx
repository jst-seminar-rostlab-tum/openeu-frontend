'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
import { staggerContainer, staggerItem } from '@/lib/animations';

import { useOnboarding } from './OnboardingContext';

export const Step1Welcome: React.FC = () => {
  const { profileData, updateProfileData, nextStep } = useOnboarding();

  const handleNext = () => {
    if (
      profileData.name &&
      profileData.surname &&
      profileData.email &&
      profileData.password
    ) {
      nextStep();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account 🇪🇺</CardTitle>
          <CardDescription className="text-lg">
            Join OpenEU and get personalized regulatory insights for your work
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        <motion.div
          className="text-center p-6 bg-muted rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="font-semibold mb-2">Why join OpenEU?</h3>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2 text-sm text-muted-foreground"
          >
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Get relevant regulatory updates for your work</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Connect with stakeholders and decision makers</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Receive tailored insights and recommendations</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                placeholder="Enter your first name"
                value={profileData.name || ''}
                onChange={(e) => updateProfileData({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Last Name</Label>
              <Input
                id="surname"
                placeholder="Enter your last name"
                value={profileData.surname || ''}
                onChange={(e) => updateProfileData({ surname: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={profileData.email || ''}
              onChange={(e) => updateProfileData({ email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a secure password (min. 8 characters)"
              value={profileData.password || ''}
              onChange={(e) => updateProfileData({ password: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-end pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Button
            onClick={handleNext}
            disabled={
              !profileData.name ||
              !profileData.surname ||
              !profileData.email ||
              !profileData.password ||
              (!!profileData.password && profileData.password.length < 8)
            }
            className="px-8"
          >
            Create Account
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
