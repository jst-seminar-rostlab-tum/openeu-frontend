import { Bell, Compass, Lock, User } from 'lucide-react';

import AccountDetailsForm from '@/components/profile/forms/AccountDetailsForm/AccountDetailsForm';
import InterestsForm from '@/components/profile/forms/InterestsForm/InterestsForm';
import NotificationsForm from '@/components/profile/forms/NotificationsForm/NotificationsForm';
import ProfileSkeleton from '@/components/profile/forms/ProfileSkeleton/ProfileSkeleton';
import SecurityForm from '@/components/profile/forms/SecurityForm/SecurityForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileContext } from '@/domain/hooks/profileHook';

interface ProfileCategory {
  name: string;
  id: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function ProfileContent() {
  const { isLoading } = useProfileContext();

  const categories: ProfileCategory[] = [
    {
      name: 'Account',
      id: 'account',
      icon: <User />,
      component: <AccountDetailsForm />,
    },
    {
      name: 'Interests',
      id: 'interests',
      icon: <Compass />,
      component: <InterestsForm />,
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
      component: <NotificationsForm />,
    },
  ];

  const buildTabList = (category: ProfileCategory) => {
    return (
      <TabsTrigger value={category.id}>
        {category.icon}
        {category.name}
      </TabsTrigger>
    );
  };

  const buildTabContent = (category: ProfileCategory) => {
    return <TabsContent value={category.id}>{category.component}</TabsContent>;
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
          {isLoading && <ProfileSkeleton />}
          {!isLoading && categories.map(buildTabContent)}
        </Tabs>
      </div>
    </div>
  );
}
