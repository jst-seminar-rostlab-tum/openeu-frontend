'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { completionSchema } from '@/domain/schemas/OnboardingForm';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';

export const Step4Completion = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Setup form with React Hook Form and Zod validation
  const form = useForm<z.infer<typeof completionSchema>>({
    resolver: zodResolver(completionSchema),
    defaultValues: {
      newsletterFrequency: 'weekly',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (_data: z.infer<typeof completionSchema>) => {
    setIsSubmitting(true);
    try {
      // For now, we'll just simulate saving the newsletter preference
      // In a real implementation, you would save this to the user's profile
      // Newsletter frequency: _data.newsletterFrequency

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to final step
      nextStep();
    } catch (_error) {
      // Handle error silently for demo
    } finally {
      setIsSubmitting(false);
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
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription className="text-lg">
            Just a few final preferences to personalize your experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <FormField
                control={form.control}
                name="newsletterFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Newsletter Frequency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="How often would you like updates?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="none">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              className="text-center p-6 bg-muted rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="font-semibold mb-4">What&apos;s next?</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Access your personalized dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Start receiving tailored updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Connect with relevant stakeholders</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-between pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button variant="outline" onClick={prevStep} type="button">
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="px-8">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </Button>
            </motion.div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
