import * as React from 'react';
import { useEffect, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMeetingContext } from '@/domain/hooks/meetingHooks';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export default function PersonalizeSwitch() {
  const { setSelectedUserId } = useMeetingContext();
  const { user } = useAuth();

  const [checked, setChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [userId, setUserId] = useState('');

  const { data: profile } = useProfile(userId);

  const handleSwitch = (checked: boolean) => {
    setChecked(checked);
    if (checked && hasProfile) {
      setSelectedUserId(userId);
    } else {
      setSelectedUserId('');
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      setHasProfile(!!profile);
      if (profile) {
        handleSwitch(true);
      }
    }
  }, [user, profile]);

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
