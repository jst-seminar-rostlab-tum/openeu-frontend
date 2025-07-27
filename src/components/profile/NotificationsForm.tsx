'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { CompletionForm } from '@/components/profile/forms/CompletionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  Profile,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { completionSchema } from '@/domain/schemas/profile';

interface NotificationsFormProps {
  profile: Profile;
  updateProfile: (userId: string, data: ProfileUpdate) => void;
  loading: boolean;
}

export default function NotificationsForm({
  profile,
  updateProfile,
  loading,
}: NotificationsFormProps) {
  function onSubmit(values: z.infer<typeof completionSchema>) {
    updateProfile(profile.id, { ...values });
  }

  const form = useForm<z.infer<typeof completionSchema>>({
    resolver: zodResolver(completionSchema),
    defaultValues: {
      newsletter_frequency: profile.newsletter_frequency,
    },
  });

  return (
    <Form {...form}>
      <form className="grid gap-5 pt-3" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-2 align-text-center">
              <Bell />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent>
            <CompletionForm form={form} />
          </CardContent>
        </Card>
        <div className="flex justify-end">
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
  );
}
