'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Building, User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProfile, updateProfile } from '@/domain/actions/profile';
import { ProfileData } from '@/domain/entities/profile/generated-types';
import { accountDetailsSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

export interface AccountDetailsFormProps {
  userHasNoProfile: boolean;
  userId: string;
  email: string;
  name?: string;
  surname?: string;
  company_name?: string;
  company_description?: string;
}

export default function AccountDetailsForm({
  userHasNoProfile,
  userId,
  email,
  name,
  surname,
  company_name,
  company_description,
}: AccountDetailsFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name,
      surname,
      company_name,
      company_description,
    },
  });

  function onSubmit(values: z.infer<typeof accountDetailsSchema>) {
    setLoading(true);
    if (userHasNoProfile) {
      const profileData: ProfileData = {
        ...values,
        id: userId,
        topic_list: [],
        newsletter_frequency: 'daily',
      };
      createProfile(profileData)
        .then(() => {
          ToastOperations.showSuccess({
            title: 'Profile created',
            message: 'Your profile was created successfully.',
          });
          router.refresh();
        })
        .catch((e) =>
          ToastOperations.showError({
            title: "Profile couldn't be created.",
            message: e.message,
          }),
        )
        .finally(() => setLoading(false));
    } else {
      updateProfile(userId, { ...values })
        .then(() =>
          ToastOperations.showSuccess({
            title: 'Profile updated',
            message: 'Your profile was updated successfully.',
          }),
        )
        .catch((e) =>
          ToastOperations.showError({
            title: "Profile couldn't be updated.",
            message: e.message,
          }),
        )
        .finally(() => setLoading(false));
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-5 pt-3" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row gap-2 align-text-center">
                <UserIcon />
                <h2 className="text-lg font-semibold">Profile Details</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" htmlFor="name">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input id="name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-sm font-medium"
                        htmlFor="surname"
                      >
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input id="surname" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="surname"
                />
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2">
                <FormField
                  render={() => (
                    <FormItem>
                      <FormLabel
                        className="text-sm font-medium"
                        htmlFor="email"
                      >
                        E-Mail
                      </FormLabel>
                      <FormControl>
                        <Input id="email" type="email" value={email} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="email"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-2 align-text-center">
              <Building />
              <h2 className="text-lg font-semibold">Company Details</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-sm font-medium"
                        htmlFor="company_name"
                      >
                        Company name
                      </FormLabel>
                      <FormControl>
                        <Input id="company_name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="company_name"
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-sm font-medium"
                        htmlFor="company_description"
                      >
                        Company details
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="company_description"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="company_description"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-[8rem]"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner />
            ) : userHasNoProfile ? (
              'Create profile'
            ) : (
              'Save changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
