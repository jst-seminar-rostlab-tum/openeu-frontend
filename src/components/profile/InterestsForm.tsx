'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Compass } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { FocusAreaForm } from '@/components/profile/forms/FocusAreaForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  Profile,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { focusAreaSchema } from '@/domain/schemas/profile';

export interface InterestsFormProps {
  profile: Profile;
  updateProfile: (userId: string, data: ProfileUpdate) => void;
}

export default function InterestsForm({
  profile,
  updateProfile,
}: InterestsFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof focusAreaSchema>>({
    resolver: zodResolver(focusAreaSchema),
    defaultValues: {
      countries: profile.countries,
      topic_ids: profile.topic_ids,
    },
  });

  function onSubmit(values: z.infer<typeof focusAreaSchema>) {
    setLoading(true);
    updateProfile(profile.id, { ...values });
    setLoading(false);
  }

  return (
    <Form {...form}>
      <div className="grid gap-5 pt-3">
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-2 align-text-center">
              <Compass />
              <h2 className="text-lg font-semibold">Focus Areas</h2>
            </div>
          </CardHeader>
          <CardContent>
            <FocusAreaForm form={form} />
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
    </Form>
  );
}
