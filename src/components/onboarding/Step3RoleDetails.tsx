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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { updateRoleDetails } from '@/domain/actions/onboarding';
import {
  entrepreneurRoleSchema,
  politicianRoleSchema,
} from '@/domain/schemas/OnboardingForm';
import {
  INDUSTRIES,
  POLICY_AREAS,
  POLITICAL_ROLES,
} from '@/operations/onboarding/OnboardingOperations';

import { useOnboarding } from './OnboardingContext';

export const Step3RoleDetails: React.FC = () => {
  const { profileData } = useOnboarding();

  // Render different components based on user category to avoid union type issues
  if (profileData.userCategory === 'entrepreneur') {
    return <EntrepreneurRoleDetails />;
  } else {
    return <PoliticianRoleDetails />;
  }
};

const EntrepreneurRoleDetails: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  // Create form with entrepreneur schema
  const form = useForm<z.infer<typeof entrepreneurRoleSchema>>({
    resolver: zodResolver(entrepreneurRoleSchema),
    defaultValues: {
      userType:
        (profileData.userType as
          | 'founder'
          | 'startup_employee'
          | 'consultant'
          | 'investor'
          | 'other') || 'founder',
      companyName: profileData.companyName || '',
      companyStage:
        (profileData.companyStage as
          | 'idea'
          | 'pre_seed'
          | 'seed'
          | 'series_a'
          | 'series_b'
          | 'growth'
          | 'established') || 'idea',
      companySize:
        (profileData.companySize as
          | '1'
          | '2-10'
          | '11-50'
          | '51-200'
          | '200+') || '1',
      primaryIndustry: profileData.primaryIndustry || '',
      businessModel:
        (profileData.businessModel as
          | 'b2b'
          | 'b2c'
          | 'b2b2c'
          | 'marketplace'
          | 'saas'
          | 'hardware'
          | 'other') || 'b2b',
      regulatoryComplexity:
        (profileData.regulatoryComplexity as 'low' | 'medium' | 'high') ||
        'low',
      companyDescription: profileData.companyDescription || '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof entrepreneurRoleSchema>) => {
    // Update context with form data
    updateProfileData(data);

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
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { value: 'founder', label: 'Founder / Co-founder' },
                        {
                          value: 'startup_employee',
                          label: 'Startup Employee',
                        },
                        { value: 'consultant', label: 'Business Consultant' },
                        { value: 'investor', label: 'Investor / VC' },
                        { value: 'other', label: 'Other' },
                      ].map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50"
                        >
                          <Checkbox
                            id={option.value}
                            checked={field.value === option.value}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange(option.value);
                              }
                            }}
                          />
                          <label
                            htmlFor={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company Inc." {...field} />
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
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regulatoryComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regulatory Complexity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regulatory complexity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
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

const PoliticianRoleDetails: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep } =
    useOnboarding();

  // Create form with politician schema
  const form = useForm<z.infer<typeof politicianRoleSchema>>({
    resolver: zodResolver(politicianRoleSchema),
    defaultValues: {
      politicalRole:
        (profileData.politicalRole as
          | 'mep'
          | 'national_mp'
          | 'local_representative'
          | 'policy_advisor'
          | 'civil_servant'
          | 'other') || 'mep',
      institution: profileData.institution || '',
      politicalParty: profileData.politicalParty || '',
      areaOfExpertise: profileData.areaOfExpertise || [],
      companyDescription: profileData.companyDescription || '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof politicianRoleSchema>) => {
    // Update context with form data
    updateProfileData(data);

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
                  <FormLabel>
                    Organization/Institution/Political Party
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
              name="politicalParty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Political Party (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., EPP, S&D" {...field} />
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

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Further Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your work, responsibilities, and policy interests..."
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
