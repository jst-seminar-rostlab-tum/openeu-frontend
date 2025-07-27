'use client';

import { User } from '@supabase/supabase-js';
import {
  Bell,
  BriefcaseBusinessIcon,
  Compass,
  Lock,
  User as UserIcon,
} from 'lucide-react';
import { JSX, useState } from 'react';

import EntrepreneurProfileForm from '@/components/profile/EntrepreneurProfileForm';
import PoliticianProfileForm from '@/components/profile/PoliticsProfileForm';
import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Profile,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { useProfileUpdateMutation } from '@/domain/hooks/profileHooks';
import { ToastOperations } from '@/operations/toast/toastOperations';

import AccountDetailsForm from './AccountDetailsForm';
import InterestsForm from './InterestsForm';
import NotificationsForm from './NotificationsForm';
import SecurityForm from './SecurityForm';

interface ProfileCategory {
  name: string;
  id: string;
  icon: JSX.Element;
  component: JSX.Element;
}

interface ProfileContentProps {
  user: User;
  userProfile: Profile;
}

export default function ProfileContent({
  user,
  userProfile,
}: ProfileContentProps) {
  const [loading, setLoading] = useState(false);

  const updateProfileMutation = useProfileUpdateMutation({
    onSuccess: () =>
      ToastOperations.showSuccess({
        title: 'Profile updated',
        message: 'Your profile was updated successfully.',
      }),
    onError: (error) =>
      ToastOperations.showError({
        title: 'Error creating profile',
        message: `${error.message}. Please try again later.`,
      }),
  });

  const profile = updateProfileMutation.data ?? userProfile;
  const isEntrepreneur = profile.user_type === 'entrepreneur';

  const updateProfile = (userId: string, data: ProfileUpdate) => {
    setLoading(true);
    updateProfileMutation
      .mutateAsync({ userId, data })
      .finally(() => setLoading(false));
  };

  const categories: ProfileCategory[] = [
    {
      name: 'Account',
      id: 'account',
      icon: <UserIcon />,
      component: (
        <AccountDetailsForm
          profile={profile}
          email={user.email ?? 'no@mail.wtf'}
          updateProfile={updateProfile}
          loading={loading}
        />
      ),
    },
    {
      name: isEntrepreneur ? 'Business Information' : 'Political Role',
      id: isEntrepreneur ? 'business' : 'politics',
      icon: <BriefcaseBusinessIcon />,
      component: isEntrepreneur ? (
        <EntrepreneurProfileForm
          profileId={profile.id}
          company={profile.company!}
          updateProfile={updateProfile}
          loading={loading}
        />
      ) : (
        <PoliticianProfileForm
          profileId={profile.id}
          politician={profile.politician!}
          updateProfile={updateProfile}
          loading={loading}
        />
      ),
    },
    {
      name: 'Focus Areas',
      id: 'focus',
      icon: <Compass />,
      component: (
        <InterestsForm
          profile={profile}
          updateProfile={updateProfile}
          loading={loading}
        />
      ),
    },
    {
      name: 'Security',
      id: 'security',
      icon: <Lock />,
      component: <SecurityForm />,
    },
    {
      name: 'Notifications',
      id: 'notifications',
      icon: <Bell />,
      component: (
        <NotificationsForm
          profile={profile}
          updateProfile={updateProfile}
          loading={loading}
        />
      ),
    },
  ];

  const buildTabList = (category: ProfileCategory, index: number) => {
    return (
      <TabsTrigger value={category.id} key={index}>
        {category.icon}
        <span className="hidden sm:inline">{category.name}</span>
      </TabsTrigger>
    );
  };

  const buildTabContent = (category: ProfileCategory, index: number) => {
    return (
      <TabsContent value={category.id} key={index}>
        {category.component}
      </TabsContent>
    );
  };

  return (
    <Section className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Profile Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and settings
        </p>
      </div>

      <Tabs defaultValue={categories[0].id} className="w-full">
        <TabsList className="grid w-full grid-cols-4 p-1 bg-muted/50 sm:inline-flex sm:w-fit sm:h-9">
          {categories.map(buildTabList)}
        </TabsList>
        <div className="mt-6">{categories.map(buildTabContent)}</div>
      </Tabs>
    </Section>
  );
}
