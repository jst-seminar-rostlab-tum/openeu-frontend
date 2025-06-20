'use client';

import ProfileContent from '@/components/profile/ProfileContent';
import ProfileProvider from '@/components/profile/ProfileContext';

export default function Profile() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}
