'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
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
import { focusAreaSchema } from '@/domain/schemas/OnboardingForm';
import {
  EU_COUNTRIES,
  POLICY_AREAS,
  REGULATORY_AREAS,
} from '@/operations/onboarding/OnboardingOperations';

interface FocusAreaFormProps {
  onSubmit: (data: z.infer<typeof focusAreaSchema>) => Promise<void>;
  onBack?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  showBackButton?: boolean;
}

export const FocusAreaForm = ({
  onSubmit,
  onBack,
  isSubmitting = false,
  submitButtonText = 'Continue',
  showBackButton = true,
}: FocusAreaFormProps) => {
  const form = useForm({
    resolver: zodResolver(focusAreaSchema),
    defaultValues: {
      topicList: [],
      geographicFocus: [],
      keyRegulatoryAreas: [],
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: z.infer<typeof focusAreaSchema>) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              {showBackButton && onBack && (
                <Button variant="outline" onClick={onBack} type="button">
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || form.formState.isSubmitting}
                className="px-8"
                style={{
                  marginLeft: !showBackButton || !onBack ? 'auto' : undefined,
                }}
              >
                {isSubmitting || form.formState.isSubmitting
                  ? 'Validating...'
                  : submitButtonText}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </form>
    </Form>
  );
};
