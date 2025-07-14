import * as React from 'react';

import PersonalizeSwitch from './PersonalizeSwitch';

interface PersonalizeLegislationSwitchProps {
  onUserIdChange?: (userId: string | undefined) => void;
  selectedUserId?: string;
}

export default function PersonalizeLegislationSwitch({
  onUserIdChange,
  selectedUserId,
}: PersonalizeLegislationSwitchProps) {
  return (
    <PersonalizeSwitch
      onCheckedChange={onUserIdChange || (() => {})}
      selectedUserId={selectedUserId}
    />
  );
}
