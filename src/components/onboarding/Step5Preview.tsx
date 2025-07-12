import { CheckCircle } from 'lucide-react';
import React from 'react';

import FeaturePreviewCard from '@/components/onboarding/FeaturePreviewCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Step5Preview() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome to OpenEU!</CardTitle>
        <CardDescription className="text-lg">
          Your experience is now fully personalized based on your profile and
          interests
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FeaturePreviewCard
            emoji="📊"
            title="Legislative Monitor"
            href="/monitor"
            description="Track and monitor EU legislative proposals, amendments, and voting processes in real-time with comprehensive status updates."
            benefit="Stay informed about legislative progress and anticipate regulatory changes before they impact your business."
          />

          <FeaturePreviewCard
            emoji="🤖"
            title="AI-Powered Chat"
            href="/chat"
            description="Ask questions about all aspects of EU information, with specialized knowledge of legislation and meetings."
            benefit="Get instant expert-level insights on complex EU topics, from specific legislative details to meeting outcomes and procedural questions."
          />

          <FeaturePreviewCard
            emoji="📅"
            title="EU Calendar"
            href="/calendar"
            description="View and track upcoming EU meetings and events that are relevant to your interests and role."
            benefit="Stay informed about important meetings and events so you never miss opportunities to engage or stay updated."
          />

          <FeaturePreviewCard
            emoji="🔔"
            title="Smart Inbox"
            href="/inbox"
            description="Receive personalized alerts about legislative changes, new regulations, and policy updates relevant to your interests and role."
            benefit="Stay ahead of the curve with timely notifications tailored to your specific needs and preferences."
          />

          <FeaturePreviewCard
            emoji="🗺️"
            title="Interactive EU Map"
            href="/map"
            description="Visualize meeting and event activity across the EU geographically."
            benefit="Perfect for identifying key meeting locations relevant to your interests."
          />
        </div>
      </CardContent>
    </Card>
  );
}
