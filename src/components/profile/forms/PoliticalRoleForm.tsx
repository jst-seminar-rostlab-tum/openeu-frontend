'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CardContent } from '@/components/ui/card';
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
import { Profile } from '@/domain/entities/profile/generated-types';
import { politicianRoleSchema } from '@/domain/schemas/profile';
import {
  POLICY_AREAS,
  POLITICAL_ROLES,
} from '@/operations/onboarding/OnboardingOperations';

interface PoliticalRoleFormProps {
  initialData?: Profile;
  onSubmit: (data: z.infer<typeof politicianRoleSchema>) => void;
}

export function PoliticalRoleForm({
  initialData,
  onSubmit,
}: PoliticalRoleFormProps) {
  const form = useForm<z.infer<typeof politicianRoleSchema>>({
    resolver: zodResolver(politicianRoleSchema),
    defaultValues: {
      politician: {
        role: initialData?.politician?.role || '',
        institution: initialData?.politician?.institution || '',
        area_of_expertise: initialData?.politician?.area_of_expertise || [],
        further_information: initialData?.politician?.further_information || '',
      },
    },
  });

  return (
    <Form {...form}>
      <form id="political-role-form" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="politician.role"
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
                        <label htmlFor={role.value} className="cursor-pointer">
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
            name="politician.institution"
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
