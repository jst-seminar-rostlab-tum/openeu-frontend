'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { onboardingSchema } from '@/domain/schemas/profile';
import { POLICY_AREAS } from '@/operations/onboarding/OnboardingOperations';

interface PoliticalRoleFormProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export function PoliticalRoleForm({ form }: PoliticalRoleFormProps) {
  return (
    <Form {...form}>
      <form>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="politician.role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your role</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your role..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="politician.institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Organization, Institution, or Political Party
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., European Parliament, Ministry of Finance, Democratic Party..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="politician.area_of_expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  Area of Expertise
                </FormLabel>
                <FormControl>
                  <MultiSelect
                    options={POLICY_AREAS.map((area) => ({
                      label: area,
                      value: area,
                    }))}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select areas of expertise..."
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </form>
    </Form>
  );
}
