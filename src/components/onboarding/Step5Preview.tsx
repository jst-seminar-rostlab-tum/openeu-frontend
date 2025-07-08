'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useOnboardingNavigation } from '@/domain/hooks/useOnboardingNavigation';

export const Step5Preview = () => {
  const { prevStep } = useOnboardingNavigation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleComplete = async () => {
    setIsRedirecting(true);
    try {
      // Simulate finalization delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to dashboard or main app
      window.location.href = '/';
    } catch (_error) {
      // Handle error silently for demo
      setIsRedirecting(false);
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
          <CardTitle className="text-2xl">Welcome to OpenEU!</CardTitle>
          <CardDescription className="text-lg">
            Your profile is now complete and ready to use
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Congratulations! 🎉</h2>
          <p className="text-muted-foreground">
            You&apos;re all set to start exploring European legislation and
            connecting with relevant stakeholders based on your interests and
            role.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 text-primary">📊</div>
            <h3 className="font-medium mb-1">Personalized Dashboard</h3>
            <p className="text-xs text-muted-foreground">
              Track legislation relevant to your interests
            </p>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 text-primary">🔔</div>
            <h3 className="font-medium mb-1">Smart Notifications</h3>
            <p className="text-xs text-muted-foreground">
              Get updates on important developments
            </p>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="w-8 h-8 mx-auto mb-2 text-primary">🤝</div>
            <h3 className="font-medium mb-1">Network Building</h3>
            <p className="text-xs text-muted-foreground">
              Connect with relevant stakeholders
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>You&apos;ll be taken to your personalized dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Start exploring legislation in your areas of interest</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Receive notifications based on your preferences</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-between pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button variant="outline" onClick={prevStep} type="button">
            Back
          </Button>
          <Button
            onClick={handleComplete}
            disabled={isRedirecting}
            className="px-8"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finalizing...
              </>
            ) : (
              'Enter OpenEU'
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
