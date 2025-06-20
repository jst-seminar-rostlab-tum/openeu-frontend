import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function NotificationsForm() {
  return (
    <div className="grid gap-5 pt-3">
      <Card>
        <CardHeader>
          <div className="flex flex-row gap-2 align-text-center">
            <Bell />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Checkbox id="enable_notifications" />
            <Label htmlFor="enable_notifications">
              Receive a daily personalized newsletter
            </Label>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button className="w-[8rem]">Save changes</Button>
      </div>
    </div>
  );
}
