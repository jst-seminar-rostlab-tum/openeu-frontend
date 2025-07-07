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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateRoleDetails } from '@/domain/actions/onboarding';
import { entrepreneurRoleSchema } from '@/domain/schemas/OnboardingForm';
import { useOnboardingNavigation } from '@/hooks/useOnboardingNavigation';
import { INDUSTRIES } from '@/operations/onboarding/OnboardingOperations';

export const Step2EntrepreneurRoleDetails = () => {
  const { nextStep, prevStep } = useOnboardingNavigation();

  // Create form with entrepreneur schema
  const form = useForm<z.infer<typeof entrepreneurRoleSchema>>({
    resolver: zodResolver(entrepreneurRoleSchema),
    defaultValues: {
      userType: [],
      companyStage: 'idea',
      companySize: '1',
      primaryIndustry: '',
      businessModel: 'b2b',
      regulatoryComplexity: 'low',
      companyDescription: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof entrepreneurRoleSchema>) => {
    // Create FormData for server action
    const formData = new FormData();
    formData.append('userCategory', 'entrepreneur');

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
        form.setError(field as keyof z.infer<typeof entrepreneurRoleSchema>, {
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
          <CardTitle className="text-2xl">
            Tell us about your business
          </CardTitle>
          <CardDescription className="text-lg">
            Help us understand your company and industry
          </CardDescription>
        </CardHeader>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Role Description
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { value: 'founder', label: 'Founder / Co-founder' },
                        {
                          value: 'startup_employee',
                          label: 'Startup Employee',
                        },
                        { value: 'consultant', label: 'Business Consultant' },
                        { value: 'investor', label: 'Investor / VC' },
                        { value: 'other', label: 'Other' },
                      ]}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select your role(s)"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Stage</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series_a">Series A</SelectItem>
                        <SelectItem value="series_b">Series B</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="established">Established</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-10">2-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="200+">200+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="primaryIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your company, what you do, and your goals..."
                      rows={4}
                      {...field}
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
