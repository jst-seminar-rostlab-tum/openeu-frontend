'use client';

import React from 'react';

import ProfileContent from '@/components/profile/ProfileContent';
import ProfileProvider from '@/components/profile/ProfileContext';

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}
