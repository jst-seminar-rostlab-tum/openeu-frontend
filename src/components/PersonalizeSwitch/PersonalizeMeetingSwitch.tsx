import * as React from 'react';

import { useMeetingContext } from '@/domain/hooks/meetingHooks';

import PersonalizeSwitch from './PersonalizeSwitch';

export default function PersonalizeMeetingSwitch() {
  const { setSelectedUserId, selectedUserId } = useMeetingContext();

  const handleCheckedChange = (userId: string | undefined) => {
    setSelectedUserId(userId || '');
  };

  return (
    <PersonalizeSwitch
      onCheckedChange={handleCheckedChange}
      selectedUserId={selectedUserId}
    />
  );
}
