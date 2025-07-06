'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Building2,
  CheckCircle,
  MapPin,
  Sparkles,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
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
import {
  completeOnboarding,
  registerUser,
  updateCompletionPreferences,
} from '@/domain/actions/onboarding';
import { completionSchema } from '@/domain/schemas/OnboardingForm';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { ToastOperations } from '@/operations/toast/toastOperations';

import { useOnboarding } from './OnboardingContext';

export const Step5Completion: React.FC = () => {
  const { profileData, updateProfileData, nextStep, prevStep, setUserId } =
    useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Setup form with React Hook Form and Zod validation
  const form = useForm({
    resolver: zodResolver(completionSchema),
    defaultValues: {
      newsletterFrequency: profileData.newsletterFrequency || 'weekly',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof completionSchema>) => {
    // Update context with form data
    updateProfileData(data);

    // Create FormData for server action
    const formData = new FormData();
    formData.append('newsletterFrequency', data.newsletterFrequency);

    // Call server action
    const result = await updateCompletionPreferences(formData);

    if (result.success) {
      // Now proceed with profile creation
      await handleCreateProfile();
    } else if (result.fieldErrors) {
      // Set server validation errors
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof z.infer<typeof completionSchema>, {
          message,
        });
      });
    }
  };

  const handleCreateProfile = async () => {
    setIsSubmitting(true);
    try {
      // Validate we have all required data
      if (
        !profileData.userCategory ||
        !profileData.name ||
        !profileData.surname ||
        !profileData.email ||
        !profileData.password
      ) {
        throw new Error('Missing required profile data');
      }

      // Step 1: Register the user first
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('surname', profileData.surname);
      formData.append('email', profileData.email);
      formData.append('password', profileData.password);

      const registrationResult = await registerUser(formData);

      if (!registrationResult.success) {
        ToastOperations.showError({
          title: 'Registration Failed',
          message: registrationResult.error || 'Failed to register user',
        });
        throw new Error(registrationResult.error || 'Failed to register user');
      }

      // Step 2: Update profile data with the new user ID
      const userId = registrationResult.data?.userId;
      if (!userId) {
        ToastOperations.showError({
          title: 'Registration Error',
          message: 'No user ID returned from registration',
        });
        throw new Error('No user ID returned from registration');
      }

      // Store userId in context for future use
      setUserId(userId);

      // Step 3: Create complete profile data with the user ID
      const completeProfileData = {
        ...profileData,
        id: userId,
        name: profileData.name,
        surname: profileData.surname,
        email: profileData.email,
        userCategory: profileData.userCategory,
        topicList: profileData.topicList || [],
        geographicFocus: profileData.geographicFocus || [],
        keyRegulatoryAreas: profileData.keyRegulatoryAreas || [],
        newsletterFrequency: profileData.newsletterFrequency,
        onboardingCompleted: true,
      };

      // Step 4: Complete onboarding using server action
      const result = await completeOnboarding(
        completeProfileData as Parameters<typeof completeOnboarding>[0],
      );

      if (result.success) {
        // Profile created successfully, show success message and move to next step
        ToastOperations.showSuccess({
          title: 'Profile Created!',
          message: 'Your OpenEU profile has been successfully created.',
        });
        nextStep();
      } else {
        // Handle field validation errors
        if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
          ToastOperations.showError({
            title: 'Validation Error',
            message: 'Please check the form fields and try again.',
          });
        } else {
          ToastOperations.showError({
            title: 'Profile Creation Failed',
            message: result.error || 'Failed to create profile',
          });
        }
        throw new Error(result.error || 'Failed to create profile');
      }
    } catch (error) {
      // Only show generic error if no specific error was already shown
      if (
        error instanceof Error &&
        !error.message.includes('Failed to register user') &&
        !error.message.includes('No user ID returned')
      ) {
        ToastOperations.showError({
          title: 'Something went wrong',
          message:
            'Please try again or contact support if the problem persists.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalizedCard = () => {
    const isEntrepreneur = profileData.userCategory === 'entrepreneur';
    const isPolitician = profileData.userCategory === 'politician';

    return (
      <motion.div
        className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-lg p-6"
        variants={staggerItem}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="font-semibold text-lg">
            Your Personalized OpenEU Experience
          </h3>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {/* User Profile Summary */}
          <motion.div variants={staggerItem} className="flex items-start gap-3">
            <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Profile:</span>{' '}
              <span className="text-muted-foreground">
                {profileData.name} {profileData.surname} •{' '}
                {isEntrepreneur ? 'Entrepreneur' : 'Politician/Policy Maker'}
                {isEntrepreneur && profileData.userType && (
                  <> • {profileData.userType.replace('_', ' ')}</>
                )}
              </span>
            </div>
          </motion.div>

          {/* Company/Organization Info */}
          {isEntrepreneur &&
            (profileData.companyName || profileData.primaryIndustry) && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Business:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.primaryIndustry}
                    {profileData.companyStage && (
                      <> • {profileData.companyStage.replace('_', ' ')} stage</>
                    )}
                    {profileData.companySize && (
                      <> • {profileData.companySize} employees</>
                    )}
                  </span>
                </div>
              </motion.div>
            )}

          {isPolitician &&
            (profileData.politicalRole || profileData.institution) && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Role:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.politicalRole?.replace('_', ' ')}
                    {profileData.institution && (
                      <> at {profileData.institution}</>
                    )}
                  </span>
                </div>
              </motion.div>
            )}

          {/* Geographic Focus */}
          {profileData.geographicFocus &&
            profileData.geographicFocus.length > 0 && (
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Geographic Focus:</span>{' '}
                  <span className="text-muted-foreground">
                    {profileData.geographicFocus.slice(0, 3).join(', ')}
                    {profileData.geographicFocus.length > 3 &&
                      ` +${profileData.geographicFocus.length - 3} more`}
                  </span>
                </div>
              </motion.div>
            )}

          {/* Areas of Interest/Expertise */}
          {((isPolitician &&
            profileData.areaOfExpertise &&
            profileData.areaOfExpertise.length > 0) ||
            (profileData.keyRegulatoryAreas &&
              profileData.keyRegulatoryAreas.length > 0)) && (
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3"
            >
              <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">
                  {isPolitician
                    ? 'Areas of Expertise:'
                    : 'Key Regulatory Areas:'}
                </span>{' '}
                <span className="text-muted-foreground">
                  {isPolitician
                    ? profileData.areaOfExpertise?.slice(0, 3).join(', ')
                    : profileData.keyRegulatoryAreas?.slice(0, 3).join(', ')}
                  {((isPolitician &&
                    profileData.areaOfExpertise &&
                    profileData.areaOfExpertise.length > 3) ||
                    (profileData.keyRegulatoryAreas &&
                      profileData.keyRegulatoryAreas.length > 3)) &&
                    ` +${(isPolitician ? profileData.areaOfExpertise?.length : profileData.keyRegulatoryAreas?.length)! - 3} more`}
                </span>
              </div>
            </motion.div>
          )}

          {/* Personalization Benefits */}
          <div className="pt-2 border-t border-primary/20">
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Smart Filtering:
                </span>{' '}
                Get updates relevant to your{' '}
                {isEntrepreneur
                  ? 'industry and business stage'
                  : 'policy areas and expertise'}
              </div>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3 mt-2"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Contextual Insights:
                </span>{' '}
                Understand regulatory impact specific to your work
              </div>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-start gap-3 mt-2"
            >
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Priority Notifications:
                </span>{' '}
                Focus on{' '}
                {profileData.geographicFocus?.slice(0, 2).join(' and ')}{' '}
                legislation
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription className="text-lg">
            Set your preferences and finalize your OpenEU experience
          </CardDescription>
        </CardHeader>
      </motion.div>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              {/* Notification Frequency */}
              <motion.div variants={staggerItem}>
                <FormField
                  control={form.control}
                  name="newsletterFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Notification Frequency
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How often would you like to receive updates?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="daily">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">Daily</span>
                              <span className="text-xs text-muted-foreground">
                                Stay on top of everything
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="weekly">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">Weekly</span>
                              <span className="text-xs text-muted-foreground">
                                Curated highlights and summaries
                              </span>
                            </div>
                          </SelectItem>
                          <SelectItem value="none">
                            <div className="flex flex-col items-start">
                              <span className="font-medium">None</span>
                              <span className="text-xs text-muted-foreground">
                                Browse when you want, no emails
                              </span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Personalized Expertise Card */}
              {renderPersonalizedCard()}

              {/* Info Note */}
              <motion.div
                variants={staggerItem}
                className="bg-muted p-4 rounded-lg text-center"
              >
                <p className="text-sm text-muted-foreground">
                  You can update these preferences anytime in your profile
                  settings.
                </p>
              </motion.div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
                type="button"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || form.formState.isSubmitting}
                className="px-8"
              >
                {isSubmitting || form.formState.isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    Creating Profile...
                  </>
                ) : (
                  'Create Profile'
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
