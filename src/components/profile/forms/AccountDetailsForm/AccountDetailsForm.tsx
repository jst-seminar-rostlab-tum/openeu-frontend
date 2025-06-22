import { zodResolver } from '@hookform/resolvers/zod';
import { Building, User as UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
import { ProfileData } from '@/domain/entities/profile/generated-types';
import { useProfileContext } from '@/domain/hooks/profileHooks';
import { accountDetailsSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

export default function AccountDetailsForm() {
  const [loading, setLoading] = useState(false);
  const { user, userHasNoProfile, profile, createProfile, updateProfile } =
    useProfileContext();

  const form = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name: profile ? profile.name : '',
      surname: profile ? profile.surname : '',
      company_name: profile ? profile.company_name : '',
      company_description: profile ? profile.company_description : '',
    },
  });

  useEffect(() => {
    if (profile && profile.name) {
      form.setValue('name', profile.name);
      form.setValue('surname', profile.surname);
      form.setValue('company_name', profile.company_name);
      form.setValue('company_description', profile.company_description);
    }
  }, [form, profile]);

  function onSubmit(values: z.infer<typeof accountDetailsSchema>) {
    setLoading(true);
    if (userHasNoProfile) {
      if (!user?.id) {
        ToastOperations.showError({
          title: "Profile couldn't be created.",
          message: 'User ID is missing.',
        });
        return;
      }

      const profileData: ProfileData = {
        ...values,
        id: user?.id,
        topic_list: [],
        subscribed_newsletter: true,
      };
      createProfile(profileData)
        .then(() =>
          ToastOperations.showSuccess({
            title: 'Profile created',
            message: 'Your profile was created successfully.',
          }),
        )
        .catch((e) =>
          ToastOperations.showError({
            title: "Profile couldn't be created.",
            message: e.message,
          }),
        )
        .finally(() => setLoading(false));
    } else {
      updateProfile({ ...values })
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

  if (!user) return;

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
            <div className="grid grid-cols-2 gap-5">
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
              <div className="flex flex-col gap-3 col-span-2">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-sm font-medium"
                        htmlFor="email"
                      >
                        E-Mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          {...field}
                          value={user?.email}
                          disabled
                        />
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
            <div className="grid grid-cols-2 gap-5">
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
          <Button type="submit" className="w-[8rem]" disabled={loading}>
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
