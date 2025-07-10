'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Profile } from '@/domain/entities/profile/generated-types';
import { entrepreneurRoleSchema } from '@/domain/schemas/profile';
import {
  COMPANY_SIZES,
  COMPANY_STAGES,
  INDUSTRIES,
} from '@/operations/onboarding/OnboardingOperations';

interface EntrepreneurRoleFormProps {
  initialData?: Profile;
  onSubmit: (data: z.infer<typeof entrepreneurRoleSchema>) => void;
}

export function EntrepreneurRoleForm({
  initialData,
  onSubmit,
}: EntrepreneurRoleFormProps) {
  const form = useForm<z.infer<typeof entrepreneurRoleSchema>>({
    resolver: zodResolver(entrepreneurRoleSchema),
    defaultValues: {
      company: {
        role: initialData?.company?.role || '',
        name: initialData?.company?.name || '',
        description: initialData?.company?.description || '',
        company_stage: initialData?.company?.company_stage || '',
        company_size: initialData?.company?.company_size || '',
        industry: '',
      },
    },
  });

  return (
    <Form {...form}>
      <form id="entrepreneur-role-form" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="company.role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization/Institution</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your role..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company.company_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Stage</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMPANY_STAGES.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
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
              name="company.company_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
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
              name="company.industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your primary industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company.description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
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
