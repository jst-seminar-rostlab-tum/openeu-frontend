'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { politicianRoleSchema } from '@/domain/schemas/OnboardingForm';
import {
  POLICY_AREAS,
  POLITICAL_ROLES,
} from '@/operations/onboarding/OnboardingOperations';

interface PoliticalRoleFormProps {
  action?: (formData: FormData) => Promise<void>;
  backAction?: () => Promise<void>;
}

export function PoliticalRoleForm({
  action,
  backAction,
}: PoliticalRoleFormProps) {
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

  return (
    <Form {...form}>
      <form action={action}>
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

          <motion.div
            className="flex justify-between gap-4 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button variant="outline" type="button" onClick={backAction}>
              Back
            </Button>
            <Button type="submit" className="px-8">
              Next
            </Button>
          </motion.div>
        </CardContent>
      </form>
    </Form>
  );
}
