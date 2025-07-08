'use client';

import { Suspense, useState } from 'react';

import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/domain/hooks/useAuth';

import { AlertsSection } from './AlertsSection';
import { InboxSection } from './InboxSection';
import Loading from './loading';

export default function InboxPage() {
  const [tab, setTab] = useState('inbox');
  const { user } = useAuth();

  return (
    <Section>
      <Tabs value={tab} onValueChange={setTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <Suspense fallback={<Loading />}>
          <TabsContent value="inbox">
            <InboxSection userId={user?.id || ''} />
          </TabsContent>
          <TabsContent value="alerts">
            {user?.id ? <AlertsSection userId={user.id} /> : null}
          </TabsContent>
        </Suspense>
      </Tabs>
    </Section>
  );
}
