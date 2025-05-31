'use client';

import { redirect } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState('');

  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();

    await supabase.auth.updateUser({ password: newPassword });
    redirect('/login');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Update your password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e: FormEvent) => resetPassword(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">New password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
