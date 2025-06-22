'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Compass } from 'lucide-react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useProfileContext } from '@/domain/hooks/profileHooks';

export default function InterestsForm() {
  const { profile } = useProfileContext();

  const topics = [
    { label: 'Topic 1', value: 'Topic 1' },
    { label: 'Topic 2', value: 'Topic 2' },
    { label: 'Topic 3', value: 'Topic 3' },
    { label: 'Topic 4', value: 'Topic 4' },
  ];

  const countries = [
    { label: 'Germany', value: 'de' },
    { label: 'Spain', value: 'es' },
    { label: 'Austria', value: 'at' },
    { label: 'Belgium', value: 'be' },
    { label: 'Poland', value: 'pl' },
  ];

  const interestsSchema = z.object({
    countries: z.array(z.string()),
    //      .min(1, { message: 'At least one country must be selected.' }),
    topics: z.array(z.string()),
    //      .min(1, { message: 'At least one topic must be selected.' }),
  });

  const form = useForm<z.infer<typeof interestsSchema>>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      countries: [],
      topics: [],
    },
  });

  useEffect(() => {
    if (profile && profile.name) {
      form.setValue('countries', []);
      form.setValue('topics', profile.topic_list);
    }
  }, [form, profile]);

  function onSubmit(values: z.infer<typeof interestsSchema>) {
    //TODO: placeholder remove
    // eslint-disable-next-line
    console.log(values);
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
            <div className="grid grid-cols-2 gap-5">
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
                          options={topics}
                          onValueChange={(data: string[]) =>
                            form.setValue('topics', data)
                          }
                          placeholder="Select topics"
                          variant="inverted"
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
          <Button type="submit" className="w-[8rem]">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
