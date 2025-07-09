'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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
  action: (formData: FormData) => Promise<void>;
  backAction?: (formData: FormData) => Promise<void>;
}

export function CompletionForm({ action, backAction }: CompletionFormProps) {
  const form = useForm<z.infer<typeof completionSchema>>({
    resolver: zodResolver(completionSchema),
    defaultValues: {
      newsletterFrequency: 'weekly',
    },
    mode: 'onSubmit',
  });

  // For server actions, we use native form submission
  if (action) {
    return (
      <form action={action}>
        <CardContent className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="space-y-2">
              <label
                htmlFor="newsletterFrequency"
                className="text-base font-semibold"
              >
                Newsletter Frequency
              </label>
              <select
                name="newsletterFrequency"
                defaultValue="weekly"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="none">Never</option>
              </select>
            </div>
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
            {backAction ? (
              <Button formAction={backAction} variant="outline" type="submit">
                Back
              </Button>
            ) : (
              <Button variant="outline" type="button">
                Back
              </Button>
            )}
            <Button type="submit" className="px-8">
              Finish
            </Button>
          </motion.div>
        </CardContent>
      </form>
    );
  }

  // Fallback to client-side form if no action provided
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
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
            <Button variant="outline" type="button">
              Back
            </Button>
            <Button type="submit" className="px-8">
              Finish
            </Button>
          </motion.div>
        </CardContent>
      </form>
    </Form>
  );
}
