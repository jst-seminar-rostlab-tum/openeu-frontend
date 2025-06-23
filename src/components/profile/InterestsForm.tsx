'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Compass } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { updateProfile } from '@/domain/actions/profile';
import { Topic } from '@/domain/entities/calendar/generated-types';
import { interestsSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

export interface InterestsFormProps {
  userId: string;
  selectedTopics: string[];
  topics: Topic[];
}

export default function InterestsForm({
  userId,
  selectedTopics,
  topics,
}: InterestsFormProps) {
  const [loading, setLoading] = useState(false);

  const options = topics.map((topic) => ({
    label: topic.topic,
    value: topic.topic,
  }));

  const countries = [
    { label: 'Germany', value: 'de' },
    { label: 'Spain', value: 'es' },
    { label: 'Austria', value: 'at' },
    { label: 'Belgium', value: 'be' },
    { label: 'Poland', value: 'pl' },
  ];

  const form = useForm<z.infer<typeof interestsSchema>>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      countries: [],
      topic_list: selectedTopics,
    },
  });

  function onSubmit(values: z.infer<typeof interestsSchema>) {
    setLoading(true);
    updateProfile(userId, { topic_list: values.topic_list })
      .then(() =>
        ToastOperations.showSuccess({
          title: 'Profile updated',
          message: 'Your profile was updated successfully.',
        }),
      )
      .catch((e) =>
        ToastOperations.showError({
          title: "Profile couldn't be updated",
          message: e.message,
        }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form className="grid gap-5 pt-3" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-2 align-text-center">
              <Compass />
              <h2 className="text-lg font-semibold">Interests</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-3">
                      <FormLabel className="text-sm font-medium">
                        Countries
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={countries}
                          onValueChange={(data: string[]) =>
                            form.setValue('countries', data)
                          }
                          placeholder="Select countries"
                          variant="inverted"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
                name="countries"
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-3">
                      <FormLabel className="text-sm font-medium">
                        Topics
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={options}
                          onValueChange={(data: string[]) =>
                            form.setValue('topic_list', data)
                          }
                          placeholder="Select topics"
                          variant="inverted"
                          defaultValue={selectedTopics}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
                name="topics"
              />
            </div>
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
