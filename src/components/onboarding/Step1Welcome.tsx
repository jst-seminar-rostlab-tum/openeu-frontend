'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useOnboardingForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registrationSchema } from '@/domain/schemas/OnboardingForm';
import { staggerContainer, staggerItem } from '@/lib/animations';

import { useOnboarding } from './OnboardingContext';

export const Step1Welcome: React.FC = () => {
  const { profileData, updateProfileData, nextStep } = useOnboarding();

  const { form, handleSubmit, isSubmitting } = useOnboardingForm(
    registrationSchema,
    {
      name: profileData.name || '',
      surname: profileData.surname || '',
      email: profileData.email || '',
      password: profileData.password || '',
    },
    (data) => {
      // Update the onboarding context with form data
      updateProfileData(data);
      nextStep();
    },
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Account 🇪🇺</CardTitle>
          <CardDescription className="text-lg">
            Join OpenEU and get personalized regulatory insights for your work
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        <motion.div
          className="text-center p-6 bg-muted rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h3 className="font-semibold mb-2">Why join OpenEU?</h3>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-2 text-sm text-muted-foreground"
          >
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Get relevant regulatory updates for your work</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Connect with stakeholders and decision makers</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Receive tailored insights and recommendations</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a secure password (min. 8 characters)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                className="flex justify-end pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button type="submit" disabled={isSubmitting} className="px-8">
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  );
};
