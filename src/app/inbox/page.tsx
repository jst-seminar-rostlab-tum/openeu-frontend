'use client';

import { useState } from 'react';

import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/domain/hooks/useAuth';

import { AlertsSection } from './AlertsSection';
import { InboxSection } from './InboxSection';

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
        <TabsContent value="inbox">
          <InboxSection userId={user?.id || ''} />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertsSection userId={user?.id || ''} />
        </TabsContent>
      </Tabs>
    </Section>
  );
}
