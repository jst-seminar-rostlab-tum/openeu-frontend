'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { Profile } from '@/domain/entities/profile/generated-types';
import { pathDecisionSchema } from '@/domain/schemas/profile';

interface PathDecisionFormProps {
  initialData?: Profile;
  onSubmit: (data: z.infer<typeof pathDecisionSchema>) => void;
}

export function PathDecisionForm({
  initialData,
  onSubmit,
}: PathDecisionFormProps) {
  const form = useForm<z.infer<typeof pathDecisionSchema>>({
    resolver: zodResolver(pathDecisionSchema),
    defaultValues: {
      user_type: initialData?.user_type || 'entrepreneur',
    },
  });

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
      <form id="path-decision-form" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="user_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">
                  I am a:
                </FormLabel>
                <FormControl>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
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
