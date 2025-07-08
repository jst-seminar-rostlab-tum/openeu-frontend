'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
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
import { entrepreneurRoleSchema } from '@/domain/schemas/OnboardingForm';
import { INDUSTRIES } from '@/operations/onboarding/OnboardingOperations';

interface EntrepreneurRoleFormProps {
  onSubmit: (data: z.infer<typeof entrepreneurRoleSchema>) => Promise<void>;
  onBack?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  showBackButton?: boolean;
}

export const EntrepreneurRoleForm = ({
  onSubmit,
  onBack,
  isSubmitting = false,
  submitButtonText = 'Continue',
  showBackButton = true,
}: EntrepreneurRoleFormProps) => {
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

  const handleSubmit = async (data: z.infer<typeof entrepreneurRoleSchema>) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
          </div>
        </CardContent>
      </form>
    </Form>
  );
};
