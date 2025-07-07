import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Onboarding - OpenEU',
  description: 'Complete your OpenEU profile setup',
};

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>{children}</main>
    </div>
  );
}
