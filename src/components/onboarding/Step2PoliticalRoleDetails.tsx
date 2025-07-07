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
import { Checkbox } from '@/components/ui/checkbox';
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
import { updateRoleDetails } from '@/domain/actions/onboarding';
import { politicianRoleSchema } from '@/domain/schemas/OnboardingForm';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';
import {
  POLICY_AREAS,
  POLITICAL_ROLES,
} from '@/operations/onboarding/OnboardingOperations';

export const Step2PoliticalRoleDetails = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  // Create form with politician schema
  const form = useForm<z.infer<typeof politicianRoleSchema>>({
    resolver: zodResolver(politicianRoleSchema),
    defaultValues: {
      politicalRole: 'mep',
      institution: '',
      politicalParty: '',
      areaOfExpertise: [],
      companyDescription: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof politicianRoleSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', 'politician');

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, String(item)));
      } else {
        formData.append(key, String(value));
      }
    });

    // Call server action
    const result = await updateRoleDetails(formData);

    if (result.success) {
      nextStep();
    } else if (result.fieldErrors) {
      // Set server validation errors
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof z.infer<typeof politicianRoleSchema>, {
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
          <CardTitle className="text-2xl">Tell us about your role</CardTitle>
          <CardDescription className="text-lg">
            Help us understand your political work and expertise
          </CardDescription>
        </CardHeader>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="politicalRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Role Description
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 gap-3">
                      {POLITICAL_ROLES.map((role) => (
                        <div
                          key={role.value}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50"
                        >
                          <Checkbox
                            id={role.value}
                            checked={field.value === role.value}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(role.value);
                              }
                            }}
                          />
                          <label
                            htmlFor={role.value}
                            className="cursor-pointer"
                          >
                            {role.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization/Institution</FormLabel>
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
              name="areaOfExpertise"
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

            <div className="flex justify-between pt-6">
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
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
