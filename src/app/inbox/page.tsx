import { Section } from '@/components/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUser } from '@/lib/dal';

import { AlertsSection } from './AlertsSection';
import { InboxSection } from './InboxSection';

export default async function InboxPage() {
  const user = await getUser();

  return (
    <Section>
      <Tabs defaultValue="inbox" className="mt-4">
        <TabsList className="w-sm">
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
