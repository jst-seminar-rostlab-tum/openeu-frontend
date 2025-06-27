import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

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
  const isInitialized = useRef(false);

  const { data: profile } = useProfile(userId);

  const handleSwitch = (isChecked: boolean) => {
    setChecked(isChecked);
    if (isChecked && hasProfile) {
      setSelectedUserId(userId);
    } else {
      setSelectedUserId('');
    }
  };

  useEffect(() => {
    if (user && profile && !isInitialized.current) {
      setUserId(userId);
      setHasProfile(true);
      setChecked(true);
      setSelectedUserId(userId);
      isInitialized.current = true;
    }
  }, [user, profile, setSelectedUserId]);

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
