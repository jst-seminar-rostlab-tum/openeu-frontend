'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';

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
import { focusAreaSchema } from '@/domain/schemas/profile';
import {
  EU_COUNTRIES,
  POLICY_AREAS,
} from '@/operations/onboarding/OnboardingOperations';

interface FocusAreaFormProps {
  action?: (formData: FormData) => Promise<void>;
  backAction?: (formData: FormData) => Promise<void>;
}

export function FocusAreaForm({ action, backAction }: FocusAreaFormProps) {
  const form = useForm({
    resolver: zodResolver(focusAreaSchema),
    defaultValues: {
      topicList: [],
      geographicFocus: [],
    },
  });

  // For server actions, we use native form submission
  if (action) {
    return (
      <Form {...form}>
        <form action={action}>
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

            <motion.div
              className="flex justify-between pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {backAction ? (
                <Button formAction={backAction} variant="outline" type="submit">
                  Back
                </Button>
              ) : (
                <Button variant="outline" type="button">
                  Back
                </Button>
              )}
              <Button type="submit" className="px-8">
                Next
              </Button>
            </motion.div>
          </CardContent>
        </form>
      </Form>
    );
  }
}
