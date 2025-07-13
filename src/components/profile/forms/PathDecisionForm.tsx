'use client';

import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import z from 'zod';

import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { onboardingSchema } from '@/domain/schemas/profile';

interface PathDecisionFormProps {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
}

export function PathDecisionForm({ form }: PathDecisionFormProps) {
  const options = [
    {
      value: 'entrepreneur',
      label: 'Entrepreneur',
      description: 'Building or running a business, startup, or company',
      icon: Building2,
    },
    {
      value: 'politician',
      label: 'Politician/Policy Maker',
      description: 'Working in politics, policy making, or public service',
      icon: Users,
    },
  ];

  return (
    <Form {...form}>
      <form>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel className="text-base font-semibold">
                  I am a:
                </FormLabel>
                <FormControl>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = field.value === option.value;

                      return (
                        <motion.div
                          key={option.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all hover:bg-muted/50 ${
                              isSelected
                                ? 'ring-2 ring-primary bg-primary/5'
                                : ''
                            }`}
                            onClick={() => field.onChange(option.value)}
                          >
                            <CardContent className="p-6 text-center">
                              <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                              <h3 className="font-semibold text-lg mb-2">
                                {option.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </motion.div>
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
