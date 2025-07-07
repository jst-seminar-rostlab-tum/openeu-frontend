'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import React from 'react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { updateFocusArea } from '@/domain/actions/onboarding';
import { focusAreaSchema } from '@/domain/schemas/OnboardingForm';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';
import {
  EU_COUNTRIES,
  POLICY_AREAS,
  REGULATORY_AREAS,
} from '@/operations/onboarding/OnboardingOperations';

export const Step3FocusArea = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  // Setup form with React Hook Form and Zod validation
  const form = useForm({
    resolver: zodResolver(focusAreaSchema),
    defaultValues: {
      topicList: [],
      geographicFocus: [],
      keyRegulatoryAreas: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof focusAreaSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    data.topicList.forEach((topic) => formData.append('topicList', topic));
    data.geographicFocus.forEach((focus) =>
      formData.append('geographicFocus', focus),
    );
    data.keyRegulatoryAreas.forEach((area) =>
      formData.append('keyRegulatoryAreas', area),
    );

    // Call server action
    const result = await updateFocusArea(formData);

    if (result.success) {
      nextStep();
    } else if (result.fieldErrors) {
      // Set server validation errors
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof z.infer<typeof focusAreaSchema>, {
          message,
        });
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
          <CardTitle className="text-2xl">Focus Areas</CardTitle>
          <CardDescription className="text-lg">
            Tell us what topics and regions you&apos;re most interested in
          </CardDescription>
        </CardHeader>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            {/* Areas of Interest (Topics) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <FormField
                control={form.control}
                name="topicList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Areas of Interest
                    </FormLabel>
                    <FormDescription>
                      Select the topics that matter most to you
                    </FormDescription>
                    <FormControl>
                      <MultiSelect
                        options={POLICY_AREAS.map((area) => ({
                          label: area,
                          value: area,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select areas of interest..."
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Geographic Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <FormField
                control={form.control}
                name="geographicFocus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Geographic Focus
                    </FormLabel>
                    <FormDescription>
                      Select the countries/regions you work with
                    </FormDescription>
                    <FormControl>
                      <MultiSelect
                        options={EU_COUNTRIES.map((country) => ({
                          label: country,
                          value: country,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select countries/regions..."
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Legislative Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <FormField
                control={form.control}
                name="keyRegulatoryAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Legislative Areas
                    </FormLabel>
                    <FormDescription>
                      Select the regulatory areas most relevant to you
                    </FormDescription>
                    <FormControl>
                      <MultiSelect
                        options={REGULATORY_AREAS.map((area) => ({
                          label: area,
                          value: area,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select regulatory areas..."
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                className="flex justify-between pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Button variant="outline" onClick={prevStep} type="button">
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="px-8"
                >
                  {form.formState.isSubmitting ? 'Validating...' : 'Continue'}
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
