import { Globe, Lock } from 'lucide-react';
import { IoLogoGoogle } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SecurityForm() {
  return (
    <div className="grid gap-5 pt-3">
      <Card>
        <CardHeader>
          <div className="flex flex-row gap-2 align-text-center">
            <Lock />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label className="text-sm font-medium" htmlFor="current_password">
              Current password
            </Label>
            <Input id="current_password" type="password" />
            <Label className="text-sm font-medium" htmlFor="new_password">
              New password
            </Label>
            <Input id="new_password" type="password" />
            <Label className="text-sm font-medium" htmlFor="confirm_password">
              Confirm new password
            </Label>
            <Input id="confirm_password" type="password" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button className="w-[8rem]">Save changes</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row gap-2 align-text-center">
              <Globe />
              <h2 className="text-lg font-semibold">Connected Accounts</h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex gap-3">
              <div className="flex justify-center items-center rounded-full bg-muted size-10">
                <IoLogoGoogle className="size-6" />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">Google</p>
                <p className="text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button>Connect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
