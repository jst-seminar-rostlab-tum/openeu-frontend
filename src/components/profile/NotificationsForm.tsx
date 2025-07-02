'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateProfile } from '@/domain/actions/profile';
import { notificationSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

export interface NotificationsFormProps {
  userId: string;
  newsletter_frequency: 'daily' | 'weekly' | 'none';
}

export default function NotificationsForm({
  userId,
  newsletter_frequency,
}: NotificationsFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      newsletter_frequency,
    },
  });

  function onSubmit(values: z.infer<typeof notificationSchema>) {
    setLoading(true);
    updateProfile(userId, { ...values })
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
              <Bell />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
                    <FormLabel
                      htmlFor="newsletter_frequency"
                      className="text-sm font-medium"
                    >
                      Frequency of personalized newsletter
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) =>
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-expect-error
                          form.setValue('newsletter_frequency', value)
                        }
                      >
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Daily" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
              name="newsletter_frequency"
            />
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
