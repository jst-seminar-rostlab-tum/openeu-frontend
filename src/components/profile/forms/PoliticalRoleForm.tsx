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
import { Textarea } from '@/components/ui/textarea';
import { onboardingSchema } from '@/domain/schemas/profile';
import { POLICY_AREAS } from '@/operations/onboarding/OnboardingOperations';

interface PoliticalRoleFormProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export function PoliticalRoleForm({ form }: PoliticalRoleFormProps) {
  return (
    <Form {...form}>
      <form>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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
              <FormItem className="col-span-full">
                <FormLabel>Area of Expertise</FormLabel>
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

          <FormField
            control={form.control}
            name="politician.further_information"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Further information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe your company or business idea..."
                    className="min-h-[100px]"
                    {...field}
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
