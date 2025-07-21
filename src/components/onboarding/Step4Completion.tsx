import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { CompletionForm } from '@/components/profile/forms/CompletionForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { completionSchema, onboardingSchema } from '@/domain/schemas/profile';

interface Step4CompletionProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export default function Step4Completion({ form }: Step4CompletionProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription className="text-lg">
          Just a few final preferences to personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CompletionForm
          form={
            form as unknown as UseFormReturn<z.infer<typeof completionSchema>>
          }
        />
        <motion.div
          className="text-center p-6 bg-muted rounded-lg px-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h3 className="font-semibold mb-4">What&apos;s next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Explore relevant EU legislation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Chat with AI about EU regulations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Set up smart alerts for relevant updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Track EU meetings and events on the calendar</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
