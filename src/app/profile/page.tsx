'use client';
import { Bell, Compass, Lock, User } from 'lucide-react';
import React from 'react';

import AccountDetailsForm from '@/components/profile/AccountDetailsForm';
import InterestsForm from '@/components/profile/InterestsForm';
import NotificationsForm from '@/components/profile/NotificationsForm';
import SecurityForm from '@/components/profile/SecurityForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/domain/hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center items-center w-full pt-10">
      <div className="grid gap-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage you profile details, company details, interesting company &
            topics here.
          </p>
        </div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">
              <User />
              Account
            </TabsTrigger>
            <TabsTrigger value="interests">
              <Compass />
              Interests
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell />
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountDetailsForm user={user} />
          </TabsContent>
          <TabsContent value="interests">
            <InterestsForm />
          </TabsContent>
          <TabsContent value="security">
            <SecurityForm />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
