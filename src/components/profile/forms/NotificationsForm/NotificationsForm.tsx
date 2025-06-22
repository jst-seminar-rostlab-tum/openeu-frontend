import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useProfileContext } from '@/domain/hooks/profileHooks';
import { notificationSchema } from '@/domain/schemas/profile';
import { ToastOperations } from '@/operations/toast/toastOperations';

export default function NotificationsForm() {
  const [loading, setLoading] = useState(false);
  const { profile, updateProfile } = useProfileContext();

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      subscribed_newsletter: true,
    },
  });

  function onSubmit(values: z.infer<typeof notificationSchema>) {
    setLoading(true);
    updateProfile({ ...values })
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

  useEffect(() => {
    if (profile && profile.name) {
      form.setValue('subscribed_newsletter', profile.subscribed_newsletter);
    }
  }, [form, profile]);

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
                  <div className="flex gap-3">
                    <FormControl>
                      <Checkbox
                        id="subscribed_newsletter"
                        {...field}
                        onCheckedChange={(value) =>
                          form.setValue('subscribed_newsletter', !!value)
                        }
                        defaultChecked={form.getValues('subscribed_newsletter')}
                      />
                    </FormControl>
                    <FormLabel htmlFor="subscribed_newsletter">
                      Receive a daily personalized newsletter
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
              name="subscribed_newsletter"
            />
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button type="submit" className="w-[8rem]" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Save changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
