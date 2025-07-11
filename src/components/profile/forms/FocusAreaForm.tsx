'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { europeanCountries } from '@/components/map/constants';
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
import { useTopics } from '@/domain/hooks/topicHook';
import { onboardingSchema } from '@/domain/schemas/profile';

interface FocusAreaFormProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export function FocusAreaForm({ form }: FocusAreaFormProps) {
  const { data: topics } = useTopics();

  return (
    <Form {...form}>
      <form>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Areas of Interest (Topics) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <FormField
              control={form.control}
              name="topic_ids"
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
                      options={
                        topics?.map((topic) => ({
                          label: topic.topic,
                          value: topic.id,
                        })) || []
                      }
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
              name="countries"
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
                      options={europeanCountries.map((country) => ({
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
        </CardContent>
      </form>
    </Form>
  );
}
