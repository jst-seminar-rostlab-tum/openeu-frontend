'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
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
import {
  Profile,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { accountDetailsSchema } from '@/domain/schemas/profile';

export interface AccountDetailsFormProps {
  email: string;
  profile: Profile;
  updateProfile: (userId: string, data: ProfileUpdate) => void;
}

export default function AccountDetailsForm({
  profile,
  email,
  updateProfile,
}: AccountDetailsFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name: profile.name,
      surname: profile.surname,
    },
  });

  function onSubmit(values: z.infer<typeof accountDetailsSchema>) {
    setLoading(true);
    updateProfile(profile.id, { ...values });
    setLoading(false);
  }

  return (
    <div className="grid gap-5">
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
          <Form {...form}>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="text-sm font-medium"
                          htmlFor="name"
                        >
                          First name
                        </FormLabel>
                        <FormControl>
                          <Input id="name" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="surname"
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
                  />
                </div>
                <div className="flex flex-col gap-3 sm:col-span-full">
                  <FormField
                    name="email"
                    render={() => (
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
                            value={email}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-[8rem]"
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {loading ? <LoadingSpinner /> : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
