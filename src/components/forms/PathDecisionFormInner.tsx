'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Building2, Users } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { pathDecisionSchema } from '@/domain/schemas/OnboardingForm';

interface PathDecisionFormProps {
  onSubmit: (data: {
    userCategory: 'entrepreneur' | 'politician';
  }) => Promise<void>;
  isSubmitting?: boolean;
  submitButtonText?: string;
}

export const PathDecisionForm = ({
  onSubmit,
  isSubmitting = false,
  submitButtonText = 'Next',
}: PathDecisionFormProps) => {
  const form = useForm({
    resolver: zodResolver(pathDecisionSchema),
    defaultValues: {
      userCategory: 'entrepreneur' as 'entrepreneur' | 'politician',
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: z.infer<typeof pathDecisionSchema>) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <FormField
              control={form.control}
              name="userCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    I am a:
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all ${
                            field.value === 'entrepreneur'
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => field.onChange('entrepreneur')}
                        >
                          <CardContent className="p-6 text-center">
                            <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold text-lg mb-2">
                              Entrepreneur
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Building or running a business, startup, or
                              company
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all ${
                            field.value === 'politician'
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => field.onChange('politician')}
                        >
                          <CardContent className="p-6 text-center">
                            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold text-lg mb-2">
                              Politician/Policy Maker
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Working in politics, policy making, or public
                              service
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </CardContent>

        <motion.div
          className="flex justify-end p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting || form.formState.isSubmitting}
          >
            {isSubmitting || form.formState.isSubmitting
              ? 'Validating...'
              : submitButtonText}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};
