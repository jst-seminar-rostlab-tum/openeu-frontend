import { CheckCircle } from 'lucide-react';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Step5Preview = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to OpenEU!</CardTitle>
        <CardDescription className="text-lg">
          Your profile is now complete and ready to use
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Congratulations! 🎉</h2>
          <p className="text-muted-foreground">
            You&apos;re all set to start exploring European legislation and
            connecting with relevant stakeholders based on your interests and
            role.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
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
        </div>
      </CardContent>
    </Card>
  );
};
