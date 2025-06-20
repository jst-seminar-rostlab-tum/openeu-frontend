import { zodResolver } from '@hookform/resolvers/zod';
import { Building, User as UserIcon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useProfileContext } from '@/domain/hooks/profileHook';

export default function AccountDetailsForm() {
  const { user } = useProfileContext();

  const accountDetailsSchema = z.object({
    picture: z.instanceof(File).optional(),
    name: z.string().min(2),
    surname: z.string().min(2),
    email: z.string().email(),
    company_name: z.string().min(2),
    company_description: z.string().min(2),
  });

  const form = useForm<z.infer<typeof accountDetailsSchema>>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      company_name: '',
      company_description: '',
    },
  });

  function onSubmit(values: z.infer<typeof accountDetailsSchema>) {
    console.log(values);
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
                        <Input id="email" type="email" {...field} />
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
          <Button type="submit" className="w-[8rem]">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
