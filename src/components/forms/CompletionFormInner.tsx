'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { completionSchema } from '@/domain/schemas/OnboardingForm';

interface CompletionFormProps {
  onSubmit: (data: z.infer<typeof completionSchema>) => Promise<void>;
  onBack?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  showBackButton?: boolean;
}

export const CompletionForm = ({
  onSubmit,
  onBack,
  isSubmitting = false,
  submitButtonText = 'Complete Profile',
  showBackButton = true,
}: CompletionFormProps) => {
  const form = useForm<z.infer<typeof completionSchema>>({
    resolver: zodResolver(completionSchema),
    defaultValues: {
      newsletterFrequency: 'weekly',
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: z.infer<typeof completionSchema>) => {
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
              name="newsletterFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Newsletter Frequency
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How often would you like updates?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="none">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="text-center p-6 bg-muted rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="font-semibold mb-4">What&apos;s next?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Access your personalized dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Start receiving tailored updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Connect with relevant stakeholders</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-between pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
              {isSubmitting || form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Completing...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </motion.div>
        </CardContent>
      </form>
    </Form>
  );
};
