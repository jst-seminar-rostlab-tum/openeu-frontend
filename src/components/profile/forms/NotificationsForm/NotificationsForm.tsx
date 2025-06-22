import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export default function NotificationsForm() {
  const { profile } = useProfileContext();

  const notificationSchema = z.object({
    subscribed_newsletter: z.boolean(),
  });

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      subscribed_newsletter: true,
    },
  });

  function onSubmit(values: z.infer<typeof notificationSchema>) {
    //TODO: placeholder remove
    // eslint-disable-next-line
    console.log(values);
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
          <Button type="submit" className="w-[8rem]">
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
