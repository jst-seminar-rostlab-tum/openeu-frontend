'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserIdentity, UserResponse } from '@supabase/supabase-js';
import { Globe, Lock } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoLogoGoogle } from 'react-icons/io';
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
  linkGoogleAccount,
  unlinkGoogleAccount,
  updatePassword,
} from '@/domain/actions/profile';
import { securitySchema } from '@/domain/schemas/profile';
import { createClient } from '@/lib/supabase/client';
import { ToastOperations } from '@/operations/toast/toastOperations';

export default function SecurityForm() {
  const [loading, setLoading] = useState(false);
  const client = createClient();

  const form = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      new_password: '',
      confirm_new_password: '',
    },
  });

  const handleUserResponse = (response: UserResponse) => {
    if (response.error) {
      ToastOperations.showError({
        title: 'Password could not be changed',
        message: response.error.message,
      });
    } else {
      ToastOperations.showSuccess({
        title: 'Password was changed',
        message: 'Your password was successfully changed.',
      });
    }
  };

  function onSubmit(values: z.infer<typeof securitySchema>) {
    setLoading(true);
    updatePassword(values.new_password)
      .then(handleUserResponse)
      .catch((reason) =>
        ToastOperations.showError({
          title: 'Password could not be changed',
          message: reason.message,
        }),
      )
      .finally(() => setLoading(false));
  }

  const googleAction = (isLinked: boolean) => {
    if (isLinked) {
      unlinkGoogleAccount()
        .then(() =>
          ToastOperations.showSuccess({
            title: 'Success',
            message: 'Your google account was successfully unlinked!',
          }),
        )
        .catch((reason) =>
          ToastOperations.showError({
            title: 'Error',
            message: reason.message ?? 'Unknown error',
          }),
        )
        .finally(fetchIdentities);
    } else {
      linkGoogleAccount()
        .then(() =>
          ToastOperations.showInfo({
            title: 'Started Google linking',
            message: 'You will be redirected to Google Sign in soon.',
          }),
        )
        .catch((reason) =>
          ToastOperations.showError({
            title: 'Error',
            message: reason.message ?? 'Unknown error',
          }),
        );
    }
  };

  const [userIdentities, setUserIdentities] = useState<UserIdentity[]>([]);
  const fetchIdentities = () => {
    client.auth
      .getUserIdentities()
      .then(({ data }) => setUserIdentities(data?.identities ?? []));
  };
  useMemo(fetchIdentities, [client.auth]);

  const googleIdentity = userIdentities.find(
    (identity) => identity.provider === 'google',
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const email = googleIdentity?.email;
  return (
    <div className="grid gap-5 pt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <div className="flex flex-row gap-2 align-text-center">
                <Lock />
                <h2 className="text-lg font-semibold">Security</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="new_password"
                        className="text-sm font-medium"
                      >
                        New password
                      </FormLabel>
                      <FormControl>
                        <Input id="new_password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="new_password"
                />

                <FormField
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="confirm_new_password"
                        className="text-sm font-medium"
                      >
                        Confirm new password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirm_new_password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="confirm_new_password"
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="w-full sm:w-[8rem]"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Save changes'}
            </Button>
          </div>
        </form>
      </Form>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row gap-2 align-text-center">
              <Globe />
              <h2 className="text-lg font-semibold">Connected Accounts</h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div className="flex gap-3">
              <div className="flex justify-center items-center rounded-full bg-muted size-10">
                <IoLogoGoogle className="size-6" />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Google</p>
                <p className="text-muted-foreground">
                  {googleIdentity ? email : 'Not connected'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => googleAction(!!googleIdentity)}
              className="w-full sm:w-auto"
            >
              {!googleIdentity ? 'Link' : 'Unlink'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
