'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

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
import { updatePathDecision } from '@/domain/actions/onboarding';
import { pathDecisionSchema } from '@/domain/schemas/OnboardingForm';

import { useOnboarding } from './OnboardingContext';

export const Step2PathDecision: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  const form = useForm({
    resolver: zodResolver(pathDecisionSchema),
    defaultValues: {
      userCategory: profileData.userCategory || 'entrepreneur',
    },
    mode: 'onSubmit', // Only validate when user submits
  });

  const onSubmit = async (data: {
    userCategory: 'entrepreneur' | 'politician';
  }) => {
    // Update context
    updateProfileData(data);

    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', data.userCategory);

    // Call server action
    const result = await updatePathDecision(formData);

    if (result.success) {
      nextStep();
    } else if (result.fieldErrors) {
      // Set server validation errors
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof typeof data, { message });
      });
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
          <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
          <CardDescription className="text-lg">
            Help us personalize your OpenEU experience
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
                name="userCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      I am a:
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all ${
                              field.value === 'entrepreneur'
                                ? 'ring-2 ring-primary bg-primary/5'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => field.onChange('entrepreneur')}
                          >
                            <CardContent className="p-6 text-center">
                              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                              <h3 className="font-semibold text-lg mb-2">
                                Entrepreneur
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Building or running a business, startup, or
                                company
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
                              field.value === 'politician'
                                ? 'ring-2 ring-primary bg-primary/5'
                                : 'hover:bg-muted/50'
                            }`}
                            onClick={() => field.onChange('politician')}
                          >
                            <CardContent className="p-6 text-center">
                              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                              <h3 className="font-semibold text-lg mb-2">
                                Politician/Policy Maker
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Working in politics, policy making, or public
                                service
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </CardContent>

          <motion.div
            className="flex justify-between p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button variant="outline" onClick={prevStep} type="button">
              Back
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Validating...' : 'Next'}
            </Button>
          </motion.div>
        </form>
      </Form>
    </Card>
  );
};
