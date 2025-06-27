import { Bell, Compass, Lock, User } from 'lucide-react';

import AccountDetailsForm from '@/components/profile/AccountDetailsForm';
import InterestsForm from '@/components/profile/InterestsForm';
import NotificationsForm from '@/components/profile/NotificationsForm';
import SecurityForm from '@/components/profile/SecurityForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProfile } from '@/domain/actions/profile';
import { createClient } from '@/lib/supabase/server';
import { topicRepository } from '@/repositories/topicRepository';

interface ProfileCategory {
  name: string;
  id: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  disabled: boolean;
}

export default async function ProfilePage() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    throw new Error('User does not exist');
  }

  const userProfile = await getProfile(user.id);
  const userHasNoProfile = !userProfile;

  const topics = await topicRepository.getTopics();

  const selectedTopics = userProfile ? userProfile.topic_id_list : [];
  const newsletterFrequency = userProfile
    ? userProfile.newsletter_frequency
    : 'none';

  const name = userProfile ? userProfile.name : undefined;
  const surname = userProfile ? userProfile.surname : undefined;
  const companyName = userProfile ? userProfile.company_name : undefined;
  const companyDescription = userProfile
    ? userProfile.company_description
    : undefined;
  const categories: ProfileCategory[] = [
    {
      name: 'Account',
      id: 'account',
      icon: <User />,
      component: (
        <AccountDetailsForm
          userHasNoProfile={userHasNoProfile}
          userId={user.id}
          email={user.email ?? 'no@mail.wtf'}
          name={name}
          surname={surname}
          company_name={companyName}
          company_description={companyDescription}
        />
      ),
      disabled: false,
    },
    {
      name: 'Interests',
      id: 'interests',
      icon: <Compass />,
      component: (
        <InterestsForm
          userId={user.id}
          selectedTopics={selectedTopics}
          topics={topics}
        />
      ),
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
      component: (
        <NotificationsForm
          userId={user.id}
          newsletter_frequency={newsletterFrequency}
        />
      ),
      disabled: userHasNoProfile,
    },
  ];

  const buildTabList = (category: ProfileCategory, index: number) => {
    return (
      <TabsTrigger value={category.id} key={index} disabled={category.disabled}>
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
    <div className="container mx-auto px-4 py-6 max-w-4xl">
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
    </div>
  );
}
