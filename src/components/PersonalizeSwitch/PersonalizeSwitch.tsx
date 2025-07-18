import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useProfile } from '@/domain/hooks/profileHooks';
import { useAuth } from '@/domain/hooks/useAuth';

export interface PersonalizeSwitchProps {
  onCheckedChange: (userId: string | undefined) => void;
  selectedUserId?: string;
  label?: string;
}

export default function PersonalizeSwitch({
  onCheckedChange,
  selectedUserId,
  label = 'Personalized',
}: PersonalizeSwitchProps) {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [userId, setUserId] = useState('');
  const [checked, setChecked] = useState(false);
  const isInitialized = useRef(false);

  const { data: profile } = useProfile(userId);

  const handleSwitch = (isChecked: boolean) => {
    setChecked(isChecked);
    if (isChecked && hasProfile) {
      onCheckedChange(userId);
    } else {
      onCheckedChange(undefined);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    setChecked(!!selectedUserId && selectedUserId === userId);
  }, [selectedUserId, userId]);

  useEffect(() => {
    if (
      userId &&
      profile &&
      !isInitialized.current &&
      profile.embedding_input
    ) {
      setHasProfile(true);
      isInitialized.current = true;
    }
  }, [userId, profile]);

  // TODO: Add tooltip for profile not found

  return (
    <div className="flex items-center justify-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={handleSwitch}
        disabled={!hasProfile}
      />
      <Label>{label}</Label>
    </div>
  );
}
