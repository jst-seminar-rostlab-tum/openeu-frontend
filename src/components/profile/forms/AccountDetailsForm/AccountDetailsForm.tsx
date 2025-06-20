import { AvatarFallback } from '@radix-ui/react-avatar';
import { Building, User as UserIcon } from 'lucide-react';
import React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileContext } from '@/domain/hooks/profileHook';
import { extractInitials, getDisplayName } from '@/lib/utils';

export default function AccountDetailsForm() {
  const { isLoading, user } = useProfileContext();

  if (isLoading || !user) return;

  const userData = {
    email: user.email,
    name: getDisplayName(user),
    image: user.user_metadata?.avatar_url as string | undefined,
  };

  return (
    <div className="grid gap-5 pt-3">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row gap-2 align-text-center">
              <UserIcon />
              <h2 className="text-lg font-semibold">Profile Details</h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between gap-2">
            <Avatar className="flex flex-col justify-center items-center outline-1 size-16 my-auto">
              <AvatarImage src={userData.image} alt={userData.name} />
              <AvatarFallback>{extractInitials(userData.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <Label htmlFor="picture" className="text-sm font-medium">
                Upload avatar
              </Label>
              <Input id="picture" type="file" />
              <p className="text-xs text-muted-foreground">
                Recommended size: 400x400px. Max file size: 5MB.
              </p>
              <p className="text-xs text-muted-foreground"></p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 pt-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium" htmlFor="name">
                First name
              </Label>
              <Input id="name" type="text" />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium" htmlFor="surname">
                Last name
              </Label>
              <Input id="surname" type="text" />
            </div>
            <div className="flex flex-col gap-3 col-span-2">
              <Label className="text-sm font-medium" htmlFor="email">
                E-Mail
              </Label>
              <Input id="email" type="email" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-row gap-2 align-text-center">
            <Building />
            <h2 className="text-lg font-semibold">Company Details</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium" htmlFor="name">
                Company name
              </Label>
              <Input id="name" type="text" />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium" htmlFor="surname">
                Company details
              </Label>
              <Input id="surname" type="text" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button className="w-[8rem]">Save changes</Button>
      </div>
    </div>
  );
}
