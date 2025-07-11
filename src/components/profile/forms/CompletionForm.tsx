'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

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
import { onboardingSchema } from '@/domain/schemas/profile';

interface CompletionFormProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export function CompletionForm({ form }: CompletionFormProps) {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="newsletter_frequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              Newsletter Frequency
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="min-w-2xs">
                  <SelectValue placeholder="Select frequency" />
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
    </Form>
  );
}
