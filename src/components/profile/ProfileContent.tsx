import { Bell, Compass, Lock, User } from 'lucide-react';

import AccountDetailsForm from '@/components/profile/forms/AccountDetailsForm/AccountDetailsForm';
import InterestsForm from '@/components/profile/forms/InterestsForm/InterestsForm';
import NotificationsForm from '@/components/profile/forms/NotificationsForm/NotificationsForm';
import ProfileSkeleton from '@/components/profile/forms/ProfileSkeleton/ProfileSkeleton';
import SecurityForm from '@/components/profile/forms/SecurityForm/SecurityForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileContext } from '@/domain/hooks/profileHooks';

interface ProfileCategory {
  name: string;
  id: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  disabled: boolean;
}

export default function ProfileContent() {
  const { isLoadingProfile, userHasNoProfile } = useProfileContext();

  const categories: ProfileCategory[] = [
    {
      name: 'Account',
      id: 'account',
      icon: <User />,
      component: <AccountDetailsForm />,
      disabled: false,
    },
    {
      name: 'Interests',
      id: 'interests',
      icon: <Compass />,
      component: <InterestsForm />,
      disabled: userHasNoProfile,
    },
    {
      name: 'Security',
      id: 'security',
      icon: <Lock />,
      component: <SecurityForm />,
      disabled: userHasNoProfile,
    },
    {
      name: 'Notifications',
      id: 'notifications',
      icon: <Bell />,
      component: <NotificationsForm />,
      disabled: userHasNoProfile,
    },
  ];

  const buildTabList = (category: ProfileCategory, index: number) => {
    return (
      <TabsTrigger value={category.id} key={index} disabled={category.disabled}>
        {category.icon}
        {category.name}
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
    <div className="flex flex-row justify-center items-center w-full pt-10">
      <div className="grid gap-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage you profile details, company details, interesting company &
            topics here.
          </p>
        </div>
        <Tabs defaultValue={categories[0].id}>
          <TabsList>{categories.map(buildTabList)}</TabsList>
          {isLoadingProfile && <ProfileSkeleton />}
          {!isLoadingProfile && categories.map(buildTabContent)}
        </Tabs>
      </div>
    </div>
  );
}
