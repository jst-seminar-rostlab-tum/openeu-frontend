import * as React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export default function PersonalizeSwitch() {
  const { setSelectedUserId } = useMeetingContext();
  const { user } = useAuth();
  const userId = user?.id;
  const { data: profile } = useProfile(userId ?? '');
  const hasProfile = !!profile && !!userId;

  const [checked, setChecked] = React.useState(true);

  const handleSwitch = (checked: boolean) => {
    setChecked(checked);
    if (checked && hasProfile) {
      setSelectedUserId(user?.id);
    } else {
      setSelectedUserId('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={handleSwitch}
        disabled={!hasProfile}
      />
      <Label>Personalized</Label>
    </div>
  );
}
