import { zodResolver } from '@hookform/resolvers/zod';
import { Bell } from 'lucide-react';
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

export default function NotificationsForm() {
  const notificationSchema = z.object({
    notification_enabled: z.boolean(),
  });

  const form = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notification_enabled: true,
    },
  });

  function onSubmit(values: z.infer<typeof notificationSchema>) {
    console.log(values);
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
                  <div className="flex gap-3">
                    <FormControl>
                      <Checkbox id="enable_notifications" {...field} />
                    </FormControl>
                    <FormLabel htmlFor="enable_notifications">
                      Receive a daily personalized newsletter
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
              name="enable_notifications"
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
