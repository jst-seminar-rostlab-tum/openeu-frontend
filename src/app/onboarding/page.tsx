import { Metadata } from 'next';
import React from 'react';

import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { Section } from '@/components/section';
import { requireAuth } from '@/lib/dal';

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Complete your OpenEU profile setup',
  keywords: ['onboarding', 'openeu', 'profile', 'setup'],
};

export default async function OnboardingStepPage() {
  const { user } = await requireAuth();

  return (
    <Section>
      <OnboardingLayout userId={user.id} />
    </Section>
  );
}
